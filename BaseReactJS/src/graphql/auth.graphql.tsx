import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client"
import axios from "axios"

const URL = "http://test.auth.medon.vn/connect/token"

export const GET_ME = gql`
  query getMe @api(name: "graphql") {
    getMe {
      status
      code
      message
      data {
        id
        name
        userName
        phone
        email
        avatar
        birthDate
        address
        userTypeCode
        status
        userGroups {
          id
          groupId
          userId
        }
        functions {
          name
          code
          parentId
          status
        }
      }
    }
  }
`
export const useQueryGetMe = (
  options?: QueryHookOptions<{ getMe: IResponse<IUserType> }>
) => {
  return useQuery<{ getMe: IResponse<IUserType> }>(GET_ME, options)
}

export const useQueryLazyGetMe = (
  options?: QueryHookOptions<{ getMe: IResponse<IUserType[]> }>
) => {
  return useLazyQuery<{ getMe: IResponse<IUserType[]> }>(GET_ME, options)
}
