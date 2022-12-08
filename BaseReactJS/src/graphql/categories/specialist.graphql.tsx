import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_ALL_SPECIALIST = gql`
  query specialistes(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "master") {
    specialistes(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      status
      code
      data {
        id
        code
        name
        orders
        status
        createDate
        createUser
        parentId
      }
      message
      page
      pages
      records
    }
  }
`

export const GET_DETAIL_SPECIALIST = gql`
  query specialist($id: String!) @api(name: "master") {
    specialist(id: $id) {
      status
      code
      data {
        id
        specialistCode
        name
        description
        status
        createDate
        createUser
        parentId
      }
      message
    }
  }
`

export const SAVE_SPECIALIST = gql`
  mutation saveSpecialist($data: SpecialistInput!) @api(name: "master") {
    saveSpecialist(data: $data) {
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

export const REMOVE_SPECIALIST = gql`
  mutation deleteSpecialist($id: String!) @api(name: "master") {
    deleteSpecialist(id: $id) {
      status
      code
      data {
        id
        code
        status
      }
      message
    }
  }
`

export const GET_SPECIALIST_BY_TYPE = `gql`

export const ACTIVE_SPECIALIST = gql`
  mutation activeSpecialist($id: String!) @api(name: "master") {
    activeSpecialist(id: $id) {
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

export const DE_ACTIVE_SPECIALIST = gql`
  mutation deActiveSpecialist($id: String!) @api(name: "master") {
    deActiveSpecialist(id: $id) {
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

export const useQuerySpecialists = (
  options?: QueryHookOptions<{
    specialistes: IResponse<ISpecialist[]>
  }>
) => {
  return useQuery<{ specialistes: IResponse<ISpecialist[]> }>(
    GET_ALL_SPECIALIST,
    options
  )
}

export const useLazyQuerySpecialists = (
  options?: QueryHookOptions<{
    specialistes: IResponse<ISpecialist[]>
  }>
) => {
  return useLazyQuery<{ specialistes: IResponse<ISpecialist[]> }>(
    GET_ALL_SPECIALIST,
    options
  )
}

export const useQuerySpecialistDetail = (
  options?: QueryHookOptions<{ specialist: IResponse<ISpecialist> }>
) => {
  return useQuery<{ specialist: IResponse<ISpecialist> }>(
    GET_DETAIL_SPECIALIST,
    options
  )
}

export const useSaveSpecialist = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ saveSpecialist: IResponse<ISpecialist> }>(
    SAVE_SPECIALIST,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SPECIALIST,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useRemoveSpecialist = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deleteSpecialist: IResponse<ISpecialist> }>(
    REMOVE_SPECIALIST,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SPECIALIST,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useActiveSpecialist = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ activeSpecialist: IResponse<ISpecialist> }>(
    ACTIVE_SPECIALIST,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SPECIALIST,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useDeActiveSpecialist = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ deActiveSpecialist: IResponse<ISpecialist> }>(
    DE_ACTIVE_SPECIALIST,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_ALL_SPECIALIST,
          variables: refetchVariables
        }
      ]
    }
  )
}
