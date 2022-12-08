import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_WORKSESSION = gql`
  query getWorkSessions(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getWorkSessions(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        status
        id
        workTimes {
          name
          startTime
          endTime
          status
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

export const GET_DETAIL_WORKSESSION = gql`
  query getWorkSession($id: String!) @api(name: "graphql") {
    getWorkSession(id: $id) {
      status
      code
      message
      data {
        name
        status
        id
        workTimes {
          name
          startTime
          endTime
          status
        }
        createDate
      }
    }
  }
`

export const SAVE_WORKSESSION = gql`
  mutation saveWorkSession($input: WorkSessionInput!) @api(name: "graphql") {
    saveWorkSession(input: $input) {
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

export const REMOVE_WORKSESSION = gql`
  mutation removeWorkSession($id: String!) @api(name: "graphql") {
    removeWorkSession(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const useQueryWorkSessions = (
  options?: QueryHookOptions<{
    getWorkSessions: IResponse<IWorkSession[]>
  }>
) => {
  return useQuery<{ getWorkSessions: IResponse<IWorkSession[]> }>(
    GET_ALL_WORKSESSION,
    options
  )
}

export const useLazyQueryWorkSessions = (
  options?: QueryHookOptions<{
    getWorkSessions: IResponse<IWorkSession[]>
  }>
) => {
  return useLazyQuery<{ getWorkSessions: IResponse<IWorkSession[]> }>(
    GET_ALL_WORKSESSION,
    options
  )
}

export const useQueryWorkSessionDetail = (
  options?: QueryHookOptions<{ getWorkSession: IResponse<IWorkSession> }>
) => {
  return useQuery<{ getWorkSession: IResponse<IWorkSession> }>(
    GET_DETAIL_WORKSESSION,
    options
  )
}

export const useSaveWorkSession = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveWorkSession: IResponse<IWorkSession> }>(
    SAVE_WORKSESSION,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_WORKSESSION,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveWorkSession = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeWorkSession: IResponse<IWorkSession> }>(
    REMOVE_WORKSESSION,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_WORKSESSION,
          variables: refetchVariables
        }
      ]
    }
  )
}
