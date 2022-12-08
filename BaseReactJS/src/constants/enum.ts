export const FacilityType = {
  HOSPITAL: { value: "HOSPITAL", title: "Bệnh viện" },
  HOME_CENTER: { value: "STAFF", title: "Trung tâm tại nhà" },
  OFFICE: { value: "OFFICE", title: "Văn phòng" }
}

export enum StatusEnum {
  INACTIVE = 0,
  ACTIVE,
  CREATED,
  PENDING,
  APPROVED,
  DELETED
}

export const Status = {
  DELETE: { value: 0, title: "Đã xóa" },
  ACTIVE: { value: 1, title: "Đã duyệt" },
  IN_ACTIVE: { value: 2, title: "Không duyệt" },
  PENDING: { value: 3, title: "Chờ duyệt" },
  CREATED: { value: 4, title: "Mới tạo" },
  LOCKED: { value: 5, title: "Đã khóa" },
  UN_LOCKED: { value: 6, title: "Bỏ khóa" }
}

export const Action = {
  ACCEPT: { value: "ACCEPT", title: "Truy cập" },
  CREATE: { value: "CREATE", title: "Thêm mới" },
  UPDATE: { value: "UPDATE", title: "Cập nhật" },
  DELETE: { value: "DELETE", title: "Xóa" },
  APPROVE: { value: "APPROVE", title: "Duyệt" },
  UNAPPROVE: { value: "UNAPPROVE", title: "Hủy duyệt" }
}
export enum UserTypeEnum {
  ROOT, //Tài khoản quản trị full quyền của dev, chỉ cấp cho dev
  ADMIN, // Loại tài khoản quản trị hệ thống
  USER, //Loại tài khoản người dùng bình thường
  DOCTOR, //Loại tài khoản bác sĩ
  CTV, //Loại tài khoản cộng tác viên
  AGENT, //Đại lý
  PARTNER // Đối tác
}

export enum GenderEnum {
  //[Description("Nam")]
  MALE,

  //[Description("Nữ")]
  FEMALE,
  // [Description("Khác")]
  OTHER
}

export enum ProjectEnum {
  APP_USER,
  CMS_ADMIN
}
export enum PermissionTypeEnum {
  GROUP,
  USER
}

export enum FormAction {
  CREATE,
  EDIT,
  DETAIL
}

export enum DisplayType {
  POPUP,
  BANNER
}
export enum TypeCodeSendNotification {
  SYSTEM = "SYSTEM",
  USER = "USER"
}

export enum ApiLogServiceNameEnum {
  MEDCOM_PROCESS = "MEDCOM_PROCESS",
  AUTHEN = "AUTHEN",
  UTILITY = "UTILITY",
  MASTER_DATA = "MASTER_DATA",
  MEDCOM_DATA = "MEDCOM_DATA",
  SMS_GATEWAY = "SMS_GATEWAY",
  CCOMED = "CCOMED"
}

export const TitleTooltip = "Click đúp chuột để xem chi tiết"
