import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_USER_TYPE = gql`
  query getUserKinds(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUserKinds(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        code
        status
        id
        createDate
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
export const GET_USER_TYPE_DETAIL = gql`
  query getUserKind($id: String!) @api(name: "graphql") {
    getUserKind(id: $id) {
      status
      code
      message
      data {
        name
        code
        status
        createDate
        id
      }
    }
  }
`
export const SAVE_USER_TYPE = gql`
  mutation saveUserKind($input: UserKindInput!) @api(name: "graphql") {
    saveUserKind(input: $input) {
      status
      code
      message
      data {
        name
        code
        id
        createDate
      }
    }
  }
`

export const REMOVE_USER_TYPE = gql`
  mutation removeUserKind($id: String!) @api(name: "graphql") {
    removeUserKind(id: $id) {
      status
      code
      message
      data
    }
  }
`
export const FIND_ALL_USER_TYPE = ``

export const useQueryUserTypes = (
  options?: QueryHookOptions<{ getUserKinds: IResponse<IUserType[]> }>
) => {
  return useQuery<{ getUserKinds: IResponse<IUserType[]> }>(
    GET_ALL_USER_TYPE,
    options
  )
}

export const useQueryLazyUserTypes = (
  options?: QueryHookOptions<{ getUserKinds: IResponse<IUserType[]> }>
) => {
  return useLazyQuery<{ getUserKinds: IResponse<IUserType[]> }>(
    GET_ALL_USER_TYPE,
    options
  )
}

export const useQueryUserType = (
  options?: QueryHookOptions<{ getUserKind: IResponse<IUserType[]> }>
) => {
  return useQuery<{ getUserKind: IResponse<IUserType[]> }>(
    GET_USER_TYPE_DETAIL,
    options
  )
}

export const useQueryLazyUserType = (
  options?: QueryHookOptions<{ getUserKind: IResponse<IUserType[]> }>
) => {
  return useLazyQuery<{ getUserKind: IResponse<IUserType[]> }>(
    GET_USER_TYPE_DETAIL,
    options
  )
}

export const useSaveUserType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveUserKind: IResponse<IUserType> }>(SAVE_USER_TYPE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_USER_TYPE,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveUserType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeUserKind: IResponse<IUserType> }>(
    REMOVE_USER_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_USER_TYPE,
          variables: refetchVariables
        }
      ]
    }
  )
}
