import moment from "moment"
import * as yup from "yup"

export const validateFormProject = yup.object().shape({
  name: yup.string().nullable().required("Nhập vào tên dự án!"),
  code: yup.string().nullable().required("Nhập vào mã dự án!"),
  status: yup.number().nullable().required("Chọn trạng thái!")
})
