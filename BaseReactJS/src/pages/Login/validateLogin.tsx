import * as yup from "yup"

export const ValidateFormLogin = yup.object().shape({
  username: yup.string().required("Nhập vào tên đăng nhập!"),
  password: yup.string().required("Nhập vào mật khẩu!")
})
