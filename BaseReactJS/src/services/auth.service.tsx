import { AxiosResponse } from "axios"
import { Response } from "src/constants/message"
import { logoutUser } from "src/reducer/actions/auth.action"
import store from "src/store/store"
import {
  ApiGraphql,
  ApiLogin,
  ApiLogout,
  ApiLogoutAllOtherSession,
  ApiLogoutAllSession,
  ApiLogoutAllUserSession,
  ApiRefreshToken
} from "../utils/config"
import AuthHeader, { getRefreshToken } from "./auth.header"
import { axiosInstance, updateAccessToken } from "./utils"

export const fetchRefreshToken = async () => {
  try {
    const res = await axiosInstance.post(
      ApiRefreshToken.url,
      { refreshToken: getRefreshToken() },
      {
        headers: { ...AuthHeader() }
      }
    )

    const data = res?.data
    if (data?.status == Response.STATUS_SUCCESS) {
      await updateAccessToken(
        data?.data?.token,
        data?.data?.refreshToken,
        data?.data?.tokenExpiredDate
      )
    }
    // else {
    //   store.dispatch(logoutUser())
    // }
    return data
  } catch (error) {
    return error
  }
}
// export const fetchGetMe = () => {
//   return axiosInstance.get(ApiGraphql.url, { headers: AuthHeader() })
// }

export const logout = async () => {
  return axiosInstance.post(ApiLogout.url, {}, { headers: AuthHeader() })
}

// response parse
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    const { code, status } = response.data
    if (
      code === "TOKEN_NOT_VALID" ||
      code === "TOKEN_NOT_EXIST_IN_REDIS" ||
      code === "REFRESH_TOKEN_EXPIRED" ||
      code === "TOKEN_VALID_EXCEPTION" ||
      code === "UN_AUTHORIZED"
    ) {
      await store.dispatch(logoutUser())
    } else if (
      code === Response?.TOKEN_EXPIRED &&
      status === Response.STATUS_SUCCESS
    ) {
      const data = await fetchRefreshToken()
      // console.log("get token refreshToken>>", rs.data)
      // const { token } = rs.data
      if (data?.status === Response.STATUS_SUCCESS) {
        const config = response.config
        return axiosInstance({
          ...config,
          headers: AuthHeader()
        })
      }
    }

    return response
  },
  async error => {
    return Promise.reject(error)
  }
)
export const fetchLogin = param => {
  const params = {
    ...param
  }

  return axiosInstance.post(ApiLogin.url, params)
}

export const logoutAllSession = () => {
  return axiosInstance.post(
    ApiLogoutAllSession.url,
    {},
    { headers: AuthHeader() }
  )
}
export const logoutAllUserSession = data => {
  return axiosInstance.post(ApiLogoutAllUserSession.url, data, {
    headers: AuthHeader()
  })
}
export const logoutAllOtherSession = data => {
  return axiosInstance.post(
    ApiLogoutAllOtherSession.url,
    { data },
    { headers: AuthHeader() }
  )
}

export const importUsers = users => {
  // return axiosInstance.post(ApiImportUsers.url, users, {
  //   headers: AuthHeader()
  // })
}

// axiosProvider?.setToken = token => {
//   axiosProvider.defaults.headers["x-access-token"] = token
//   window.localStorage.setItem("token", token)
// }
