import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_CONFIG = gql`
  query getConfigs(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getConfigs(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        projectCode
        platform
        version
        versionReview
        isInReview
        url
        forceUpdate
        extra
        status
        termsOfUse
        policy
        createDate
        id
        showUpdate
        updateMessage
        project {
          code
          name
          status
          id
        }
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

export const GET_DETAIL_CONFIG = gql`
  query getConfig($id: String!) @api(name: "graphql") {
    getConfig(id: $id) {
      status
      code
      message
      data {
        projectCode
        platform
        version
        versionReview
        isInReview
        url
        forceUpdate
        extra
        status
        termsOfUse
        policy
        createDate
        id
        updateMessage
        showUpdate
        project {
          code
          name
          status
          id
        }
      }
    }
  }
`

export const SAVE_CONFIG = gql`
  mutation saveConfig($input: ConfigInput!) @api(name: "graphql") {
    saveConfig(input: $input) {
      status
      code
      message
      data {
        projectCode
        id
        createDate
        updateDate
      }
    }
  }
`
export const REMOVE_CONFIG = gql`
  mutation removeConfig($id: String!) @api(name: "graphql") {
    removeConfig(id: $id) {
      status
      code
      message
      data
    }
  }
`
export const SYNC_MASTER_DATA = gql`
  # Write your query or mutation here
  mutation syncMasterData($type: String!) @api(name: "graphql") {
    syncMasterData(type: $type) {
      status
      code
      message
      data
    }
  }
`

export const useQueryConfigs = (
  options?: QueryHookOptions<{
    getConfigs: IResponse<IConfig[]>
  }>
) => {
  return useQuery<{ getConfigs: IResponse<IConfig[]> }>(GET_ALL_CONFIG, options)
}

export const useLazyQueryConfigs = (
  options?: QueryHookOptions<{
    getConfigs: IResponse<IConfig[]>
  }>
) => {
  return useLazyQuery<{ getConfigs: IResponse<IConfig[]> }>(
    GET_ALL_CONFIG,
    options
  )
}

export const useLazyQueryConfig = (
  options?: QueryHookOptions<{
    getConfig: IResponse<IConfig[]>
  }>
) => {
  return useLazyQuery<{ getConfig: IResponse<IConfig[]> }>(
    GET_DETAIL_CONFIG,
    options
  )
}

export const useSaveConfig = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveConfig: IResponse<IConfig> }>(SAVE_CONFIG, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_CONFIG,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveConfig = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeConfig: IResponse<IConfig> }>(REMOVE_CONFIG, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_CONFIG,
        variables: refetchVariables
      }
    ]
  })
}

export const useSyncMasterData = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ syncMasterData: IResponse<IConfig> }>(SYNC_MASTER_DATA, {
    ...options
    // refetchQueries: [
    //   {
    //     query: GET_ALL_CONFIG,
    //     variables: refetchVariables
    //   }
    // ]
  })
}
