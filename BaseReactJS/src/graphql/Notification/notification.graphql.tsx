import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery
} from "@apollo/client"

export const GET_NOTIFICATIONS = gql`
  query getNotifications(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getNotifications(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        projectCode
        code
        typeCode
        topics
        conditions
        title
        content
        id
        thumbnail
        objectId
        url
        images
        extra
        badges
        sound
        expirtedDate
        status
        createDate
        source
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

export const GET_DETAIL_NOTIFICATION = gql`
  # Write your query or mutation here
  query getNotification($id: String!) @api(name: "graphql") {
    getNotification(id: $id) {
      data {
        projectCode
        code
        typeCode
        topics
        conditions
        title
        content
        id
        thumbnail
        objectId
        url
        images
        extra
        badges
        sound
        expirtedDate
        status
        createDate
        source
      }
      status
      code
      message
    }
  }
`

export const SEND_NOTIFICATION = gql`
  # Write your query or mutation here
  mutation sendNotification($input: NotificationInput!) @api(name: "graphql") {
    sendNotification(input: $input) {
      status
      code
      message
      data {
        code
        createUserId
      }
    }
  }
`

export const GET_USER_NOTIFICATIONS = gql`
  query getCmsUserNotifications(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getCmsUserNotifications(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        projectCode
        code
        typeCode
        title
        content
        name
        phone
        read
        readDate
        source
        createDate
        userId
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

export const GET_USER_FCMS = gql`
  query getUserFcms(
    $page: Int
    $pageSize: Int
    $sorted: [SortedInput]
    $filtered: [FilteredInput]
  ) @api(name: "graphql") {
    getUserFcms(
      page: $page
      pageSize: $pageSize
      sorted: $sorted
      filtered: $filtered
    ) {
      data {
        userId
        name
        phone
        fcmToken
        platform
        projectCode
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

export const useQueryGetNotifications = (
  options?: QueryHookOptions<{
    getNotifications: IResponse<INotification[]>
  }>
) => {
  return useQuery<{ getNotifications: IResponse<INotification[]> }>(
    GET_NOTIFICATIONS,
    options
  )
}

export const useLazyQueryNotifications = (
  options?: QueryHookOptions<{
    getNotifications: IResponse<INotification[]>
  }>
) => {
  return useLazyQuery<{
    getNotifications: IResponse<INotification[]>
  }>(GET_NOTIFICATIONS, options)
}

export const useQueryGetNotificationDetail = (
  options?: QueryHookOptions<{
    getNotification: IResponse<INotification>
  }>
) => {
  return useQuery<{ getNotification: IResponse<INotification> }>(
    GET_DETAIL_NOTIFICATION,
    options
  )
}

export const useLazyQueryGetNotificationDetail = (
  options?: QueryHookOptions<{
    getNotification: IResponse<INotification>
  }>
) => {
  return useLazyQuery<{ getNotification: IResponse<INotification> }>(
    GET_DETAIL_NOTIFICATION,
    options
  )
}

export const useSendNotification = (
  options?: MutationHookOptions,
  refetchVariables?: any
) => {
  return useMutation<{ sendNotification: IResponse<INotification> }>(
    SEND_NOTIFICATION,
    {
      ...options,
      refetchQueries: [
        {
          query: GET_NOTIFICATIONS,
          variables: refetchVariables
        }
      ]
    }
  )
}

export const useQueryGetUserNotifications = (
  options?: QueryHookOptions<{
    getCmsUserNotifications: IResponse<IUserNotification[]>
  }>
) => {
  return useQuery<{ getCmsUserNotifications: IResponse<IUserNotification[]> }>(
    GET_USER_NOTIFICATIONS,
    options
  )
}

export const useLazyQueryUserNotifications = (
  options?: QueryHookOptions<{
    getCmsUserNotifications: IResponse<IUserNotification[]>
  }>
) => {
  return useLazyQuery<{
    getCmsUserNotifications: IResponse<IUserNotification[]>
  }>(GET_USER_NOTIFICATIONS, options)
}

export const useQueryGetUserFcms = (
  options?: QueryHookOptions<{
    getUserFcms: IResponse<IUserFcm[]>
  }>
) => {
  return useQuery<{ getUserFcms: IResponse<IUserFcm[]> }>(
    GET_USER_FCMS,
    options
  )
}

export const useLazyQueryUserFcms = (
  options?: QueryHookOptions<{
    getUserFcms: IResponse<IUserFcm[]>
  }>
) => {
  return useLazyQuery<{
    getUserFcms: IResponse<IUserFcm[]>
  }>(GET_USER_FCMS, options)
}
