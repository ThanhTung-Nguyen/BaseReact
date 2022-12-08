import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_PATIENT = gql`
  query patients(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    patients(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      code
      data {
        id
        avatar
        name
        email
        phone
        birthDate
        sex
        address
        provinceId
        districtId
        wardId
        idNo
        idIssuedDate
        idIssuedPlace
        idImageBack
        idImageFront
        status
        createDate
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_PATIENT = gql`
  query patient($patientId: String!) @api(name: "master") {
    patient(patientId: $patientId) {
      code
      data {
        id
        avatar
        name
        email
        phone
        birthDate
        sex
        address
        provinceId
        districtId
        wardId
        idNo
        idIssuedDate
        idIssuedPlace
        idImageBack
        idImageFront
        status
        createDate
      }
      message
    }
  }
`

export const SAVE_PATIENT = gql`
  mutation savePatient($data: PatientInput!) @api(name: "master") {
    savePatient(data: $data) {
      code
      data {
        id
        status
        createDate
      }
      message
      status
    }
  }
`

export const REMOVE_PATIENT = gql`
  mutation deletePatient($id: String!) @api(name: "master") {
    deletePatient(id: $id) {
      code
      data {
        id
        status
      }
      message
      status
    }
  }
`

export const useQueryPatient = (
  options?: QueryHookOptions<{ patients: IResponse<IPatient[]> }>
) => {
  return useQuery<{ patients: IResponse<IPatient[]> }>(GET_ALL_PATIENT, options)
}

export const useQueryLazyPatient = (
  options?: QueryHookOptions<{ patients: IResponse<IPatient[]> }>
) => {
  return useLazyQuery<{ patients: IResponse<IPatient[]> }>(
    GET_ALL_PATIENT,
    options
  )
}

export const useQueryPatientDetail = (
  options?: QueryHookOptions<{ patient: IResponse<IPatient> }>
) => {
  return useQuery<{ patient: IResponse<IPatient> }>(GET_DETAIL_PATIENT, options)
}

export const useSavePatient = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ savePatient: IResponse<IPatient> }>(SAVE_PATIENT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PATIENT,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemovePatient = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deletePatient: IResponse<IPatient> }>(REMOVE_PATIENT, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PATIENT,
        variables: refetchVariables
      }
    ]
  })
}
