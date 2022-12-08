interface INotifyRequest {
  pageNo: number
  pageSize: number
  /**
   * App user: 1
   *
   * App doctor: 2
   */
  appType: number
  filtered?: IFiltered[]
  title?: string
}

interface INotify {
  id: string
  notifyTypeName: string
  title: string
  content: string
  thumbnail: string
  status: number
  sendDate: string
  isRead: number
  readTime: string
  patientId: string
  doctorId: string
  detail: string
  notificationCode: string
}

interface INotifyType {
  id: string
  name: string
  notificationCode: string
  status: number
  updateDate: string
  createDate: string
  createUserId: string
  createUser: string
  updateUser: string
  updateUserId: string
  isApp: number
  image: string
}

interface IAddNotifyRequest {
  title?: string
  content?: string
  projectCode?: string
  code?: string
  typeCode?: string // SYSTEM, USER
  thumbnail?: string
  url?: string
  userIds?: string[]
  topics?: string[]
  fcmTokens?: string[]
}

interface INotifyReducer extends IResponse<INotify[]> {
  notifyTypes?: INotifyType[]
  loading?: boolean
  errorMessage?: string
}
