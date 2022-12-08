import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_BANNER = gql`
  query getBanners(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getBanners(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        status
        id
        subject
        content
        bannerTypeCode
        image
        url
        order
        bannerProjectIds
        displayType
        leftButtonName
        rightButtonName
        objectId
        bannerKind {
          name
          code
          id
        }
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

export const GET_DETAIL_BANNER = gql`
  query getBanner($id: String!) @api(name: "graphql") {
    getBanner(id: $id) {
      status
      code
      message
      data {
        status
        id
        subject
        content
        bannerTypeCode
        image
        url
        order
        bannerProjectIds
        displayType
        leftButtonName
        rightButtonName
        objectId
        bannerKind {
          name
          code
          id
        }
        createDate
      }
    }
  }
`

export const SAVE_BANNER = gql`
  mutation saveBanner($input: BannerInput!) @api(name: "graphql") {
    saveBanner(input: $input) {
      status
      code
      message
      data {
        subject
        content
        status
        id
      }
    }
  }
`

export const REMOVE_BANNER = gql`
  mutation removeBanner($id: String!) @api(name: "graphql") {
    removeBanner(id: $id) {
      status
      code
      message
      data
    }
  }
`

//Banner

export const useQueryBanners = (
  options?: QueryHookOptions<{
    getBanners: IResponse<IBanner[]>
  }>
) => {
  return useQuery<{ getBanners: IResponse<IBanner[]> }>(GET_ALL_BANNER, options)
}

export const useLazyQueryBanners = (
  options?: QueryHookOptions<{
    getBanners: IResponse<IBanner[]>
  }>
) => {
  return useLazyQuery<{
    getBanners: IResponse<IBanner[]>
  }>(GET_ALL_BANNER, options)
}

export const useLazyQueryBannerDetail = (
  options?: QueryHookOptions<{
    getBanners: IResponse<IBanner[]>
  }>
) => {
  return useLazyQuery<{ getBanners: IResponse<IBanner[]> }>(
    GET_DETAIL_BANNER,
    options
  )
}

export const useSaveBanner = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveBanner: IResponse<IBanner> }>(SAVE_BANNER, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_BANNER,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveBanner = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeBanner: IResponse<IBanner> }>(REMOVE_BANNER, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_BANNER,
        variables: refetchVariables
      }
    ]
  })
}
