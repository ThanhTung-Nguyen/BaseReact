import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_PARAM = gql`
  query getParams(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "account") {
    getParams(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      status
      data {
        id
        name
        description
        parentId
        functionId
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
export const SAVE_PARAM = gql`
  mutation addParam($param: ParamInput) @api(name: "account") {
    addParam(param: $param) {
      status
      data {
        id
        name
        status
      }
      code
      message
    }
  }
`

export const UPDATE_PARAM = gql`
  mutation updateParam($param: ParamInput) @api(name: "account") {
    updateParam(param: $param) {
      status
      data {
        id
        name
        status
      }
      code
      message
    }
  }
`

export const REMOVE_PARAM = gql`
  mutation deleteParam($id: String!) @api(name: "account") {
    deleteParam(id: $id) {
      status
      data
      code
      message
    }
  }
`

export const FIND_ALL_PARAM = gql`
  query getAllParams @api(name: "account") {
    getAllParams {
      status
      data {
        id
        name
        description
        parentId
        functionId
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
export const useQueryParam = (
  options?: QueryHookOptions<{ getParams: IResponse<IParam[]> }>
) => {
  return useQuery<{ getParams: IResponse<IParam[]> }>(GET_ALL_PARAM, options)
}

export const useQueryLazyParam = (
  options?: QueryHookOptions<{ getParams: IResponse<IParam[]> }>
) => {
  return useLazyQuery<{ getParams: IResponse<IParam[]> }>(
    GET_ALL_PARAM,
    options
  )
}

export const useAddParam = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ addParam: IResponse<IParam> }>(SAVE_PARAM, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PARAM,
        variables: refetchVariables
      }
    ]
  })
}

export const useUpdateParam = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ updateParam: IResponse<IParam> }>(UPDATE_PARAM, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PARAM,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveParam = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteParam: IResponse<IParam> }>(REMOVE_PARAM, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PARAM,
        variables: refetchVariables
      }
    ]
  })
}
