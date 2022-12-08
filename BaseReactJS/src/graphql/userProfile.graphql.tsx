import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_LIST_USER_PROFILE_CMS = gql`
  query getListUserProfileCMS(
    $userId: String
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getListUserProfileCMS(
      userId: $userId
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      status
      code
      message
      data {
        relationship
        name
        birthDate
        phone
        email
        address
        provinceId
        districtId
        wardId
        id
        idNo
        insuranceNo
        syncHistoryStatus
        status
        avatar
      }
    }
  }
`

export const GET_USER_PROFILE_CMS = gql`
  query getUserProfileCMS($id: String) @api(name: "graphql") {
    getUserProfileCMS(id: $id) {
      status
      code
      message
      data {
        relationship
        id
        name
        birthDate
        phone
        email
        address
        provinceId
        districtId
        wardId
        idNo
        insuranceNo
        avatar
        createDate
        syncHistoryStatus
        status
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($input: UserInput!) @api(name: "graphql") {
    updateUser(input: $input) {
      status
      code
      message
      data {
        userTypeCode
        name
        birthDate
        id
      }
    }
  }
`

export const UPDATE_PROFILE_CMS = gql`
  mutation updateProfileCMS($userId: String!, $input: ProfileInput!)
  @api(name: "graphql") {
    updateProfileCMS(userId: $userId, input: $input) {
      status
      code
      message
      data {
        relationship
        name
        birthDate
        id
      }
    }
  }
`

export const GET_USER_EXAMINATION_HIS_CMS = gql`
  query getUserExaminationHistoriesCMS(
    $userId: String!
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUserExaminationHistoriesCMS(
      userId: $userId
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        sID
        inTime
        patientName
        phone
        id
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

export const GET_PROFILE_EXAMINATION_HIS_CMS = gql`
  query getProfileExaminationHistoriesCMS(
    $profileId: String!
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getProfileExaminationHistoriesCMS(
      profileId: $profileId
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        sID
        inTime
        patientName
        phone
        id
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

export const SYNC_USER_EXAMINATION_HIS_CMS = gql`
  mutation syncUserExaminationHistoryCMS($userId: String!)
  @api(name: "graphql") {
    syncUserExaminationHistoryCMS(userId: $userId) {
      status
      code
      message
      data
    }
  }
`
export const SYNC_PROFILE_EXAMINATION_HIS_CMS = gql`
  mutation syncProfileExaminationHistoryCMS($prrofileId: String!)
  @api(name: "graphql") {
    syncProfileExaminationHistoryCMS(prrofileId: $prrofileId) {
      status
      code
      message
      data
    }
  }
`

export const GET_SID_DETAIL_CMS = gql`
  # Write your query or mutation here
  query getSidDetailCms($sid: String!) @api(name: "graphql") {
    getSidDetailCms(sid: $sid) {
      status
      code
      message
      data {
        sID
        inTime
        patientName
        patientNameUnsign
        phone
        age
        sex
        pID
        valid
        validTime
        showWeb
        fullResult
        status
        createDate
        id
      }
    }
  }
`
export const GET_SID_DETAIL_FROM_MEDCOM_CMS = gql`
  # Write your query or mutation here
  query getSidDetailFromMedcomCms($sid: String!) @api(name: "graphql") {
    getSidDetailFromMedcomCms(sid: $sid) {
      status
      code
      message
      data {
        sID
        inTime
        patientName
        patientNameUnsign
        phone
        age
        sex
        pID
        valid
        validTime
        showWeb
        status
        fullResult
        createDate
        id
      }
    }
  }
`
export const GET_EXAMINATION_RESULT_CMS = gql`
  query getExaminationResultCms($sid: String!) @api(name: "graphql") {
    getExaminationResultCms(sid: $sid) {
      data {
        sID
        idCls
        testCode
        testName
        testNameE
        result
        diagnosticResult
        unit
        posneg
        comment
        commentE
        bold
        printOrder
        testHead
        color
        normalRange
        normalRangeF
        price
        categoryName
        categoryNameE
        classify
        valid
        showWeb
        dateCDHA
        userCDHA
        doctorAdvised
        doctorName
        status
        createDate
        updateDate
        id
        clsImages {
          medcomId
          idCls
          testCode
          inKQ
          clsImageCreateDate
          clsImageId
          accessionNo
          patientId
          status
          image
        }
      }
      page
      pages
      status
      code
      message
      records
      extra
    }
  }
`
export const GET_EXAMINATION_RESULT_FROM_MEDCOM_CMS = gql`
  query getExaminationResultFromMedcomCms($sid: String!) @api(name: "graphql") {
    getExaminationResultFromMedcomCms(sid: $sid) {
      data {
        sID
        idCls
        testCode
        testName
        testNameE
        result
        diagnosticResult
        unit
        status
        normalRange
        normalRangeF
        quickClsImages {
          medcomId
          idCls
          testCode
          inKQ
          clsImageCreateDate
          clsImageId
          accessionNo
          patientId
          status
          image
        }
      }
      page
      pages
      status
      code
      records
      message
      extra
    }
  }
`
export const RE_SYNC_RESULT_CMS = gql`
  mutation reSyncSidResultCms($sid: String) @api(name: "graphql") {
    reSyncSidResultCms(sid: $sid) {
      status
      code
      message
      data
    }
  }
`

export const useQueryGetListUserProfileCms = (
  options?: QueryHookOptions<{ getListUserProfileCMS: IResponse<any[]> }>
) => {
  return useQuery<{ getListUserProfileCMS: IResponse<any[]> }>(
    GET_LIST_USER_PROFILE_CMS,
    options
  )
}

export const useQueryLazyGetListUserProfileCms = (
  options?: QueryHookOptions<{ getListUserProfileCMS: IResponse<any[]> }>
) => {
  return useLazyQuery<{ getListUserProfileCMS: IResponse<any[]> }>(
    GET_LIST_USER_PROFILE_CMS,
    options
  )
}

export const useQueryGetUserExaminationHisCms = (
  options?: QueryHookOptions<{
    getUserExaminationHistoriesCMS: IResponse<any[]>
  }>
) => {
  return useQuery<{ getUserExaminationHistoriesCMS: IResponse<any[]> }>(
    GET_USER_EXAMINATION_HIS_CMS,
    options
  )
}

export const useQueryLazyGetUserExaminationHisCms = (
  options?: QueryHookOptions<{
    getUserExaminationHistoriesCMS: IResponse<any[]>
  }>
) => {
  return useLazyQuery<{ getUserExaminationHistoriesCMS: IResponse<any[]> }>(
    GET_USER_EXAMINATION_HIS_CMS,
    options
  )
}

export const useQueryGetProfileExaminationHisCms = (
  options?: QueryHookOptions<{
    getProfileExaminationHistoriesCMS: IResponse<any[]>
  }>
) => {
  return useQuery<{ getProfileExaminationHistoriesCMS: IResponse<any[]> }>(
    GET_PROFILE_EXAMINATION_HIS_CMS,
    options
  )
}

export const useQueryLazyGetProfileExaminationHisCms = (
  options?: QueryHookOptions<{
    getProfileExaminationHistoriesCMS: IResponse<any[]>
  }>
) => {
  return useLazyQuery<{ getProfileExaminationHistoriesCMS: IResponse<any[]> }>(
    GET_PROFILE_EXAMINATION_HIS_CMS,
    options
  )
}

export const useQueryGetUserProfileCms = (
  options?: QueryHookOptions<{ getUserProfileCMS: IResponse<any> }>
) => {
  return useQuery<{ getUserProfileCMS: IResponse<any> }>(
    GET_USER_PROFILE_CMS,
    options
  )
}

export const useQueryLazyGetUserProfileCms = (
  options?: QueryHookOptions<{ getUserProfileCMS: IResponse<any> }>
) => {
  return useLazyQuery<{ getUserProfileCMS: IResponse<any> }>(
    GET_USER_PROFILE_CMS,
    options
  )
}

export const useUpdateUser = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ updateUser: IResponse<any> }>(UPDATE_USER, {
    ...options
    // refetchQueries: [
    //   {
    //     query: GET_ALL_USER,
    //     variables: refetchVariables
    //   }
    // ]
  })
}

export const useUpdateProfileCms = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ updateProfileCMS: IResponse<any> }>(UPDATE_PROFILE_CMS, {
    ...options
    // refetchQueries: [
    //   {
    //     query: GET_ALL_USER,
    //     variables: refetchVariables
    //   }
    // ]
  })
}

export const useSyncUserExaminationHisCms = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ syncUserExaminationHistoryCMS: IResponse<any> }>(
    SYNC_USER_EXAMINATION_HIS_CMS,
    {
      ...options
      // refetchQueries: [
      //   {
      //     query: GET_ALL_USER,
      //     variables: refetchVariables
      //   }
      // ]
    }
  )
}
export const useSyncProfileExaminationHisCms = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ syncProfileExaminationHistoryCMS: IResponse<any> }>(
    SYNC_PROFILE_EXAMINATION_HIS_CMS,
    {
      ...options
      // refetchQueries: [
      //   {
      //     query: GET_ALL_USER,
      //     variables: refetchVariables
      //   }
      // ]
    }
  )
}

export const useQueryGetSidDetailCms = (
  options?: QueryHookOptions<{ getSidDetailCms: IResponse<any[]> }>
) => {
  return useQuery<{ getSidDetailCms: IResponse<any[]> }>(
    GET_SID_DETAIL_CMS,
    options
  )
}

export const useQueryLazyGetSidDetailCms = (
  options?: QueryHookOptions<{ getSidDetailCms: IResponse<any[]> }>
) => {
  return useLazyQuery<{ getSidDetailCms: IResponse<any[]> }>(
    GET_SID_DETAIL_CMS,
    options
  )
}

export const useQueryGetSidDetailFromMedcomCms = (
  options?: QueryHookOptions<{ getSidDetailFromMedcomCms: IResponse<any> }>
) => {
  return useQuery<{ getSidDetailFromMedcomCms: IResponse<any> }>(
    GET_SID_DETAIL_FROM_MEDCOM_CMS,
    options
  )
}

export const useQueryLazyGetSidDetailFromMedcomCms = (
  options?: QueryHookOptions<{ getSidDetailFromMedcomCms: IResponse<any> }>
) => {
  return useLazyQuery<{ getSidDetailFromMedcomCms: IResponse<any> }>(
    GET_SID_DETAIL_FROM_MEDCOM_CMS,
    options
  )
}

export const useQueryGetExaminationResultCms = (
  options?: QueryHookOptions<{ getExaminationResultCms: IResponse<any[]> }>
) => {
  return useQuery<{ getExaminationResultCms: IResponse<any[]> }>(
    GET_EXAMINATION_RESULT_CMS,
    options
  )
}

export const useQueryLazyGetExaminationResultCms = (
  options?: QueryHookOptions<{ getExaminationResultCms: IResponse<any[]> }>
) => {
  return useLazyQuery<{ getExaminationResultCms: IResponse<any[]> }>(
    GET_EXAMINATION_RESULT_CMS,
    options
  )
}

export const useQueryGetExaminationResultFromMedcomCms = (
  options?: QueryHookOptions<{
    getExaminationResultFromMedcomCms: IResponse<any[]>
  }>
) => {
  return useQuery<{ getExaminationResultFromMedcomCms: IResponse<any[]> }>(
    GET_EXAMINATION_RESULT_FROM_MEDCOM_CMS,
    options
  )
}

export const useQueryLazyGetExaminationResultFromMedcomCms = (
  options?: QueryHookOptions<{
    getExaminationResultFromMedcomCms: IResponse<any[]>
  }>
) => {
  return useLazyQuery<{ getExaminationResultFromMedcomCms: IResponse<any[]> }>(
    GET_EXAMINATION_RESULT_FROM_MEDCOM_CMS,
    options
  )
}

export const useReSyncSidResultCms = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ reSyncSidResultCms: IResponse<any> }>(
    RE_SYNC_RESULT_CMS,
    {
      ...options
      // refetchQueries: [
      //   {
      //     query: GET_ALL_USER,
      //     variables: refetchVariables
      //   }
      // ]
    }
  )
}
