import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_USER = gql`
  query getUsers(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUsers(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        userTypeCode
        userName
        name
        phone
        email
        avatar
        address
        provinceId
        districtId
        wardId
        sex
        birthDate
        referralCode
        syncHistoryStatus
        userGroups {
          groupId
          userId
          id
          status
        }
        status
        createDate
        id
        userType {
          name
          code
          id
        }
      }
      page
      pages
      status
      code
      message
      records
    }
  }
`

export const GET_DETAIL_USER = gql`
  query getUser($id: String!) @api(name: "graphql") {
    getUser(id: $id) {
      status
      code
      message
      data {
        userTypeCode
        userName
        name
        phone
        email
        avatar
        address
        provinceId
        districtId
        wardId
        sex
        birthDate
        referralCode
        syncHistoryStatus
        userType {
          name
          code
          id
        }
        userGroups {
          groupId
          userId
          id
          status
        }
        status
        createDate
        id
      }
    }
  }
`

export const SAVE_USER = gql`
  mutation saveUser($input: UserInput!) @api(name: "graphql") {
    saveUser(input: $input) {
      status
      code
      message
      data {
        name
        userName
        phone
        id
        createDate
      }
    }
  }
`

export const SAVE_ROOT_USER = gql`
  mutation saveRootUser($input: UserInput!) @api(name: "graphql") {
    saveRootUser(input: $input) {
      status
      code
      message
      data {
        name
        userName
        phone
        id
        createDate
      }
    }
  }
`

export const REMOVE_ACCOUNT = gql`
  mutation deleteUser($id: String!) @api(name: "account") {
    deleteUser(id: $id) {
      status
      message
      code
      data
    }
  }
`

export const REMOVE_PERMANENTLY_ACCOUNT = gql`
  mutation deletePermanentlyUser($id: String!) @api(name: "account") {
    deletePermanentlyUser(id: $id) {
      status
      message
      code
      data
    }
  }
`

// export const SAVE_PERMISSION = `
// mutation addPermissionGroup($permission: PermissionInput){
//   addPermissionGroup(permission: $permission){
//     status,
//     message,
//     code,
//     data{
//       id,
//       status
//     }
//   }
// }`

export const FIND_ALL_ACCOUNT = gql`
  query getAllUsers @api(name: "account") {
    getAllUsers {
      status
      message
      data {
        id
        name
        userName
        email
        phone
        address
        userTypeId
        sex
        facilityId
        birthDate
        staffCode
        userGroups {
          id
          name
          status
          userName
          userId
        }
        userFunctions {
          id
          functionCode
          name
          parentId
          userName
          userId
        }
        status
      }
      page
      records
    }
  }
`

export const UPDATE_USER_FACILITIES = gql`
  mutation updateUserFacilities($userFacilityInput: UserFacilityInput)
  @api(name: "account") {
    updateUserFacilities(userFacilityInput: $userFacilityInput) {
      code
      data {
        userId
        id
        facilityId
        status
      }
      message
      status
    }
  }
`

export const GET_USER_FACILITIES = gql`
  query getUserFacilities($userId: ID) @api(name: "account") {
    getUserFacilities(userId: $userId) {
      status
      message
      data {
        id
        userId
        facilityId
      }
      page
      records
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword($userId: String!, $newPassword: String!)
  @api(name: "graphql") {
    resetPassword(userId: $userId, newPassword: $newPassword) {
      status
      code
      message
      data
    }
  }
`
export const useQueryUsers = (
  options?: QueryHookOptions<{ getUsers: IResponse<IUserType[]> }>
) => {
  return useQuery<{ getUsers: IResponse<IUserType[]> }>(GET_ALL_USER, options)
}

export const useQueryLazyUsers = (
  options?: QueryHookOptions<{ getUsers: IResponse<IUserType[]> }>
) => {
  return useLazyQuery<{ getUsers: IResponse<IUserType[]> }>(
    GET_ALL_USER,
    options
  )
}

export const useQueryDetailUser = (
  options?: QueryHookOptions<{ getUser: IResponse<IUserType> }>
) => {
  return useQuery<{ getUser: IResponse<IUserType> }>(GET_DETAIL_USER, options)
}

export const useLazyQueryDetailUser = (
  options?: QueryHookOptions<{ getUser: IResponse<IUserType> }>
) => {
  return useLazyQuery<{ getUser: IResponse<IUserType> }>(
    GET_DETAIL_USER,
    options
  )
}

export const useLazyQueryUserFacility = (
  options?: QueryHookOptions<{
    getUserFacilities: IResponse<IUserFacility[]>
  }>
) => {
  return useLazyQuery<{ getUserFacilities: IResponse<IUserFacility[]> }>(
    GET_USER_FACILITIES,
    options
  )
}

export const useSaveUser = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveUser: IResponse<IUserType> }>(SAVE_USER, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_USER,
        variables: refetchVariables
      }
    ]
  })
}

export const useSaveRootUser = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveRootUser: IResponse<IUserType> }>(SAVE_ROOT_USER, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_USER,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveUser = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteUser: IResponse<IUserType> }>(REMOVE_ACCOUNT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_USER,
        variables: refetchVariables
      }
    ]
  })
}

export const useUpdateUserFacility = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ updateUserFacilities: IResponse<IUserFacility> }>(
    UPDATE_USER_FACILITIES,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_USER,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useResetPassword = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ resetPassword: IResponse<IUserType> }>(RESET_PASSWORD, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_USER,
        variables: refetchVariables
      }
    ]
  })
}
