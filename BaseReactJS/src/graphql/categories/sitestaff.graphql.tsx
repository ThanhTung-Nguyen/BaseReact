import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_SITE_STAFF = gql`
  query siteStaffs(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    siteStaffs(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      code
      data {
        code
        name
        birthDate
        sex
        address
        facilityId
        facilityName
        parentFacilityId
        parentFacilityName
        createDate
        createUser
        status
      }
      message
      page
      pages
      records
      status
    }
  }
`
export const GET_DETAIL_SITE_STAFF = gql`
  query siteStaff($id: String!) {
    siteStaff(id: $id) @api(name: "master") {
      code
      data {
        id
        code
        name
        birthDate
        sex
        address
        facilityId
        parentFacilityId
        createDate
        createUser
      }
      message
      status
    }
  }
`

export const SAVE_SITE_STAFF = gql`
  mutation saveSiteStaff($data: SiteStaffInput!) @api(name: "master") {
    saveSiteStaff(data: $data) {
      code
      data {
        id
        code
        name
        status
      }
      message
      status
    }
  }
`

export const REMOVE_SITE_STAFF = gql`
  mutation deleteSiteStaff($id: String!) @api(name: "master") {
    deleteSiteStaff(id: $id) {
      code
      data {
        id
        code
        name
        status
      }
      message
      status
    }
  }
`
export const ACTIVE_SITE_STAFF = gql`
  mutation activeSiteStaff($id: String!) @api(name: "master") {
    activeSiteStaff(id: $id) {
      code
      data {
        id
        code
        status
      }
      message
      status
    }
  }
`

export const DE_ACTIVE_SITE_STAFF = gql`
  mutation deActiveSiteStaff($id: String!) @api(name: "master") {
    deActiveSiteStaff(id: $id) {
      code
      data {
        id
        code
        status
      }
      message
      status
    }
  }
`

export const DELETE_PERMANENTLY_SITE_STAFF = gql`
  mutation deletePermanentlySiteStaff($id: String!) @api(name: "master") {
    deletePermanentlySiteStaff(id: $id) {
      code
      data {
        id
        code
        status
      }
      message
      status
    }
  }
`

export const useQuerySiteStaff = (
  options?: QueryHookOptions<{
    siteStaffs: IResponse<ISiteStaff[]>
  }>
) => {
  return useQuery<{ siteStaffs: IResponse<ISiteStaff[]> }>(
    GET_ALL_SITE_STAFF,
    options
  )
}

export const useLazyQuerySiteStaff = (
  options?: QueryHookOptions<{
    siteStaffs: IResponse<ISiteStaff[]>
  }>
) => {
  return useLazyQuery<{
    siteStaffs: IResponse<ISiteStaff[]>
  }>(GET_ALL_SITE_STAFF, options)
}

export const useQueryBusinessDetail = (
  options?: QueryHookOptions<{ siteStaff: IResponse<ISiteStaff> }>
) => {
  return useQuery<{ siteStaff: IResponse<ISiteStaff> }>(
    GET_DETAIL_SITE_STAFF,
    options
  )
}

export const useSaveSiteStaff = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveSiteStaff: IResponse<ISiteStaff> }>(
    SAVE_SITE_STAFF,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SITE_STAFF,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveSiteStaff = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteSiteStaff: IResponse<ISiteStaff> }>(
    REMOVE_SITE_STAFF,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SITE_STAFF,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useApproveSiteStaff = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ activeSiteStaff: IResponse<ISiteStaff> }>(
    ACTIVE_SITE_STAFF,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SITE_STAFF,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useUnApproveSiteStaff = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deActiveSiteStaff: IResponse<ISiteStaff> }>(
    DE_ACTIVE_SITE_STAFF,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SITE_STAFF,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useDeletePermanentlySiteStaff = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deletePermanentlySiteStaff: IResponse<ISiteStaff> }>(
    DELETE_PERMANENTLY_SITE_STAFF,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SITE_STAFF,
          variables: refetchVariables
        }
      ]
    }
  )
}
