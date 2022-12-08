import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

// Bài viết
export const GET_ALL_NEWS_PAGING = gql`
  query getArticles(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getArticles(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        status
        id
        categoryId
        subject
        summary
        thumbnail
        content
        video
        releaseDate
        articleProjectIds
        projectIds
        isDisplay
        isNotify
        view
        show
        url
        category {
          name
          id
          status
        }
        createDate
        updateUser
        approveDate
        approveUser
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

export const GET_DETAIL_NEW = `query getArticle($id: String!)@api(name: "graphql"){
  getArticle(id:$id){
    status
    code
    message
    data{
     status
      id
   		categoryId
      subject
      summary
      thumbnail
      content
      video
      releaseDate
      articleProjectIds
      projectIds
      isDisplay
      isNotify
      view
      show
      url
      category{
        name
        id
        status
      }
     	createDate
       updateUser
       approveDate
       approveUser
    }
  }
}`

export const SAVE_NEW = gql`
  mutation saveArticle($input: ArticleInput!) @api(name: "graphql") {
    saveArticle(input: $input) {
      status
      code
      message
      data {
        subject
        summary
        status
        id
      }
    }
  }
`

export const REMOVE_NEW = gql`
  mutation removeArticle($id: String!) @api(name: "graphql") {
    removeArticle(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const GET_USER_ARTICLE_LIKES = gql`
  query getUserArticleLikes(
    $id: String!
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUserArticleLikes(
      id: $id
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        articleId
        userId
        like
        createDate
        user {
          name
          phone
          status
        }
      }
      page
      pages
      code
      message
      status
      records
    }
  }
`

export const GET_COUNT_LIKE_ARTICLE = gql`
  # Write your query or mutation here
  query getCountLikeArticle($articleId: String!) @api(name: "graphql") {
    getCountLikeArticle(articleId: $articleId) {
      data
      code
      message
      status
    }
  }
`

export const useQueryNews = (
  options?: QueryHookOptions<{
    getArticles: IResponse<INews[]>
  }>
) => {
  return useQuery<{ getArticles: IResponse<INews[]> }>(
    GET_ALL_NEWS_PAGING,
    options
  )
}

export const useLazyQueryNews = (
  options?: QueryHookOptions<{
    getArticles: IResponse<INews[]>
  }>
) => {
  return useLazyQuery<{ getArticles: IResponse<INews[]> }>(
    GET_ALL_NEWS_PAGING,
    options
  )
}

// export const useQueryNewsCategoryDetail = (
//   options?: QueryHookOptions<{ specialist: IResponse<ICategory> }>
// ) => {
//   return useQuery<{ specialist: IResponse<ICategory> }>(
//     GET_DETAIL_NEWS_CATEGORY,
//     options
//   )
// }

export const useSaveNew = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveArticle: IResponse<INews> }>(SAVE_NEW, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_NEWS_PAGING,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveNew = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeArticle: IResponse<INews> }>(REMOVE_NEW, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_NEWS_PAGING,
        variables: refetchVariables
      }
    ]
  })
}

export const useQueryUserArticles = (
  options?: QueryHookOptions<{
    getUserArticleLikes: IResponse<IUserArticle[]>
  }>
) => {
  return useQuery<{ getUserArticleLikes: IResponse<IUserArticle[]> }>(
    GET_USER_ARTICLE_LIKES,
    options
  )
}

export const useLazyQueryUserArticles = (
  options?: QueryHookOptions<{
    getUserArticleLikes: IResponse<IUserArticle[]>
  }>
) => {
  return useLazyQuery<{ getUserArticleLikes: IResponse<IUserArticle[]> }>(
    GET_USER_ARTICLE_LIKES,
    options
  )
}

export const useQueryCountLikeArticle = (
  options?: QueryHookOptions<{
    getCountLikeArticle: IResponse<any>
  }>
) => {
  return useQuery<{ getCountLikeArticle: IResponse<any> }>(
    GET_COUNT_LIKE_ARTICLE,
    options
  )
}

export const useLazyQueryCountLikeArticle = (
  options?: QueryHookOptions<{
    getCountLikeArticle: IResponse<any>
  }>
) => {
  return useLazyQuery<{ getCountLikeArticle: IResponse<any> }>(
    GET_COUNT_LIKE_ARTICLE,
    options
  )
}
