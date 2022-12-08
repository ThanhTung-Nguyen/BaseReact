import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_USER_REFERRAL_REPORTS = gql`
  # Write your query or mutation here
  query getUserRefferalReports(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUserRefferalReports(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        name
        phone
        referralCode
        total
        createDate
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

export const EXPORT_EXCEL_USER_REFERRAL_REPORTS = gql`
  mutation exportFileuUserRefferal($fromDate: String!, $toDate: String!)
  @api(name: "graphql") {
    exportFileuUserRefferal(fromDate: $fromDate, toDate: $toDate) {
      status
      code
      message
      data
    }
  }
`

export const useQueryUserReferralReport = (
  options?: QueryHookOptions<{
    getUserRefferalReports: IResponse<IVUserReferralReport[]>
  }>
) => {
  return useQuery<{
    getUserRefferalReports: IResponse<IVUserReferralReport[]>
  }>(GET_USER_REFERRAL_REPORTS, options)
}

export const useQueryLazyUserReferralReport = (
  options?: QueryHookOptions<{
    getUserRefferalReports: IResponse<IVUserReferralReport[]>
  }>
) => {
  return useLazyQuery<{
    getUserRefferalReports: IResponse<IVUserReferralReport[]>
  }>(GET_USER_REFERRAL_REPORTS, options)
}

export const useExportExcelUserReferralReport = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ exportFileuUserRefferal: IResponse<any> }>(
    EXPORT_EXCEL_USER_REFERRAL_REPORTS,
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
