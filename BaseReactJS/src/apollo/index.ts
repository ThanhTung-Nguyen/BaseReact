import { InMemoryCache, makeVar } from "@apollo/client"
import { ApolloClient, ApolloLink } from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import { asyncMap, graphQLResultHasError } from "@apollo/client/utilities"
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link"
import { onError } from "apollo-link-error"
import { createHttpLink } from "apollo-link-http"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwt_decode from "jwt-decode"
import moment from "moment"
import { Response } from "src/constants/message"
import { openNotificationWithIcon } from "src/helpers/notification"
import { logoutUser } from "src/reducer/actions/auth.action"
import { ResponseMessage } from "src/sagas/response.base"
import AuthHeader from "src/services/auth.header"
import { fetchRefreshToken } from "src/services/auth.service"
import store from "src/store/store"
import { ApiGraphql } from "src/utils/config"
import { GraphQLError } from "graphql"

type VisibilityFilter = {
  id: string
  displayName: string
}

const VisibilityFilters: { [filter: string]: VisibilityFilter } = {
  SHOW_ALL: {
    id: "show_all",
    displayName: "All"
  },
  SHOW_COMPLETED: {
    id: "show_completed",
    displayName: "Completed"
  },
  SHOW_ACTIVE: {
    id: "show_active",
    displayName: "Active"
  }
}

let isTokenExpired = false

const visibilityFilterVar = makeVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar()
          }
        }
      }
    }
  }
})

const authLink = setContext((request, { headers }) => {
  return {
    headers: {
      ...headers,
      ...AuthHeader(),
      "Accept-Language": "vi"
    }
  }
})

const refreshLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    let loginInfo
    const user = localStorage.getItem("login")
    if (user && typeof user !== "undefined") {
      loginInfo = JSON?.parse(user)
    }

    let token = AuthHeader()?.Authorization
    if (loginInfo) {
      const decodeToken: any = jwt_decode(loginInfo?.token)
      // console.log(decodeToken?.exp * 1000 - 1000)
      // console.log(moment(new Date()).add(60, "seconds").toDate().getTime())
      // console.log(
      //   moment(new Date(loginInfo?.tokenExpiredDate)).toDate().getTime()
      // )

      if (
        moment(new Date()).add(60, "seconds").toDate().getTime() >=
        moment(new Date(loginInfo?.tokenExpiredDate)).toDate().getTime()
      ) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  },
  fetchAccessToken: () => {
    return fetchRefreshToken()?.then(async res => {
      if (
        res?.code === "TOKEN_NOT_VALID" ||
        res?.code === "TOKEN_NOT_EXIST_IN_REDIS" ||
        res?.code === "REFRESH_TOKEN_EXPIRED" ||
        res?.code === "TOKEN_VALID_EXCEPTION" ||
        res?.code === "UN_AUTHORIZED"
      ) {
        await ResponseMessage(res)
      }
      return res
    })
  },
  handleFetch: accessToken => {
    console.log(accessToken)
  },
  handleError: err => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin")
    console.error(err)
  }
})

const errorLink = onError(({ operation, graphQLErrors, forward }): any => {
  graphQLErrors?.forEach(error => {
    openNotificationWithIcon("error", error.message)
  })
})

const link = new MultiAPILink({
  getContext: (endpoint, getCurrentContext) => ({
    headers: {
      ...getCurrentContext().headers,
      "Accept-Language": "vi",
      ...AuthHeader()
    }
  }),
  endpoints: {
    graphql: ApiGraphql.url
    // account: ApiGraphql.url,
    // qa: ApiGraphql.url,
    // news: ApiGraphql.url,
    // videoCall: ApiGraphql.url,
    // appointment: ApiGraphql.url
  },
  createHttpLink: () => createHttpLink() as any
})

const activityMiddleware = new ApolloLink((operation, forward) => {
  return asyncMap(forward(operation), async resp => {
    const operationType: "query" | "mutation" = (
      operation.query.definitions[0] as any
    )?.operation
    if (resp.errors && resp.errors.length > 0) {
      resp.errors.forEach(error => {
        openNotificationWithIcon("error", error.message)
      })
    } else {
      if (
        resp.data?.[operation.operationName]?.code === Response.SUCCESS ||
        resp.data?.[operation.operationName]?.status === Response.STATUS_SUCCESS
      ) {
        if (operationType === "mutation") {
          ResponseMessage(resp.data?.[operation.operationName])
        }
      } else {
        if (resp?.data?.[operation.operationName]) {
          if (
            resp.data?.[operation.operationName]?.code !==
            Response.TOKEN_EXPIRED
          ) {
            ResponseMessage(resp.data?.[operation.operationName])
          }
        } else {
          // if (resp.data?.response?.code === "TOKEN_EXPIRED") {
          //   return {
          //     errors: [new GraphQLError(resp.data?.response?.code)],
          //     data: null,
          //     context: operation.getContext(),
          //     extensions: operation.extensions
          //   }
          // }
          if (
            resp.data?.response?.code === "TOKEN_NOT_VALID" ||
            resp.data?.response?.code === "TOKEN_NOT_EXIST_IN_REDIS" ||
            resp.data?.response?.code === "REFRESH_TOKEN_EXPIRED" ||
            resp.data?.response?.code === "TOKEN_VALID_EXCEPTION" ||
            resp.data?.response?.code === "UN_AUTHORIZED"
          ) {
            store.dispatch(logoutUser())
          }
          if (resp.data?.response?.code !== Response.TOKEN_EXPIRED) {
            ResponseMessage(resp.data)
          }
        }
      }
    }
    return resp
  })
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    refreshLink,
    activityMiddleware,
    link,
    errorLink as any
  ])
})

export default client
