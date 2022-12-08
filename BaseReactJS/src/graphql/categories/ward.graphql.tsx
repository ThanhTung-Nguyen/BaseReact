import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_WARD = gql`
  query getWards(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getWards(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        status
        id
        code
        districtId
        provinceId
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

export const GET_DETAIL_WARD = gql`
  query getWard($id: String!) @api(name: "graphql") {
    getWard(id: $id) {
      status
      code
      message
      data {
        name
        status
        id
        code
        districtId
        provinceId
        createDate
      }
    }
  }
`

export const SAVE_WARD = gql`
  mutation saveWard($input: WardInput!) @api(name: "graphql") {
    saveWard(input: $input) {
      status
      code
      message
      data {
        name
        status
        id
      }
    }
  }
`

export const REMOVE_WARD = gql`
  mutation removeWard($id: String!) @api(name: "graphql") {
    removeWard(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const useQueryWard = (
  options?: QueryHookOptions<{
    getWards: IResponse<IWard[]>
  }>
) => {
  return useQuery<{ getWards: IResponse<IWard[]> }>(GET_ALL_WARD, options)
}

export const useLazyQueryWard = (
  options?: QueryHookOptions<{
    getWards: IResponse<IWard[]>
  }>
) => {
  return useLazyQuery<{ getWards: IResponse<IWard[]> }>(GET_ALL_WARD, options)
}

export const useQueryWardDetail = (
  options?: QueryHookOptions<{ getWard: IResponse<IWard> }>
) => {
  return useQuery<{ getWard: IResponse<IWard> }>(GET_DETAIL_WARD, options)
}

export const useSaveWard = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveWard: IResponse<IWard> }>(SAVE_WARD, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_WARD,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveWard = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeWard: IResponse<IWard> }>(REMOVE_WARD, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_WARD,
        variables: refetchVariables
      }
    ]
  })
}
