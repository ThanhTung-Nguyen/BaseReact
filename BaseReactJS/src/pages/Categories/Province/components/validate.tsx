import * as yup from "yup"

export const validateFormProvinces = yup.object().shape({
  name: yup.string().required("Nhập vào tên Tỉnh/Thành phố!"),
  code: yup.string().required("Nhập vào mã Tỉnh/Thành phố!")
})
