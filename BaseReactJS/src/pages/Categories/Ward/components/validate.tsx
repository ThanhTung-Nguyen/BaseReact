import * as yup from "yup"

export const validateFormWards = yup.object().shape({
  provinceId: yup.string().nullable().required("Chọn Tỉnh/Thành phố!"),
  districtId: yup.string().nullable().required("Chọn Quận/Huyện!"),
  name: yup.string().nullable().required("Nhập vào tên Xã/Phường!"),
  code: yup.string().nullable().required("Nhập vào mã Xã/Phường!"),
  status: yup.number().nullable().required("Chọn trạng thái!")
})
