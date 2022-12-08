import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_PROJECT = gql`
  query getProjects(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getProjects(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        code
        status
        id
        createDate
        description
        defaultTopic
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

export const GET_DETAIL_PROJECT = gql`
  query getProject($id: String!) @api(name: "graphql") {
    getProject(id: $id) {
      status
      code
      message
      data {
        name
        code
        status
        createDate
        description
        defaultTopic
        id
      }
    }
  }
`

export const SAVE_PROJECT = gql`
  mutation saveProject($input: ProjectInput!) @api(name: "graphql") {
    saveProject(input: $input) {
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

export const REMOVE_PROJECT = gql`
  mutation removeProject($id: String!) @api(name: "graphql") {
    removeProject(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const useQueryProjects = (
  options?: QueryHookOptions<{ getProjects: IResponse<IProject[]> }>
) => {
  return useQuery<{ getProjects: IResponse<IProject[]> }>(
    GET_ALL_PROJECT,
    options
  )
}

export const useQueryLazyProjects = (
  options?: QueryHookOptions<{ getProjects: IResponse<IProject[]> }>
) => {
  return useLazyQuery<{ getProjects: IResponse<IProject[]> }>(
    GET_ALL_PROJECT,
    options
  )
}

export const useQueryProjectDetail = (
  options?: QueryHookOptions<{ getProject: IResponse<IProject> }>
) => {
  return useQuery<{ getProject: IResponse<IProject> }>(
    GET_DETAIL_PROJECT,
    options
  )
}

export const useSaveProject = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveProject: IResponse<IProject> }>(SAVE_PROJECT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROJECT,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveProject = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeProject: IResponse<IProject> }>(REMOVE_PROJECT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROJECT,
        variables: refetchVariables
      }
    ]
  })
}
