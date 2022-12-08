import { CheckCircleTwoTone, SyncOutlined } from "@ant-design/icons"
import { Card, Col, Form, Input, Row, Space } from "antd"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useChangeUserPassword } from "src/graphql/account.graphql"
import {
  fetchLogoutAllSessionRequest,
  logoutUser
} from "src/reducer/actions/auth.action"
import { IState } from "src/reducer/reducers/reducer"
import * as yup from "yup"
import { FieldError, WrapperGeneral } from "../styles"

const ChangePassword = () => {
  const dispatch = useDispatch()

  const { showLoading, user } = useSelector((state: IState) => ({
    showLoading: state.LoadingReducer.showLoading,
    user: state.AuthReducer.user
  }))

  const [changeUserPassword, { data: changeData }] = useChangeUserPassword({})

  const formik = useFormik<IChangePassword>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      id: user?.id
    },
    validationSchema: yup.object().shape({
      oldPassword: yup.string().required("Nhập mật khẩu cũ!"),
      newPassword: yup
        .string()
        .required("Nhập mật khẩu mới!")
        .notOneOf([yup.ref("oldPassword")], "Trùng mật khẩu cũ!")
        .matches(
          /^(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\\.\,\?*()\_\-\=\+\:\;\"\'\/\<\>\[\]\{\}])(?=.{6,})/,
          "Mật khẩu mới tối thiểu 6 ký tự, không chứa dấu cách, trong đó ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 ký tự số! "
        ),
      confirmPassword: yup
        .string()
        .required("Nhập lại mật khẩu mới!")
        .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp!")
    }),
    onSubmit: async values => {
      const { confirmPassword, ...params } = values

      await changeUserPassword({
        variables: {
          oldPassword: params?.oldPassword,
          newPassword: params?.newPassword
        }
      })
      await onReset()
      await dispatch(fetchLogoutAllSessionRequest())
      await dispatch(logoutUser())
    }
  })

  const onSubmit = () => {
    formik.submitForm()
  }

  const onReset = () => {
    formik.resetForm()
  }

  return (
    <WrapperGeneral>
      <Row gutter={24} className="card" justify="center">
        <Col md={12}>
          <Card
            title="Thay đổi mật khẩu"
            bordered={false}
            loading={showLoading}
            actions={[
              <div onClick={onSubmit}>
                <Space>
                  <CheckCircleTwoTone key="setting" twoToneColor="#26c705" />
                  Lưu
                </Space>
              </div>,
              <div onClick={onReset}>
                <Space>
                  <SyncOutlined key="edit" color="#eb1212" />
                  Reset
                </Space>
              </div>
            ]}
          >
            <Form
              className="form-user"
              layout="horizontal"
              labelAlign="left"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={formik.submitForm}
            >
              <Form.Item label="Mật khẩu">
                <Input
                  name="oldPassword"
                  type="password"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                />
                <FieldError error={!!formik.errors.oldPassword}>
                  {formik.errors.oldPassword}
                </FieldError>
              </Form.Item>
              <Form.Item label="Mật khẩu mới">
                <Input
                  name="newPassword"
                  type="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                <FieldError error={!!formik.errors.newPassword}>
                  {formik.errors.newPassword}
                </FieldError>
              </Form.Item>
              <Form.Item label="Nhập lại mật khẩu">
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <FieldError error={!!formik.errors.confirmPassword}>
                  {formik.errors.confirmPassword}
                </FieldError>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </WrapperGeneral>
  )
}

export default ChangePassword
