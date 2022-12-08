import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_PACKAGE = gql`
  query getAllPackages(
    $hastag: String
    $cateId: String
    $provinceId: String
    $minPrice: Float
    $maxPrice: Float
    $age: Int
    $gender: String
    $pageSize: Int
  ) @api(name: "graphql") {
    getAllPackages(
      hashtag: $hastag
      cateId: $cateId
      provinceId: $provinceId
      minPrice: $minPrice
      maxPrice: $maxPrice
      age: $age
      gender: $gender
      pageSize: $pageSize
    ) {
      data {
        id
        code
        name
        image
        sex
        startDate
        endDate
      }
      page
      pages
      status
      code
      records
      message
    }
  }
`

export const GET_DETAIL_PACKAGE = gql`
  query packagesById($id: String!) @api(name: "master") {
    packagesById(id: $id) {
      status
      code
      data {
        id
        image
        code
        name
        sex
        minAge
        maxAge
        maxNumBook
        originPrice
        display
        preBookHour
        homeSalePrice
        hosSalePrice
        methodType
        useQuantity
        bookQuantity
        packageHisId
        packageDetail {
          provinces
          applyFacilities
          packageTypes
          weekDays
        }
        services {
          serviceId
          serviceCode
          serviceName
          originPrice
          homeSalePrice
          isDisplay
          status
        }
        description
        startDate
        endDate
        status
        createDate
        createUser
        approveDate
        approveUser
        processNote
        warningNote
      }
      message
    }
  }
`

export const SAVE_PACKAGE = gql`
  mutation savePackageCms($data: PackageInput) @api(name: "master") {
    savePackageCms(data: $data) {
      code
      status
      data {
        id
        image
        code
        sex
        description
        createDate
        createUser
        status
      }
      message
    }
  }
`

export const ADD_PACKAGE_CMS = gql`
  mutation addPackageCms($data: PackageInput) @api(name: "master") {
    addPackageCms(data: $data) {
      status
      message
      code
      data {
        id
        status
      }
    }
  }
`

export const REMOVE_PACKAGE = gql`
  mutation deletePackage($id: String!) @api(name: "master") {
    deletePackage(id: $id) {
      status
      code
      data {
        id
        code
        name
        status
      }
      message
    }
  }
`
export const APPROVE_PACKAGE = gql`
  mutation activePackage($id: String!) @api(name: "master") {
    activePackage(id: $id) {
      status
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

export const UNAPPROVE_PACKAGE = gql`
  mutation deActivePackage($id: String!) @api(name: "master") {
    deActivePackage(id: $id) {
      status
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

export const useQueryPackage = (
  options?: QueryHookOptions<{
    getAllPackages: IResponse<IPackage[]>
  }>
) => {
  return useQuery<{ getAllPackages: IResponse<IPackage[]> }>(
    GET_ALL_PACKAGE,
    options
  )
}

export const useLazyQueryPackage = (
  options?: QueryHookOptions<{
    getAllPackages: IResponse<IPackage[]>
  }>
) => {
  return useLazyQuery<{ getAllPackages: IResponse<IPackage[]> }>(
    GET_ALL_PACKAGE,
    options
  )
}

export const useQueryPackageDetail = (
  options?: QueryHookOptions<{
    packagesById: IResponse<IPackage>
  }>
) => {
  return useQuery<{ packagesById: IResponse<IPackage> }>(
    GET_DETAIL_PACKAGE,
    options
  )
}

export const useLazyQueryPackageDetail = (
  options?: QueryHookOptions<{
    packagesById: IResponse<IPackage>
  }>
) => {
  return useLazyQuery<{ packagesById: IResponse<IPackage> }>(
    GET_DETAIL_PACKAGE,
    options
  )
}

export const useSavePackage = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ savePackageCms: IResponse<IPackage> }>(SAVE_PACKAGE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PACKAGE,
        variables: refetchVariables
      }
    ]
  })
}

export const useAddPackage = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ addPackageCms: IResponse<IPackage> }>(ADD_PACKAGE_CMS, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PACKAGE,
        variables: refetchVariables
      }
    ]
  })
}

export const useRemovePackage = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deletePackage: IResponse<IPackage> }>(REMOVE_PACKAGE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PACKAGE,
        variables: refetchVariables
      }
    ]
  })
}

export const useApprovePackage = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ activePackage: IResponse<IPackage> }>(APPROVE_PACKAGE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PACKAGE,
        variables: refetchVariables
      }
    ]
  })
}

export const useUnApprovePackage = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deActivePackage: IResponse<IPackage> }>(
    UNAPPROVE_PACKAGE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE,
          variables: refetchVariables
        }
      ]
    }
  )
}
