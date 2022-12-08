import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
  useMutation
} from "@apollo/client"

export const GET_ALL_PACKAGE_TYPE = gql`
  query findPackageTypeCms @api(name: "master") {
    findPackageTypeCms {
      status
      code
      data {
        id
        image
        name
        description
        createDate
        createUser
        status
        orders
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_PACKAGE_TYPE = gql`
  query packageType($id: String!) @api(name: "master") {
    packageType(id: $id) {
      code
      data {
        id
        name
        status
        createDate
        createUser
        description
      }
      message
    }
  }
`

export const SAVE_PACKAGE_TYPE = gql`
  mutation savePackageType($data: PackageTypeInput) @api(name: "master") {
    savePackageType(data: $data) {
      code
      data {
        id
        name
        status
        description
        createDate
        createUser
      }
      message
    }
  }
`

export const REMOVE_PACKAGE_TYPE = gql`
  mutation deletePackageType($id: String!) @api(name: "master") {
    deletePackageType(id: $id) {
      code
      data
      message
    }
  }
`
export const ACTIVE_PACKAGE_TYPE = gql`
  mutation activePackageType($id: String!) @api(name: "master") {
    activePackageType(id: $id) {
      status
      code
      data {
        id
        name
        status
        description
        createDate
        createUser
      }
      message
    }
  }
`

export const INACTIVE_PACKAGE_TYPE = gql`
  mutation deActivePackageType($id: String!) @api(name: "master") {
    deActivePackageType(id: $id) {
      status
      code
      data {
        id
        name
        status
        description
        createDate
        createUser
      }
      message
    }
  }
`

export const FIND_PACKAGE_TYPE = gql`
  query findPackageTypeCms @api(name: "master") {
    findPackageTypeCms {
      status
      code
      data {
        id
        image
        name
        description
        createDate
        createUser
        status
        orders
      }
      message
      page
      pages
      records
    }
  }
`

export const useQueryPackageType = (
  options?: QueryHookOptions<{ findPackageTypeCms: IResponse<IPackageType[]> }>
) => {
  return useQuery<{ findPackageTypeCms: IResponse<IPackageType[]> }>(
    GET_ALL_PACKAGE_TYPE,
    options
  )
}

export const useQueryLazyPackageType = (
  options?: QueryHookOptions<{ findPackageTypeCms: IResponse<IPackageType[]> }>
) => {
  return useLazyQuery<{ findPackageTypeCms: IResponse<IPackageType[]> }>(
    GET_ALL_PACKAGE_TYPE,
    options
  )
}

export const useQueryPackageTypeDetail = (
  options?: QueryHookOptions<{ packageType: IResponse<IPackageType> }>
) => {
  return useQuery<{ packageType: IResponse<IPackageType> }>(
    GET_DETAIL_PACKAGE_TYPE,
    options
  )
}

export const useSavePackageType = (options?: MutationHookOptions) => {
  return useMutation<{ savePackageType: IResponse<IPackageType> }>(
    SAVE_PACKAGE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE_TYPE
        }
      ]
    }
  )
}

export const useRemovePackageType = (options?: MutationHookOptions) => {
  return useMutation<{ deletePackageType: IResponse<IPackageType> }>(
    REMOVE_PACKAGE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE_TYPE
        }
      ]
    }
  )
}

export const useActivePackageType = (options?: MutationHookOptions) => {
  return useMutation<{ activePackageType: IResponse<IPackageType> }>(
    ACTIVE_PACKAGE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE_TYPE
        }
      ]
    }
  )
}

export const useDeActivePackageType = (options?: MutationHookOptions) => {
  return useMutation<{ deActivePackageType: IResponse<IPackageType> }>(
    INACTIVE_PACKAGE_TYPE,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_PACKAGE_TYPE
        }
      ]
    }
  )
}
