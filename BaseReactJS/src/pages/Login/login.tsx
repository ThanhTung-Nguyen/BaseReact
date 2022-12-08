import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Layout, Spin } from "antd"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/store/store"
import Logo from "../../assets/images/logo.png"
import { LoginRequest } from "../../reducer/actions/auth.action"
import "./login.css"
import { ValidateFormLogin } from "./validateLogin"

const { Content } = Layout

const LoginPage = () => {
  const dispatch = useDispatch()
  const auth = useAppSelector((state: any) => state.AuthReducer)

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: ValidateFormLogin,
    initialValues: {
      username: "",
      password: ""
      // loginType: 3
    },

    onSubmit: value => {
      dispatch(LoginRequest(value))
    }
  })
  useEffect(() => {
    if (auth.isAuthenticated) {
      formik.resetForm()
    }
  }, [auth.isAuthenticated])

  return (
    <div className="login-container">
      <div className="background-login" />
      <div className="login">
        <div className="logo">
          <img src={Logo} />
        </div>
        <p>ĐĂNG NHẬP</p>
        <Spin spinning={auth.loading}>
          <Form onFinish={formik.handleSubmit}>
            <Form.Item labelAlign="right" labelCol={{ span: 6 }}>
              <Input
                placeholder="Tên đăng nhập"
                name="username"
                prefix={<UserOutlined />}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.username}
                </div>
              )}
            </Form.Item>
            <Form.Item labelAlign="right" labelCol={{ span: 6 }}>
              <Input.Password
                placeholder="Mật khẩu"
                name="password"
                prefix={<LockOutlined className="iconLogin" />}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <div style={{ color: "red", fontStyle: "italic" }}>
                  {formik.errors.password}
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="btnLogin"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  )
}
export default LoginPage
