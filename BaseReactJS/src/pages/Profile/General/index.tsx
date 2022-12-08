import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FacebookOutlined,
  GooglePlusOutlined,
  TwitterOutlined,
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons"
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Upload,
  UploadProps
} from "antd"
import TextArea from "antd/lib/input/TextArea"
import { UploadFile } from "antd/lib/upload/interface"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Response } from "src/constants/message"
import { useSaveUser } from "src/graphql/account/account.graphql"
import { useQueryLazyGetMe } from "src/graphql/auth.graphql"
import { IState } from "src/reducer/reducers/reducer"
import AuthHeader from "src/services/auth.header"
import { uploadImage } from "src/services/utils"
import store from "src/store/store"
import { isValidHttpUrl } from "src/utils/common"
import { ApiFileUpload, ApiGraphql } from "src/utils/config"
import * as yup from "yup"
import { FieldError } from "../styles"
import "./styles.css"

const headers = AuthHeader()

const General = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [loadingImage, setLoadingImage] = useState<boolean>(false)

  const { user, isSaveSuccess, showLoading } = useSelector((state: IState) => ({
    user: state.AuthReducer.user,
    isSaveSuccess: state.AuthReducer.isSaveSuccess,
    showLoading: state.LoadingReducer?.showLoading
  }))

  const [saveProfileUser, { data: saveData }] = useSaveUser()
  const [queryGetMe, { data: dataGetMe }] = useQueryLazyGetMe({
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    if (saveData?.saveUser?.status == Response.STATUS_SUCCESS) {
      queryGetMe()
      onReset()
    }
  }, [saveData])

  const formik = useFormik<IGeneralInfo>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      id: user?.id,
      userTypeCode: user?.userTypeCode,
      name: user?.name,
      address: user?.address,
      avatar: user?.avatar,
      email: user?.email,
      birthDate: user?.birthDate,
      phone:
        user?.phone && user.phone[0] !== "0" ? "0" + user.phone : user?.phone,
      userName: user?.userName,
      status: user?.status
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Nhập vào họ và tên!"),
      phone: yup
        .string()
        .required("Nhập vào số điện thoại!")
        .matches(/^(84|0[3|5|7|8|9])+([0-9]{8,9})\b$/, "SĐT không hợp lệ")
    }),
    onSubmit: values => {
      const phoneNumber = values?.phone ? String(values.phone) : ""
      const input = {
        ...values,
        id: user.id,
        phone: phoneNumber?.[0] === "0" ? phoneNumber.slice(1) : phoneNumber
      }
      saveProfileUser({
        variables: { input }
      })
    }
  })

  const uploadProps: UploadProps = {
    name: "file",
    fileList,
    maxCount: 1,
    showUploadList: { showRemoveIcon: false },
    onChange: async info => {
      let file: UploadFile
      let { fileList } = info
      setLoadingImage(true)
      try {
        const response = await uploadImage(info.file.originFileObj)
        if (response?.data?.status === Response.STATUS_SUCCESS) {
          setLoadingImage(false)
          formik.setFieldValue("avatar", response.data?.data)
          const url = new URL(response.data.data ?? "").href
          file = {
            ...info.file,
            status: "success",
            thumbUrl: url,
            url
          }
          fileList = [file]
        } else {
          setLoadingImage(false)
          throw Error(response.data.message)
        }

        setFileList(fileList)
      } catch (error: any) {
        setLoadingImage(false)
        fileList = [
          {
            ...info.file,
            status: "error",
            response: error.code || error.message,
            thumbUrl: "",
            url: ""
          }
        ]
      }
    }

    // onRemove: file => {
    //   formik.setFieldValue("avatar", user?.avatar ?? null)
    //   setFileList([])
    // }
  }

  const onReset = () => {
    setIsEditing(false)
    setFileList([])
    formik.resetForm()
  }

  // console.log(`formik.values`, formik.values)
  // console.log(`formik.errors`, formik.errors)

  const onSave = () => {
    formik.submitForm()
  }

  const onRemoveAvatar = () => {
    formik.setFieldValue("avatar", null)
    setFileList([])
  }

  return (
    <Row gutter={[24, 24]} className="card general-wrapper">
      <Col md={8} flex={1}>
        <Spin spinning={loadingImage}>
          <Card title="Ảnh đại diện" bordered={false} loading={showLoading}>
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <Avatar
                src={
                  isValidHttpUrl(formik.values.avatar)
                    ? formik.values.avatar
                    : ""
                }
                size={128}
                icon={<UserOutlined />}
              />
              {isEditing && (
                <Space align="start">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} disabled={!isEditing}>
                      Thay ảnh đại diện
                    </Button>
                  </Upload>
                  {formik.values.avatar && isEditing && (
                    <Button onClick={onRemoveAvatar}>
                      <DeleteTwoTone disabled={!isEditing} />
                    </Button>
                  )}
                </Space>
              )}
            </Space>
            <Row
              gutter={24}
              justify="center"
              style={{ paddingTop: "20px", textAlign: "center" }}
            >
              <Col>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700
                  }}
                >
                  {user?.name}
                </span>
                <p>{user?.email}</p>
              </Col>
            </Row>
            <Divider />
            <Row gutter={24} justify="center">
              <Col>
                <FacebookOutlined />
              </Col>
              <Col>
                <TwitterOutlined />
              </Col>
              <Col>
                <GooglePlusOutlined />
              </Col>
            </Row>
          </Card>
        </Spin>
      </Col>
      <Col md={16}>
        <Card
          title="Thông tin chung"
          bordered={false}
          loading={showLoading}
          actions={
            isEditing
              ? [
                  <div onClick={onSave}>
                    <Space>
                      <CheckCircleTwoTone
                        key="setting"
                        twoToneColor="#26c705"
                      />
                      Lưu
                    </Space>
                  </div>,
                  <div onClick={onReset}>
                    <Space>
                      <CloseCircleTwoTone key="edit" twoToneColor="#eb1212" />
                      Hủy
                    </Space>
                  </div>
                ]
              : [
                  <div onClick={() => setIsEditing(true)}>
                    <Space>
                      <EditTwoTone key="setting" twoToneColor="#055fc7" />
                      Sửa
                    </Space>
                  </div>
                ]
          }
        >
          <Form
            className="form-user"
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={formik.submitForm}
          >
            <Row gutter={24}>
              <Col md={12} flex={1}>
                <Form.Item label="Họ và tên" required>
                  <Input
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    readOnly={!isEditing}
                  />
                  <FieldError error={!!formik.errors.name}>
                    {formik.errors.name}
                  </FieldError>
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Item>
              </Col>
              <Col md={12} flex={1}>
                <Form.Item label="Số điện thoại" required>
                  <Input
                    name="phone"
                    type="string"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    readOnly={!isEditing}
                  />
                  <FieldError error={!!formik.errors.phone}>
                    {formik.errors.phone}
                  </FieldError>
                </Form.Item>
                <Form.Item label="Ngày sinh">
                  <DatePicker
                    name="birthDate"
                    format={"DD/MM/YYYY"}
                    value={moment(formik.values.birthDate ?? new Date())}
                    onChange={value => {
                      formik.setFieldValue("birthDate", value)
                    }}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
              <Col sm={24}>
                <Form.Item label="Địa chỉ" labelCol={{ sm: 4 }}>
                  <TextArea
                    name="address"
                    rows={5}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    readOnly={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default General
