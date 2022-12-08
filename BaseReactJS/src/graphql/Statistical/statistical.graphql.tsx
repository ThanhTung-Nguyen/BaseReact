import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_API_LOGS = gql`
  query getApiLogs(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getApiLogs(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        id
        name
        serviceName
        fullPath
        functionName
        caller
        description
        startTime
        endTime
        duration
        param
        responseStatus
        code
        message
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

export const GET_DETAIL_API_LOG = gql`
  query getApiLog($id: String!) @api(name: "graphql") {
    getApiLog(id: $id) {
      status
      code
      data {
        id
        name
        serviceName
        fullPath
        functionName
        caller
        description
        startTime
        endTime
        duration
        param
        responseStatus
        code
        message
        createDate
      }
      message
    }
  }
`

export const GET_STATISTICAL_API_LOG = gql`
  query getStatisticalApiLogs(
    $name: String
    $serviceName: String
    $fromDate: String
    $toDate: String
  ) @api(name: "graphql") {
    getStatisticalApiLogs(
      name: $name
      serviceName: $serviceName
      fromDate: $fromDate
      toDate: $toDate
    ) {
      status
      code
      message
      data {
        countSuccess
        countError
      }
    }
  }
`

export const useQueryApilogs = (
  options?: QueryHookOptions<{
    getApiLogs?: IResponse<IApiLog[]>
  }>
) => {
  return useQuery<{
    getApiLogs?: IResponse<IApiLog[]>
  }>(GET_ALL_API_LOGS, options)
}

export const useLazyQueryApilogs = (
  options?: QueryHookOptions<{
    getApiLogs?: IResponse<IApiLog[]>
  }>
) => {
  return useLazyQuery<{
    getApiLogs?: IResponse<IApiLog[]>
  }>(GET_ALL_API_LOGS, options)
}

export const useQueryApiLogDetail = (
  options?: QueryHookOptions<{ getApiLog: IResponse<IApiLog> }>
) => {
  return useQuery<{ getApiLog: IResponse<IApiLog> }>(
    GET_DETAIL_API_LOG,
    options
  )
}
export const useLazyQueryApiLogDetail = (
  options?: QueryHookOptions<{
    getApiLog?: IResponse<IApiLog>
  }>
) => {
  return useLazyQuery<{
    getApiLog?: IResponse<IApiLog>
  }>(GET_DETAIL_API_LOG, options)
}

export const useQueryStatisticalApiLog = (
  options?: QueryHookOptions<{
    getStatisticalApiLogs: IResponse<IStatisticApiLog>
  }>
) => {
  return useQuery<{ getStatisticalApiLogs: IResponse<IStatisticApiLog> }>(
    GET_STATISTICAL_API_LOG,
    options
  )
}
export const useLazyQueryStatisticalApiLog = (
  options?: QueryHookOptions<{
    getStatisticalApiLogs?: IResponse<IStatisticApiLog>
  }>
) => {
  return useLazyQuery<{
    getStatisticalApiLogs?: IResponse<IStatisticApiLog>
  }>(GET_STATISTICAL_API_LOG, options)
}
