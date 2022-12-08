import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_SERVICE_TYPE = gql`
  query serviceTypes @api(name: "master") {
    serviceTypes {
      code
      data {
        id
        name
        description
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_SERVICE_TYPE = gql`
  query serviceType($id: String!) @api(name: "master") {
    serviceType(id: $id) {
      code
      data {
        id
        name
        status
        description
        createDate
        createUser
      }
      message
    }
  }
`

export const SAVE_SERVICE_TYPE = gql`
  mutation saveServiceTypeType($data: ServiceTypeTypeInput)
  @api(name: "master") {
    saveServiceTypeType(data: $data) {
      code
      data {
        id
        name
        description
        createDate
        createUser
      }
      message
    }
  }
`

export const REMOVE_SERVICE_TYPE = gql`
  mutation deleteServiceTypeType($id: String!) @api(name: "master") {
    deleteServiceTypeType(id: $id) {
      code
      data
      message
    }
  }
`

export const FIND_ALL_SERVICE_TYPE = gql`
  query serviceTypes @api(name: "master") {
    serviceTypes {
      code
      data {
        id
        name
        description
      }
      message
      page
      pages
      records
    }
  }
`

export const useQueryServiceTypes = (
  options?: QueryHookOptions<{
    serviceTypes: IResponse<IServiceType[]>
  }>
) => {
  return useQuery<{ serviceTypes: IResponse<IServiceType[]> }>(
    GET_ALL_SERVICE_TYPE,
    options
  )
}

export const useLazyQueryServiceTypes = (
  options?: QueryHookOptions<{
    serviceTypes: IResponse<IServiceType[]>
  }>
) => {
  return useLazyQuery<{ serviceTypes: IResponse<IServiceType[]> }>(
    GET_ALL_SERVICE_TYPE,
    options
  )
}

export const useQueryServiceTypeDetail = (
  options?: QueryHookOptions<{ serviceType: IResponse<IServiceType> }>
) => {
  return useQuery<{ serviceType: IResponse<IServiceType> }>(
    GET_DETAIL_SERVICE_TYPE,
    options
  )
}

export const useSaveServiceType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveServiceType: IResponse<IServiceType> }>(
    SAVE_SERVICE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SERVICE_TYPE,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveServiceType = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteServiceType: IResponse<IServiceType> }>(
    REMOVE_SERVICE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SERVICE_TYPE,
          variables: refetchVariables
        }
      ]
    }
  )
}
