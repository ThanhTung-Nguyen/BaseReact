import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_SERVICE = gql`
  query serviceCMS(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    serviceCMS(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      code
      data {
        serviceId
        serviceCode
        serviceName
        originPrice
        status
        generalMeaning
        detailMeaning
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_SERVICE = gql`
  query serviceDetail($id: String!) @api(name: "master") {
    serviceDetail(id: $id) {
      code
      data {
        id
        code
        name
        unit
        maxValue
        minValue
        returnDuration
        serviceTypeId
        generalMeaning
        detailMeaning
        isDisplay
        isUsed
        isProfile
        description
        status
        createDate
        createUser
        serviceTypeId
        approveDate
        approveUser
      }
      message
      status
    }
  }
`

export const SAVE_SERVICE = gql`
  mutation saveService($data: ServicesInput) @api(name: "master") {
    saveService(data: $data) {
      code
      status
      data {
        id
        serviceCode
        name
        serviceTypeId
        description
        unit
        createDate
        createUser
      }
      message
    }
  }
`

export const REMOVE_SERVICE = gql`
  mutation deleteService($id: String!) @api(name: "master") {
    deleteService(id: $id) {
      code
      data
      message
      status
    }
  }
`

export const FIND_ALL_SERVICE_WIDTH_ORIGINPRICE = gql`
  query findAllServiceWithOriginPrice(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    findAllServiceWithOriginPrice(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      code
      status
      message
      status
      data {
        serviceId
        serviceCode
        serviceName
        originPrice
      }
    }
  }
`

export const ACTIVE_SERVICE = gql`
  mutation activeService($id: String!) @api(name: "master") {
    activeService(id: $id) {
      code
      status
      data {
        id
        name
        status
      }
      message
    }
  }
`

export const DE_ACTIVE_SERVICE = gql`
  mutation deActiveService($id: String!) @api(name: "master") {
    deActiveService(id: $id) {
      code
      status
      data {
        id
        name
        status
      }
      message
    }
  }
`

export const useQueryServices = (
  options?: QueryHookOptions<{
    serviceCMS: IResponse<IService[]>
  }>
) => {
  return useQuery<{ serviceCMS: IResponse<IService[]> }>(
    GET_ALL_SERVICE,
    options
  )
}

export const useLazyQueryServices = (
  options?: QueryHookOptions<{
    serviceCMS: IResponse<IService[]>
  }>
) => {
  return useLazyQuery<{ serviceCMS: IResponse<IService[]> }>(
    GET_ALL_SERVICE,
    options
  )
}

export const useQueryServicesWithOriginalPrice = (
  options?: QueryHookOptions<{
    findAllServiceWithOriginPrice: IResponse<IService[]>
  }>
) => {
  return useQuery<{ findAllServiceWithOriginPrice: IResponse<IService[]> }>(
    FIND_ALL_SERVICE_WIDTH_ORIGINPRICE,
    options
  )
}

export const useLazyQueryServicesWithOriginalPrice = (
  options?: QueryHookOptions<{
    findAllServiceWithOriginPrice: IResponse<IService[]>
  }>
) => {
  return useLazyQuery<{ findAllServiceWithOriginPrice: IResponse<IService[]> }>(
    FIND_ALL_SERVICE_WIDTH_ORIGINPRICE,
    options
  )
}

export const useQueryServiceDetail = (
  options?: QueryHookOptions<{ serviceDetail: IResponse<IService> }>
) => {
  return useQuery<{ serviceDetail: IResponse<IService> }>(
    GET_DETAIL_SERVICE,
    options
  )
}

export const useSaveService = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveService: IResponse<IService> }>(SAVE_SERVICE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_SERVICE,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveService = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteService: IResponse<IService> }>(REMOVE_SERVICE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_SERVICE,
        variables: refetchVariables
      }
    ]
  })
}

export const useActiveService = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ activeService: IResponse<IService> }>(ACTIVE_SERVICE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_SERVICE,
        variables: refetchVariables
      }
    ]
  })
}

export const useDeActiveService = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deActiveService: IResponse<IService> }>(
    DE_ACTIVE_SERVICE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SERVICE,
          variables: refetchVariables
        }
      ]
    }
  )
}
