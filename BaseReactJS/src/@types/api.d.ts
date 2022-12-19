interface Res {
  data: any
  message: string
}

interface IResponse<T = any> {
  data: T
  message: string
  code: string
  status: number
  page?: number
  pages?: number
  records?: number

  email?: string
  phone?: string
}

// interface IUploadResponse {
//   fileExtention?: string
//   fileName?: string
//   filePath?: string
//   fileSize?: number
// }

interface IFiltered {
  id: string
  value: string
  operation: string
}

interface IGeneralInfo {
  id?: string
  userName?: string
  name?: string
  phone?: string
  email?: string
  address?: string
  avatar?: string
  birthDate?: string
  userTypeCode?: string
  status?: number
}

interface IChangePassword {
  id?: string
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}

interface IUserFunction {
  id: string
  code?: string
  name?: string
  parentId?: string
}

interface IProvince {
  code?: string
  name?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  id?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  orders?: number
}

interface IDistrict {
  code?: string
  name?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  id?: string
  provinceId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface IWard {
  code?: string
  name?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  id?: string
  districtId?: string
  provinceId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface IProject {
  code: string
  name: string
  description: string
  status: !Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
  defaultTopic: string
}

interface IPatient {
  pid?: string
  patientHisId?: string
  type?: string
  name?: string
  birthDate?: DateTime
  sex?: string
  birthYear?: Int
  avatar?: string
  address?: string
  phone?: string
  email?: string
  provinceId?: string
  districtId?: string
  wardId?: string
  streetId?: string
  idNo?: string
  idIssuedDate?: DateTime
  idIssuedPlace?: string
  idImageFront?: string
  idImageBack?: string
  userId?: string
  id?: ID
  status?: Int
  createDate?: DateTime
  createUser?: string
  createUserId?: string
  updateDate?: DateTime
  updateUser?: string
  updateUserId?: string
  profileId?: ID
  provinceName?: string
  districtName?: string
  wardName?: string
  nationality?: string
}

interface IPackageType {
  id?: ID
  name?: string
  description?: string
  image?: string
  createDate?: DateTime
  createUser?: string
  updateDate?: DateTime
  updateUser?: string
  status?: Int
  orders?: Int
}

interface IFunction {
  id?: string
  code?: string
  name?: string
  parentId?: string
  status?: Int
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}
interface IFacility {
  name: !string
  facilityType: !string
  facilityHisId: !string
  facilityCode: !string
  parentId: ID
  description: !string
  hotline: !string
  rating: !Int
  numRating: !Int
  address: !string
  image: !string
  provinceId: ID
  districtId: ID
  wardId: ID
  isHospital: !Int
  isHome: !Int
  homeContract: !string
  hospitalContract: !string
  provinceIds: !string
  display: !string
  latitude: !Float
  longitude: !Float
  status: !Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IWorkSession {
  name?: string
  id?: string
  status?: string
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface IWorkTime {
  name: string
  type: string
  startTime: string
  endTime: string
  workSessionId: string
  id: string
  status: number
  createDate: string
  createUser: string
  createUserId: string
  updateDate: string
  updateUser: string
  updateUserId: string
}

interface IService {
  code?: string
  name?: string
  description?: string
  serviceHisId?: string
  serviceTypeId?: string
  generalMeaning?: string
  detailMeaning?: string
  unit?: string
  maxValue?: string
  minValue?: string
  parentId?: string
  approveDate?: string
  approveUser?: string
  id?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  isDisplay?: number
  isUsed?: number
  isProfile?: number
  returnDuration?: string
  originPrice?: number
  serviceCode?: string
  serviceId?: string
  serviceName?: string
}

interface IServiceType {
  id?: string
  name?: string
  description?: string
}

interface ISpecialist {
  code?: string
  name?: string
  specialistHisId?: string
  parentId?: string
  id?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  orders?: number
}

interface IBannerType {
  id?: string
  name?: string
  code?: string
  description?: string
  parentId?: string
  status?: number
  updateDate?: string
  createDate?: string
  createUser?: string
  updateUser?: string
  createUserId?: string
  updateUserId?: string
}

interface IBusiness {
  description?: string
  name?: string
  type?: string
  id?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface ISiteStaff {
  code?: string
  name?: string
  staffHisId?: string
  birthDate?: string
  sex?: string
  avatar?: string
  address?: string
  email?: string
  phone?: string
  hisUserName?: string
  userId?: string
  facilityId?: string
  parentFacilityId?: string
  isBotMessage?: string
  id?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}
interface IGroup {
  id?: string
  name?: string
  code?: string
  status?: Int
  description?: string
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface IGroupFunction {
  id?: string
  permissionType?: Int
  functionId?: string
  objectId?: string
  status?: Int
  dataScope?: Int
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  functionCode?: string
  functionName?: string
  parentId?: string
  groupName?: string
}

interface IParam {
  id?: string
  name?: string
  description?: string
  parentId?: string
  functionId?: string
  status?: Int
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
}

interface IUserType {
  name: !string
  code: !string
  status: !Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IUserFacility {
  id: ID
  userId: ID
  facilityId: ID
  status: Int
  createDate: DateTime
  createUser: string
  createUserId: ID
  updateDate: DateTime
  updateUser: string
  updateUserId: ID
}

interface IUserType {
  id: string
  name: string
  code: string
  status: Int
  createDate: string
  createUser: string
  createUserId: string
  updateDate: string
  updateUser: string
  updateUserId: string
}
interface IArticle {
  id?: string
  categoryId?: string
  subject?: string
  summary?: string
  content?: string
  thumbnail?: string
  video?: string
  approveDate?: string
  approveUser?: string
  status?: number
  show?: number
  isNotify?: number
  isDisplay?: number
  updateDate?: string
  createDate?: string
  createUser?: string
  updateUser?: string
  createUserId?: string
  updateUserId?: string
  url?: string
  like?: number
  view?: number
}

interface IArticleComment {
  id: number
  content?: string
  status?: boolean
  createdUser: string
  createdDate?: number
}

interface IArticleLike {
  id: number
  status?: boolean
  createdUser: string
  createdDate?: number
}

interface IPackage {
  id?: string
  name?: string
  code?: string
  startDate?: string
  endDate?: string
  image?: string
  originPrice?: number
  hosSalePrice?: number
  homeSalePrice?: number
  display?: string
  status?: number
  createDate?: string
  createUser?: string
}

interface IConfig {
  projectId: !ID
  platform: !string
  version: !string
  versionReview: !string
  isInReview: !Boolean
  url: !string
  forceUpdate: !Boolean
  extra: !string
  status: !Int
  termsOfUse: string
  policy: string
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
  project: Project
}

interface INotification {
  projectCode: !string
  code: !string
  typeCode: string
  sendType: string
  topics: [string!]
  conditions: string
  title: !string
  content: string
  thumbnail: string
  objectId: ID
  url: string
  images: [string!]
  extra: string
  badges: Int
  sound: string
  expirtedDate: DateTime
  status: Int
  userIds: [ID!]
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IApiLog {
  name: string
  serviceName: string
  fullPath: string
  functionName: string
  caller: string
  description: string
  startTime: DateTime
  endTime: DateTime
  duration: number
  param: string
  headers: string
  response: string
  responseStatus: number
  code: string
  message: string
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IStatisticApiLog {
  countSuccess: number
  countError: number
}

interface IFollowVideoCall {
  id?: string
  callStartTime?: string
  callStartAnswerTime?: string
  callEndTime?: string
  consultStatus?: string
  note?: string
  failReason?: string
  doctorId?: string
  doctorName?: string
  doctorPhone?: string
  vcRequestId?: string
  reason?: string
  requestDate?: string
  name?: string
  avatar?: string
  sex?: string
  birthDate?: string
  phone?: string
  workTimeName?: string
  startTime?: string
  endTime?: string
  status?: number
  objectId?: string
  objectType?: string
  scheduleDate?: string
}

interface IWorkTimeFacility {
  facilityId?: string
  workTimes?: IWorkTime[]
}

interface IPartner {
  id?: string
  name?: string
  code?: string
  status?: number
}

interface IPackagePartnerList {
  id?: string
  name?: string
  code?: string
  startDate?: string
  endDate?: string
  image?: string
  originPrice?: number
  hosSalePrice?: number
  display?: string
  partnerToDate?: string
  partnerFromDate?: string
  partnerImg?: string
  partnerId?: string
  partnerDesc?: string
  partnerName?: string
  createDate?: string
  createUser?: string
  status?: number
}
interface IStatisticalList {
  name: string
  serviceName?: string
  fullPath?: string
  functionName?: string
  caller?: string
  description?: string
  startTime?: DateTime
  endTime?: DateTime
  duration?: Float
  param?: string
  headers?: string
  response?: string
  responseStatus?: Int!
  code?: string
  message?: string
  appointmentHisId?: string
  phone?: string
  cComesAppointmentId?: string
  createDate?: DateTime
  updateDate?: DateTime
  createUser?: string
  updateUser?: string
  createUserId?: ID
  updateUserId?: ID
  id?: ID
}

interface IPackagePartnerInput {
  id?: string
  packageId?: string
  partnerId?: string
  partnerToDate?: string
  partnerFromDate?: string
  partnerImg?: string
  partnerDesc?: string
}

interface ICategory {
  id?: string
  projectCode?: string
  name?: string
  description?: string
  parentId?: string
  status?: number
  updateDate?: string
  createDate?: string
  createUser?: string
  updateUser?: string
  createUserId?: string
  updateUserId?: string

  // id?: number
  email?: string
  phone?: string
}

interface IBanner {
  subject?: string
  content?: string
  bannerTypeCode?: string
  displayType: Int
  image?: string
  url?: string
  approveDate?: DateTime
  approveUser?: string
  status?: Int
  order?: Int
  projectIds?: [ID]
  leftButtonName: string
  rightButtonName: string
  createDate?: DateTime
  updateDate?: DateTime
  createUser?: string
  updateUser?: string
  createUserId?: ID
  updateUserId?: ID
  id?: ID
  objectId: ID
  bannerKind?: IBanerType
  bannerProjectIds: [string]
}
interface INews {
  categoryId?: string
  subject?: string
  summary?: string
  thumbnail?: string
  content?: string
  video?: string
  releaseDate?: DateTime
  approveDate?: DateTime
  approveUser?: string
  status?: Int
  isDisplay?: Int
  isNotify?: Int
  show?: Int
  projectIds?: [ID]
  createDate?: DateTime
  updateDate?: DateTime
  createUser?: string
  updateUser?: string
  createUserId?: ID
  updateUserId?: ID
  id?: ID
  category?: Category
  articleProjectIds?: [string]
  url?: string
  view?: Int
}

interface ICategory {
  name: string
  description: string
  parentId: ID
  status: Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  // id: ID
  id?: string
  parent?: IArticleCategory
  children?: IArticleCategory[]
}

interface IUserLogin {
  browser?: string
  createDate?: string
  device?: string
  id?: string
  ip?: string
  loginType?: number
  os?: string
  refreshToken?: string
  refreshTokenExpiredDate?: string
  socialId?: string
  socialToken?: string
  status?: number
  token?: string
  tokenExpiredDate?: string
  updateDate?: string
  userCode?: string
  userId?: string
}

interface ICurrentUser {}

interface IUserNotification {
  projectCode: string
  code: string
  typeCode: string
  sendType: string
  topics: [string!]
  conditions: string
  title: string
  content: string
  thumbnail: string
  objectId: ID
  url: string
  images: [string!]
  extra: string
  badges: Int
  sound: string
  expirtedDate: DateTime
  status: Int
  source: string
  userId: ID
  read: Boolean
  readDate: DateTime
  name: string
  phone: string
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IUserFcm {
  userId: ID
  name: string
  phone: string
  fcmToken: string
  token: string!
  deviceId: string
  platform: string
  projectCode: string
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IUserArticle {
  articleId: ID!
  userId: ID
  like: Int
  save: Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}

interface IFeedback {
  name: string
  phone: string
  email: string
  avatar: string
  address: string
  userId: ID
  title: string
  content: string
  images: [string!]
  projectCode: string
  status: Int
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}
interface IVUserReferralReport {
  referralCode: string
  total: Int
  name: string
  phone: string
  createDate: DateTime
  updateDate: DateTime
  createUser: string
  updateUser: string
  createUserId: ID
  updateUserId: ID
  id: ID
}
