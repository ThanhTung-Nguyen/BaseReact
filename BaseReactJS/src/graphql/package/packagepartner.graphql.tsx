import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_ACTIVE_PARTNER = gql`
  query getAllActivePartner @api(name: "master") {
    getAllActivePartner {
      code
      data {
        id
        name
        code
        status
      }
      message
    }
  }
`

export const GET_ALL_PACKAGE_PARTNERS = gql`
  query packagePartners(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    packagePartners(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      code
      data {
        id
        name
        code
        startDate
        endDate
        image
        originPrice
        hosSalePrice
        display
        partnerToDate
        partnerFromDate
        partnerImg
        partnerId
        partnerDesc
        partnerName
        partnerSalePrice
        createDate
        createUser
        status
        packageId
      }
      message
      page
      pages
      records
      status
    }
  }
`

export const GET_DETAIL_PACKAGE_PARTNER = gql`
  query packagePartner($packageId: String!, $partnerId: String!)
  @api(name: "master") {
    packagePartner(packageId: $packageId, partnerId: $partnerId) {
      code
      data {
        id
        packageId
        partnerId
        partnerDesc
        partnerImg
        partnerFromDate
        partnerToDate
        status
        partnerSalePrice
      }
      message
      message
    }
  }
`

export const SAVE_PACKAGE_PARTNER = gql`
  mutation savePackagePartner($data: PackagePartnerInput) @api(name: "master") {
    savePackagePartner(data: $data) {
      code
      code
      message
      status
    }
  }
`

export const useQueryAllActivePartner = (
  options?: QueryHookOptions<{
    getAllActivePartner: IResponse<IPartner[]>
  }>
) => {
  return useQuery<{ getAllActivePartner: IResponse<IPartner[]> }>(
    GET_ALL_ACTIVE_PARTNER,
    options
  )
}

export const useLazyQueryAllActivePartner = (
  options?: QueryHookOptions<{
    getAllActivePartner: IResponse<IPartner[]>
  }>
) => {
  return useLazyQuery<{ getAllActivePartner: IResponse<IPartner[]> }>(
    GET_ALL_ACTIVE_PARTNER,
    options
  )
}

export const useQueryPackagePartners = (
  options?: QueryHookOptions<{
    packagePartners: IResponse<IPackagePartnerList[]>
  }>
) => {
  return useQuery<{ packagePartners: IResponse<IPackagePartnerList[]> }>(
    GET_ALL_PACKAGE_PARTNERS,
    options
  )
}

export const useLazyQueryPackagePartners = (
  options?: QueryHookOptions<{
    packagePartners: IResponse<IPackagePartnerList[]>
  }>
) => {
  return useLazyQuery<{ packagePartners: IResponse<IPackagePartnerList[]> }>(
    GET_ALL_PACKAGE_PARTNERS,
    options
  )
}

export const useQueryPackagePartnerDetail = (
  options?: QueryHookOptions<{
    packagePartner: IResponse<IPackagePartnerInput>
  }>
) => {
  return useQuery<{ packagePartner: IResponse<IPackagePartnerInput> }>(
    GET_DETAIL_PACKAGE_PARTNER,
    options
  )
}

export const useLazyQueryPackagePartnerDetail = (
  options?: QueryHookOptions<{
    packagePartner: IResponse<IPackagePartnerInput>
  }>
) => {
  return useLazyQuery<{ packagePartner: IResponse<IPackagePartnerInput> }>(
    GET_DETAIL_PACKAGE_PARTNER,
    options
  )
}

export const useSavePackagePartner = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ savePackagePartner: IResponse<IPackagePartnerInput> }>(
    SAVE_PACKAGE_PARTNER,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE_PARTNERS,
          variables: refetchVariables
        }
      ]
    }
  )
}
