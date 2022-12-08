import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_BUSINESS = gql`
  query businesses($type: String) @api(name: "master") {
    businesses(type: $type) {
      code
      data {
        id
        name
        type
        status
        description
        createDate
        createUser
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_BUSINESS = gql`
  query business($id: String!) @api(name: "master") {
    business(id: $id) {
      code
      data {
        id
        name
        type
        description
        status
        createDate
        createUser
      }
      message
    }
  }
`

export const SAVE_BUSINESS = gql`
  mutation saveBusiness($data: BusinessInput!) @api(name: "master") {
    saveBusiness(data: $data) {
      code
      data {
        id
        name
        description
        type
        status
        createDate
        createUser
      }
      message
      status
    }
  }
`

export const REMOVE_BUSINESS = gql`
  mutation deleteBusiness($id: String!) @api(name: "master") {
    deleteBusiness(id: $id) {
      code
      data {
        id
        name
        status
      }
      message
      status
    }
  }
`

export const FIND_BUSINESS_BY_TYPE = gql`
  query businesses($type: String!) @api(name: "master") {
    businesses(type: $type) {
      code
      data {
        id
        name
        type
        status
        description
        createDate
        createUser
      }
      message
      page
      pages
      records
    }
  }
`

export const useQueryBusiness = (
  options?: QueryHookOptions<{
    businesses: IResponse<IBusiness[]>
  }>
) => {
  return useQuery<{ businesses: IResponse<IBusiness[]> }>(
    GET_ALL_BUSINESS,
    options
  )
}

export const useLazyQueryBusiness = (
  options?: QueryHookOptions<{
    businesses: IResponse<IBusiness[]>
  }>
) => {
  return useLazyQuery<{ businesses: IResponse<IBusiness[]> }>(
    GET_ALL_BUSINESS,
    options
  )
}

export const useQueryBusinessDetail = (
  options?: QueryHookOptions<{ business: IResponse<IBusiness> }>
) => {
  return useQuery<{ business: IResponse<IBusiness> }>(
    GET_DETAIL_BUSINESS,
    options
  )
}

export const useSaveBusiness = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveBusiness: IResponse<IBusiness> }>(SAVE_BUSINESS, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_BUSINESS,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveBusiness = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteBusiness: IResponse<IBusiness> }>(
    REMOVE_BUSINESS,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_BUSINESS,
          variables: refetchVariables
        }
      ]
    }
  )
}
