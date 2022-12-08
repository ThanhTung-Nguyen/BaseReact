import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_NEWS_CATEGORY_PAGING = gql`
  query getCategories(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getCategories(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        status
        id
        name
        description
        parentId
        projectCode
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

export const GET_DETAIL_NEWS_CATEGORY = `query getCategory($id: String!)@api(name: "graphql"){
  getCategory(id:$id){
    status
    code
    message
    data{
      status
      id
			description
      name
      parentId
      projectCode
     	createDate
      
    }
  }
}`

export const SAVE_NEWS_CATEGORY = gql`
  mutation saveCategory($input: CategoryInput!) @api(name: "graphql") {
    saveCategory(input: $input) {
      status
      code
      message
      data {
        name
        description
        status
        id
      }
    }
  }
`

export const REMOVE_NEWS_CATEGORY = gql`
  mutation removeCategory($id: String!) @api(name: "graphql") {
    removeCategory(id: $id) {
      status
      code
      message
      data
    }
  }
`

// Danh mục bài viết
export const useQueryNewsCategories = (
  options?: QueryHookOptions<{
    getCategories: IResponse<ICategory[]>
  }>
) => {
  return useQuery<{ getCategories: IResponse<ICategory[]> }>(
    GET_ALL_NEWS_CATEGORY_PAGING,
    options
  )
}

export const useLazyQueryNewsCategories = (
  options?: QueryHookOptions<{
    getCategories: IResponse<ICategory[]>
  }>
) => {
  return useLazyQuery<{ getCategories: IResponse<ICategory[]> }>(
    GET_ALL_NEWS_CATEGORY_PAGING,
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

export const useSaveNewsCategory = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveCategory: IResponse<ICategory> }>(
    SAVE_NEWS_CATEGORY,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_NEWS_CATEGORY_PAGING,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveNewsCategory = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeCategory: IResponse<ICategory> }>(
    REMOVE_NEWS_CATEGORY,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_NEWS_CATEGORY_PAGING,
          variables: refetchVariables
        }
      ]
    }
  )
}

// Bài viết
