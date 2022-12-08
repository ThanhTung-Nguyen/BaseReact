import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

// Lấy danh sách fucntion
export const GET_ALL_FUNC = gql`
  query getFunctions(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getFunctions(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        code
        parentId
        status
        createDate
        id
        parent {
          name
          code
          parentId
          status
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
// query getFunctions($page: Int, $pageSize: Int, $sorted: [SortedInput], $filtered: [FilteredInput]){
//   getFunctions(page:$page, pageSize:$pageSize, sorted: $sorted, filtered: $filtered){
//     data{
//       id,
//       functionCode,
//       name,
//       parentId
//       createUser,
//       createDate,
//       status,
//     },
//     message,
//     page,
//     records,
//     status
//    }
//   }

// Lấy thông tin chi tiết func theo id
export const GET_DETAIL_FUNCTION = gql`
  query getFunction($id: String!) @api(name: "graphql") {
    getFunction(id: $id) {
      status
      code
      message
      data {
        name
        code
        parentId
        status
        createDate
        id
        parent {
          name
          code
          parentId
          status
          parent {
            name
            code
            parentId
            id
            createDate
          }
        }
      }
    }
  }
`

// Lưu function
export const SAVE_FUNC = gql`
  mutation saveFunction($input: FunctionInput!) @api(name: "graphql") {
    saveFunction(input: $input) {
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

// chuyển trạng thái từ active sang inActive
export const REMOVE_FUNC = gql`
  mutation removeFunction($id: String!) @api(name: "graphql") {
    removeFunction(id: $id) {
      status
      code
      message
      data
    }
  }
`

// chuyển trạng thái từ active sang inActive
export const DELETE_PERMANENTLY_FUNC = gql`
  mutation deleteFunction($id: String!) @api(name: "account") {
    deleteFunction(id: $id) {
      status
      data
      message
    }
  }
`

export const FIND_ALL_FUNCTION = gql`
  query getAllFunctions @api(name: "graphql") {
    getAllFunctions {
      data {
        id
        code
        name
        parentId
        createUser
        createDate
        status
      }
      message
      status
    }
  }
`

export const GET_FUNCTION_PARENT_ID = gql`
  query getFunctionsByParentId($id: ID) @api(name: "account") {
    getFunctionsByParentId(id: $id) {
      data {
        id
        name
        createDate
        createUser
        functionCode
        status
        parentId
      }
      message
      page
      records
      status
    }
  }
`

export const GET_FUNCTION_BY_FUNCTION_ROOT = gql`
  query getFunctionsByListFunction($ids: [ID]) @api(name: "account") {
    getFunctionsByListFunction(ids: $ids) {
      status
      message
      data {
        id
        functionCode
        name
        parentId
        status
      }
      page
      records
    }
  }
`

export const useQueryFunction = (
  options?: QueryHookOptions<{ getFunctions: IResponse<IFunction[]> }>
) => {
  return useQuery<{ getFunctions: IResponse<IFunction[]> }>(
    GET_ALL_FUNC,
    options
  )
}

export const useQueryLazyFunction = (
  options?: QueryHookOptions<{ getFunctions: IResponse<IFunction[]> }>
) => {
  return useLazyQuery<{ getFunctions: IResponse<IFunction[]> }>(
    GET_ALL_FUNC,
    options
  )
}

export const useQueryLazyFunctionDetail = (
  options?: QueryHookOptions<{ getFunction: IResponse<IFunction> }>
) => {
  return useLazyQuery<{ getFunction: IResponse<IFunction> }>(
    GET_DETAIL_FUNCTION,
    options
  )
}

export const useQueryLazyFunctionByParentId = (
  options?: QueryHookOptions<{ getFunctionsByParentId: IResponse<IFunction[]> }>
) => {
  return useLazyQuery<{ getFunctionsByParentId: IResponse<IFunction[]> }>(
    GET_FUNCTION_PARENT_ID,
    options
  )
}

export const useQueryLazyFunctionByRoot = (
  options?: QueryHookOptions<{
    getFunctionsByListFunction: IResponse<IFunction[]>
  }>
) => {
  return useLazyQuery<{ getFunctionsByListFunction: IResponse<IFunction[]> }>(
    GET_FUNCTION_BY_FUNCTION_ROOT,
    options
  )
}

export const useAddFunction = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveFunction: IResponse<IFunction> }>(SAVE_FUNC, {
    ...options,
    refetchQueries: [
      {
        query: FIND_ALL_FUNCTION,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveFunction = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeFunction: IResponse<IFunction> }>(REMOVE_FUNC, {
    ...options,
    refetchQueries: [
      {
        query: FIND_ALL_FUNCTION,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemovePerFunction = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteFunction: IResponse<IFunction> }>(
    DELETE_PERMANENTLY_FUNC,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_FUNCTION_PARENT_ID,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useQueryAllFunction = (
  options?: QueryHookOptions<{ getAllFunctions: IResponse<IFunction[]> }>
) => {
  return useLazyQuery<{ getAllFunctions: IResponse<IFunction[]> }>(
    FIND_ALL_FUNCTION,
    options
  )
}
