import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_WORKTIME = gql`
  query getWorkTimes(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getWorkTimes(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        status
        id
        startTime
        endTime
        workSessionId
        workSession {
          name
          status
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

export const GET_DETAIL_WORKTIME = gql`
  query getWorkTime($id: String!) @api(name: "graphql") {
    getWorkTime(id: $id) {
      status
      code
      message
      data {
        name
        status
        id
        startTime
        endTime
        workSessionId
        workSession {
          name
          status
          id
        }
        createDate
      }
    }
  }
`

export const SAVE_WORKTIME = gql`
  mutation saveWorkTime($input: WorkTimeInput!) @api(name: "graphql") {
    saveWorkTime(input: $input) {
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

export const REMOVE_WORKTIME = gql`
  mutation removeWorkTime($id: String!) @api(name: "graphql") {
    removeWorkTime(id: $id) {
      status
      code
      message
      data
    }
  }
`

export const FIND_WORKTIME_BY_FACILITY = gql`
  query findAllWorkTimeFacility($type: String, $facilityId: String)
  @api(name: "master") {
    findAllWorkTimeFacility(type: $type, facilityId: $facilityId) {
      code
      data {
        id
        name
        startTime
        endTime
        workSessionId
        status
      }
      message
      status
    }
  }
`

export const useQueryWorkTimes = (
  options?: QueryHookOptions<{
    getWorkTimes: IResponse<IWorkTime[]>
  }>
) => {
  return useQuery<{ getWorkTimes: IResponse<IWorkTime[]> }>(
    GET_ALL_WORKTIME,
    options
  )
}

export const useLazyQueryWorkTimes = (
  options?: QueryHookOptions<{
    getWorkTimes: IResponse<IWorkTime[]>
  }>
) => {
  return useLazyQuery<{ getWorkTimes: IResponse<IWorkTime[]> }>(
    GET_ALL_WORKTIME,
    options
  )
}

export const useQueryWorkTimeDetail = (
  options?: QueryHookOptions<{ getWorkTime: IResponse<IWorkTime> }>
) => {
  return useQuery<{ getWorkTime: IResponse<IWorkTime> }>(
    GET_DETAIL_WORKTIME,
    options
  )
}

export const useSaveWorkTime = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveWorkTime: IResponse<IWorkTime> }>(SAVE_WORKTIME, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_WORKTIME,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveWorkTime = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeWorkTime: IResponse<IWorkTime> }>(
    REMOVE_WORKTIME,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_WORKTIME,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useQueryWorkTimesByFacility = (
  options?: QueryHookOptions<{
    findAllWorkTimeFacility: IResponse<IWorkTime[]>
  }>
) => {
  return useQuery<{ findAllWorkTimeFacility: IResponse<IWorkTime[]> }>(
    FIND_WORKTIME_BY_FACILITY,
    options
  )
}

export const useLazyQueryWorkTimesByFacility = (
  options?: QueryHookOptions<{
    findAllWorkTimeFacility: IResponse<IWorkTime[]>
  }>
) => {
  return useLazyQuery<{ findAllWorkTimeFacility: IResponse<IWorkTime[]> }>(
    FIND_WORKTIME_BY_FACILITY,
    options
  )
}
