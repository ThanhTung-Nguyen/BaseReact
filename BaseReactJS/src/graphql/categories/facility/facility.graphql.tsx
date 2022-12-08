import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_FACILITY = gql`
  query getFacilities(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getFacilities(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        status
        id
        facilityType
        facilityCode
        parentId
        hotline
        rating
        numRating
        image
        address
        display
        latitude
        longitude
        districtId
        provinceId
        wardId
        isHospital
        isHome
        homeContract
        hospitalContract
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

export const GET_DETAIL_FACILITY = gql`
  query getFacility($id: String!) @api(name: "graphql") {
    getFacility(id: $id) {
      status
      code
      message
      data {
        name
        status
        id
        facilityType
        facilityCode
        parentId
        hotline
        rating
        numRating
        image
        address
        display
        latitude
        longitude
        districtId
        provinceId
        wardId
        isHospital
        isHome
        homeContract
        hospitalContract
        createDate
      }
    }
  }
`

export const SAVE_FACILITY = gql`
  mutation saveFacility($input: FacilityInput!) @api(name: "graphql") {
    saveFacility(input: $input) {
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

export const REMOVE_FACILITY = gql`
  mutation removeFacility($id: String!) @api(name: "graphql") {
    removeFacility(id: $id) {
      status
      code
      message
      data
    }
  }
`

// export const ACTIVE_FACILITY = gql`
//   mutation activeFacility($id: String!) @api(name: "master") {
//     activeFacility(id: $id) {
//       status
//       code
//       message
//       data {
//         id
//         status
//       }
//     }
//   }
// `

// export const DE_ACTIVE_FACILITY = gql`
//   mutation deActiveFacility($id: String!) @api(name: "master") {
//     deActiveFacility(id: $id) {
//       status
//       code
//       message
//       data {
//         id
//         status
//       }
//     }
//   }
// `

export const useQueryFacilities = (
  options?: QueryHookOptions<{
    getFacilities: IResponse<IFacility[]>
  }>
) => {
  return useQuery<{ getFacilities: IResponse<IFacility[]> }>(
    GET_ALL_FACILITY,
    options
  )
}

export const useLazyQueryFacilities = (
  options?: QueryHookOptions<{
    getFacilities: IResponse<IFacility[]>
  }>
) => {
  return useLazyQuery<{ getFacilities: IResponse<IFacility[]> }>(
    GET_ALL_FACILITY,
    options
  )
}

export const useQueryFacilityDetail = (
  options?: QueryHookOptions<{ getFacility: IResponse<IFacility> }>
) => {
  return useQuery<{ getFacility: IResponse<IFacility> }>(
    GET_DETAIL_FACILITY,
    options
  )
}

export const useSaveFacility = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveFacility: IResponse<IFacility> }>(SAVE_FACILITY, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_FACILITY,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemoveFacility = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ removeFacility: IResponse<IFacility> }>(
    REMOVE_FACILITY,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_FACILITY,
          variables: refetchVariables
        }
      ]
    }
  )
}

// export const useActiveFacility = (
//   options?: MutationHookOptions,
//   refetchVariables?: any
// ) => {
//   return useMutation<{ activeFacility: IResponse<IFacility> }>(
//     ACTIVE_FACILITY,
//     {
//       ...options,
//       refetchQueries: [
//         {
//           query: GET_ALL_FACILITY,
//           variables: refetchVariables
//         }
//       ]
//     }
//   )
// }

// export const useDeActiveFacility = (
//   options?: MutationHookOptions,
//   refetchVariables?: any
// ) => {
//   return useMutation<{ deActiveFacility: IResponse<IFacility> }>(
//     DE_ACTIVE_FACILITY,
//     {
//       ...options,
//       refetchQueries: [
//         {
//           query: GET_ALL_FACILITY,
//           variables: refetchVariables
//         }
//       ]
//     }
//   )
// }
