import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_BANNER_TYPE = gql`
  query getBannerKinds(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getBannerKinds(
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
        description
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

export const GET_DETAIL_BANNER_TYPE = `
query getBannerKind($id: String!) @api(name: "graphql"){
  getBannerKind(id:$id){
    status
    code
    message
    data{
      name
      status
      id
   		code
      description
     	createDate
      
    }
  }
}`

export const SAVE_BANNER_TYPE = gql`
  mutation saveBannerKind($input: BannerKindInput!) @api(name: "graphql") {
    saveBannerKind(input: $input) {
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

export const REMOVE_BANNER_TYPE = gql`
  mutation removeBannerKind($id: String!) @api(name: "graphql") {
    removeBannerKind(id: $id) {
      status
      code
      message
      data
    }
  }
`

// Banner Type
export const useQueryBannerTypes = (
  options?: QueryHookOptions<{
    getBannerKinds: IResponse<IBannerType[]>
  }>
) => {
  return useQuery<{ getBannerKinds: IResponse<IBannerType[]> }>(
    GET_ALL_BANNER_TYPE,
    options
  )
}

export const useLazyQueryBannerTypes = (
  options?: QueryHookOptions<{
    getBannerKinds: IResponse<IBannerType[]>
  }>
) => {
  return useLazyQuery<{
    getBannerKinds: IResponse<IBannerType[]>
  }>(GET_ALL_BANNER_TYPE, options)
}

// export const useQueryBannerTypeDetail = (
//   options?: QueryHookOptions<{ specialist: IResponse<IArticleCategory> }>
// ) => {
//   return useQuery<{ specialist: IResponse<IArticleCategory> }>(
//     GET_DETAIL_BANNER_TYPE,
//     options
//   )
// }

export const useSaveBannerType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveBannerKind: IResponse<IBannerType> }>(
    SAVE_BANNER_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_BANNER_TYPE,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveBannerType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeBannerKind: IResponse<IBannerType> }>(
    REMOVE_BANNER_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_BANNER_TYPE,
          variables: refetchVariables
        }
      ]
    }
  )
}
