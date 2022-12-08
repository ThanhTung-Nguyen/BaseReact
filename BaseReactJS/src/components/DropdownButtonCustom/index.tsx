import {
  DeleteTwoTone,
  DownOutlined,
  EditTwoTone,
  FileAddTwoTone,
  LogoutOutlined,
  PoweroffOutlined,
  ReloadOutlined
} from "@ant-design/icons"
import { Dropdown, Menu, Space } from "antd"
import { openConfirmModal } from "src/helpers/notification"

interface Props {
  typeButton: string[]
  data: any
  handleShowModal: (value) => void
  handleDelete: (value) => void
  handleOpenModalFacility: (value) => void
  handleOpenModalResetPassword: (value) => void
  handleLogoutAllUserSession: (value) => void
}

export const DropDownButton = (props: Props) => {
  const {
    typeButton,
    handleShowModal,
    handleDelete,
    handleOpenModalFacility,
    handleOpenModalResetPassword,
    handleLogoutAllUserSession,
    data
  } = props

  const button = typeButton.toString()

  const menu = (
    <Menu>
      {button.indexOf("resetPassword") != -1 && (
        <Menu.Item onClick={() => handleOpenModalResetPassword(data)}>
          <ReloadOutlined />
          Reset mật khẩu
        </Menu.Item>
      )}
      {button.indexOf("updateFacility") != -1 && (
        <Menu.Item onClick={() => handleOpenModalFacility(data)}>
          <FileAddTwoTone />
          Sửa quyền đơn vị
        </Menu.Item>
      )}
      {button.indexOf("update") != -1 && (
        <Menu.Item
          onClick={e => {
            handleShowModal(data)
          }}
        >
          <EditTwoTone />
          Sửa
        </Menu.Item>
      )}
      {button.indexOf("delete") != -1 && (
        <Menu.Item
          onClick={() =>
            openConfirmModal(() => {
              handleDelete(data?.id)
            })
          }
        >
          <DeleteTwoTone twoToneColor="#eb1212" />
          Xóa
        </Menu.Item>
      )}
      {button.indexOf("logoutAllUserSession") != -1 && (
        <Menu.Item
          onClick={() =>
            openConfirmModal(() => {
              handleLogoutAllUserSession(data?.id)
            })
          }
        >
          <LogoutOutlined />
          Đăng xuất tất cả
        </Menu.Item>
      )}
    </Menu>
  )
  return (
    <Space size="middle">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          Thao tác <DownOutlined />
        </a>
      </Dropdown>
    </Space>
  )
}
