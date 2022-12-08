import { gql, MutationHookOptions, useMutation } from "@apollo/client"

export const CHANGE_USER_INFO = gql`
  mutation changeInfo($data: UserInput) @api(name: "account") {
    changeInfo(data: $data) {
      status
      message
      code
      data {
        id
        phone
        name
        email
        avatar
        address
      }
    }
  }
`

export const CHANGE_USER_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!)
  @api(name: "graphql") {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      status
      message
      code
      data
    }
  }
`
export const useChangeUserInfo = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ changeInfo: IResponse<IGeneralInfo> }>(
    CHANGE_USER_INFO,
    {
      ...options
    }
  )
}

export const useChangeUserPassword = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ changePassword: IResponse<IChangePassword> }>(
    CHANGE_USER_PASSWORD,
    {
      ...options
    }
  )
}
