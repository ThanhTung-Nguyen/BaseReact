import * as yup from "yup"

export const validateFormDistricts = yup.object().shape({
  provinceId: yup.string().nullable().required("Chọn Tỉnh/Thành phố!"),
  name: yup.string().required("Nhập vào tên Tỉnh/Thành phố!"),
  code: yup.string().required("Nhập vào mã Tỉnh/Thành phố!")
})
