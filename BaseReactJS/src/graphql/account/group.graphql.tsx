import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_GROUPS = gql`
  # Write your query or mutation here
  query getGroups(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getGroups(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        code
        description
        status
        createDate
        id
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

export const GET_GROUP = gql`
  # Write your query or mutation here
  query getGroup($id: String!) @api(name: "graphql") {
    getGroup(id: $id) {
      data {
        name
        code
        description
        status
        createDate
        id
        functions {
          name
          code
          parentId
          status
          id
        }
      }
      status
      code
      message
    }
  }
`

export const SAVE_GROUP = gql`
  mutation saveGroup($input: GroupInput!) @api(name: "graphql") {
    saveGroup(input: $input) {
      status
      code
      message
      data {
        name
        code
        createDate
      }
    }
  }
`

export const REMOVE_GROUP = gql`
  mutation removeGroup($id: String!) @api(name: "graphql") {
    removeGroup(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const DEL_GROUP = gql`
  mutation deleteGroup($id: String!) @api(name: "graphql") {
    deleteGroup(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const FIND_ALL_GROUP = gql`
  query getAllGroups @api(name: "account") {
    getAllGroups {
      status
      data {
        id
        name
        status
        createDate
        createUser
      }
      message
      page
      records
    }
  }
`

export const useQueryGroups = (
  options?: QueryHookOptions<{ getGroups: IResponse<IGroup[]> }>
) => {
  return useQuery<{ getGroups: IResponse<IGroup[]> }>(GET_ALL_GROUPS, options)
}

export const useQueryLazyGroups = (
  options?: QueryHookOptions<{ getGroups: IResponse<IGroup[]> }>
) => {
  return useLazyQuery<{ getGroups: IResponse<IGroup[]> }>(
    GET_ALL_GROUPS,
    options
  )
}

export const useQueryLazyGroup = (
  options?: QueryHookOptions<{ getGroup: IResponse<IGroup> }>
) => {
  return useLazyQuery<{ getGroup: IResponse<IGroup> }>(GET_GROUP, options)
}

export const useQueryGroup = (
  options?: QueryHookOptions<{ getGroup: IResponse<IGroup[]> }>
) => {
  return useQuery<{ getGroup: IResponse<IGroup[]> }>(GET_GROUP, options)
}

export const useAddGroup = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveGroup: IResponse<IGroup> }>(SAVE_GROUP, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_GROUPS,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveGroup = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeGroup: IResponse<IGroup> }>(REMOVE_GROUP, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_GROUPS,
        variables: refetchVariables
      }
    ]
  })
}

export const useDeleteGroup = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteGroup: IResponse<IGroup> }>(DEL_GROUP, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_GROUPS,
        variables: refetchVariables
      }
    ]
  })
}
