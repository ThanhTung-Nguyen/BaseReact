import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_FEED_BACKS = gql`
  query getFeedbacks(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getFeedbacks(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        phone
        email
        avatar
        address
        userId
        title
        content
        images
        projectCode
        status
        createDate
        id
        sex
        provinceId
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

export const GET_FEED_BACK = gql`
  query getFeedback($id: String!) @api(name: "graphql") {
    getFeedback(id: $id) {
      status
      code
      message
      data {
        subject
        content
        status
        createDate
        sex
        provinceId
      }
    }
  }
`
export const useQueryGetFeedbacks = (
  options?: QueryHookOptions<{ getFeedbacks: IResponse<IFeedback[]> }>
) => {
  return useQuery<{ getFeedbacks: IResponse<IFeedback[]> }>(
    GET_FEED_BACKS,
    options
  )
}

export const useQueryLazyGetFeedbacks = (
  options?: QueryHookOptions<{ getFeedbacks: IResponse<IFeedback[]> }>
) => {
  return useLazyQuery<{ getFeedbacks: IResponse<IFeedback[]> }>(
    GET_FEED_BACKS,
    options
  )
}
export const useQueryGetFeedback = (
  options?: QueryHookOptions<{ getFeedback: IResponse<IFeedback> }>
) => {
  return useQuery<{ getFeedback: IResponse<IFeedback> }>(GET_FEED_BACK, options)
}

export const useQueryLazyGetFeedback = (
  options?: QueryHookOptions<{ getFeedback: IResponse<IFeedback> }>
) => {
  return useLazyQuery<{ getFeedback: IResponse<IFeedback> }>(
    GET_FEED_BACK,
    options
  )
}
