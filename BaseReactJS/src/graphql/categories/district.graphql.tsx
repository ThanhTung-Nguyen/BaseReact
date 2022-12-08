import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_DISTRICT = gql`
  query getAllDistricts($provinceId: String!) @api(name: "graphql") {
    getAllDistricts(provinceId: $provinceId) {
      data {
        name
        status
        id
        code
        provinceId
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

export const GET_DETAIL_DISTRICT = gql`
  query district($districtId: String!) @api(name: "master") {
    district(districtId: $districtId) {
      code
      data {
        id
        code
        name
        status
        createDate
        createUser
        province {
          id
          code
          name
          status
        }
      }
      message
    }
  }
`

export const SAVE_DISTRICT = gql`
  mutation saveDistrict($data: DistrictInput!) @api(name: "master") {
    saveDistrict(data: $data) {
      code
      data {
        id
        code
        name
        provinceId
        status
      }
      message
    }
  }
`

export const REMOVE_DISTRICT = gql`
  mutation deleteDistrict($id: String!) @api(name: "master") {
    deleteDistrict(id: $id) {
      code
      data {
        id
        status
      }
      message
    }
  }
`
export const FIND_DISTRICT_BY_PROVINCE = gql`
  query findDistrictByProvinceId($provinceId: String!) @api(name: "master") {
    findDistrictByProvinceId(provinceId: $provinceId) {
      code
      data {
        id
        code
        name
        status
        provinceId
        createUser
        createDate
      }
      message
      page
      pages
      records
    }
  }
`

export const useQueryDistrict = (
  options?: QueryHookOptions<{
    getAllDistricts: IResponse<IDistrict[]>
  }>
) => {
  return useQuery<{ getAllDistricts: IResponse<IDistrict[]> }>(
    GET_ALL_DISTRICT,
    options
  )
}

export const useLazyQueryDistrict = (
  options?: QueryHookOptions<{
    getAllDistricts: IResponse<IDistrict[]>
  }>
) => {
  return useLazyQuery<{ getAllDistricts: IResponse<IDistrict[]> }>(
    GET_ALL_DISTRICT,
    options
  )
}

export const useQueryDistrictDetail = (
  options?: QueryHookOptions<{ district: IResponse<IDistrict> }>
) => {
  return useQuery<{ district: IResponse<IDistrict> }>(
    GET_DETAIL_DISTRICT,
    options
  )
}

export const useSaveDistrict = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveDistrict: IResponse<IDistrict> }>(SAVE_DISTRICT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_DISTRICT,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveDistrict = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteDistrict: IResponse<IDistrict> }>(
    REMOVE_DISTRICT,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_DISTRICT,
          variables: refetchVariables
        }
      ]
    }
  )
}
