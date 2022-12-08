import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_PROVINCE = gql`
  query getAllProvinces @api(name: "graphql") {
    getAllProvinces {
      data {
        name
        status
        id
        code
        orders
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
export const GET_PROVINCE_DETAIL = gql`
  query province($provinceId: String!) {
    province(provinceId: $provinceId) {
      code
      data {
        id
        code
        name
        status
        createDate
        createUser
      }
      message
    }
  }
`

export const SAVE_PROVINCE = gql`
  mutation saveProvince($data: ProvinceInput!) @api(name: "master") {
    saveProvince(data: $data) {
      status
      code
      data {
        id
        code
        name
        status
        createDate
        createUser
      }
      message
    }
  }
`

export const REMOVE_PROVINCE = gql`
  mutation deleteProvince($id: String!) @api(name: "master") {
    deleteProvince(id: $id) {
      status
      code
      data {
        id
        status
      }
      message
    }
  }
`

export const useQueryProvince = (
  options?: QueryHookOptions<{ getAllProvinces: IResponse<IProvince[]> }>
) => {
  return useQuery<{ getAllProvinces: IResponse<IProvince[]> }>(
    GET_ALL_PROVINCE,
    options
  )
}

export const useLazyQueryProvince = (
  options?: QueryHookOptions<{ getAllProvinces: IResponse<IProvince[]> }>
) => {
  return useLazyQuery<{ getAllProvinces: IResponse<IProvince[]> }>(
    GET_ALL_PROVINCE,
    options
  )
}

export const useQueryProvinceDetail = (
  options?: QueryHookOptions<{ provinces: IResponse<IProvince> }>
) => {
  return useQuery<{ provinces: IResponse<IProvince> }>(
    GET_PROVINCE_DETAIL,
    options
  )
}

export const useSaveProvince = (options?: MutationHookOptions) => {
  return useMutation<{ saveProvince: IResponse<IProvince> }>(SAVE_PROVINCE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROVINCE
      }
    ]
  })
}

export const useRemoveProvince = (options?: MutationHookOptions) => {
  return useMutation(REMOVE_PROVINCE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROVINCE
      }
    ]
  })
}
