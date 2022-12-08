import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"
import { GET_ALL_GROUPS } from "./group.graphql"

export const GET_ALL_GROUP_FUNCTION = gql`
  query getGroupFunctions(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "account") {
    getGroupFunctions(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      status
      data {
        id
        permissionType
        functionId
        objectId
        status
        groupName
        parentId
        functionCode
        functionName
        createUser
        createDate
      }
      message
      page
      records
    }
  }
`

export const GET_GROUP_FUNCTION_BY_ID = gql`
  query getGroupFunctionById2($groupId: String!) @api(name: "account") {
    getGroupFunctionById2(groupId: $groupId) {
      status
      data {
        id
        permissionType
        functionId
        objectId
        status
        functionCode
        functionName
        parentId
        dataScope
        groupName
      }
      message
    }
  }
`

export const SAVE_GROUP_FUNCTION = gql`
  mutation addGroupFunction($groupFunction: GroupFunctionInput)
  @api(name: "account") {
    addGroupFunction(groupFunction: $groupFunction) {
      status
      data {
        id
        permissionType
        functionId
        objectId
        status
        functionCode
        functionName
        parentId
        groupName
      }
      message
    }
  }
`

export const UPDATE_GROUP_FUNCTION = gql`
  mutation updateGroupFunction($groupFunction: GroupFunctionInput)
  @api(name: "account") {
    updateGroupFunction(groupFunction: $groupFunction) {
      status
      data {
        id
        permissionType
        functionId
        objectId
        status
        functionCode
        functionName
        parentId
        groupName
      }
      message
    }
  }
`
export const GET_GROUP_FUNCTION_BY_GROUP_ID = gql`
  query getGroupFunctionByIds($groupIds: [ID]) @api(name: "account") {
    getGroupFunctionByIds(groupIds: $groupIds) {
      status
      message
      data {
        id
        permissionType
        functionId
        objectId
        status
        groupName
        functionCode
        functionName
        parentId
      }
      page
      records
    }
  }
`
export const useQueryGroupFunction = (
  options?: QueryHookOptions<{ getGroupFunctions: IResponse<IGroupFunction[]> }>
) => {
  return useQuery<{ getGroupFunctions: IResponse<IGroupFunction[]> }>(
    GET_ALL_GROUP_FUNCTION,
    options
  )
}

export const useLazyQueryGroupFunction = (
  options?: QueryHookOptions<{
    getGroupFunctions: IResponse<IGroupFunction[]>
  }>
) => {
  return useLazyQuery<{ getGroupFunctions: IResponse<IGroupFunction[]> }>(
    GET_ALL_GROUP_FUNCTION,
    options
  )
}

export const useLazyQueryGroupFunctionDetail = (
  options?: QueryHookOptions<{
    getGroupFunctionById2: IResponse<IGroupFunction>
  }>
) => {
  return useLazyQuery<{ getGroupFunctionById2: IResponse<IGroupFunction> }>(
    GET_GROUP_FUNCTION_BY_ID,
    options
  )
}

export const useLazyQueryGroupFunctionByGroupId = (
  options?: QueryHookOptions<{
    getGroupFunctionByIds: IResponse<IGroupFunction[]>
  }>
) => {
  return useLazyQuery<{ getGroupFunctionByIds: IResponse<IGroupFunction[]> }>(
    GET_GROUP_FUNCTION_BY_GROUP_ID,
    options
  )
}

export const useAddGroupFunction = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ addGroupFunction: IResponse<IGroupFunction> }>(
    SAVE_GROUP_FUNCTION,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_GROUPS,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useUpdateGroupFunction = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ updateGroupFunction: IResponse<IGroupFunction> }>(
    UPDATE_GROUP_FUNCTION,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_GROUPS,
          variables: refetchVariables
        }
      ]
    }
  )
}
