/* eslint-disable react-hooks/exhaustive-deps */
import {
  HomeOutlined,
  LockOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Layout, Menu, Image, Row, Breadcrumb, Col } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import SubMenu from "antd/lib/menu/SubMenu"
import { Fragment, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../reducer/actions/auth.action"
import { WrapperHeader } from "./styles"
import classnames from "classnames"
import { Link, useRouteMatch } from "react-router-dom"
import { IState } from "src/reducer/reducers/reducer"
import ImageLogo from "../../assets/images/Logo MedOn-01.svg"

export const HeaderPage = (props: any) => {
  const { token, setCollapsed, collapsed, extraItems, isBroken, userInfo } =
    props
  const dispatch = useDispatch()
  const { url } = useRouteMatch()

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = useCallback(() => {
    dispatch(logoutUser())
  }, [])

  const rightMenu = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        title={
          <Fragment>
            {isBroken ? (
              <MenuOutlined />
            ) : (
              <div>
                <span>{userInfo ? userInfo.name : ""}</span>
                <Avatar
                  style={{ marginLeft: 8 }}
                  icon={<UserOutlined />}
                  src={userInfo ? userInfo?.avatar : ""}
                />
              </div>
            )}
          </Fragment>
        }
      >
        {isBroken && (
          <>
            <Menu.Item key="userInfo">
              <span>{userInfo ? userInfo.name : ""}</span>
              <Avatar
                style={{ marginLeft: 8 }}
                icon={<UserOutlined />}
                src={userInfo ? userInfo?.avatar : ""}
              />
            </Menu.Item>
            <hr />
          </>
        )}

        <Menu.Item key="ChangePass" icon={<UserOutlined />}>
          <Link to={`${url}/profile/general`}>Tài khoản</Link>
        </Menu.Item>
        <Menu.Item key="Account" icon={<LockOutlined />}>
          <Link to={`${url}/profile/change-password`}>Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item
          key="SignOut"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        >
          <span>Đăng xuất</span>
        </Menu.Item>
      </SubMenu>
    </Menu>
  ]

  return (
    <Layout.Header>
      <WrapperHeader className={classnames({ collapsed: props.collapsed })}>
        <Row
          gutter={24}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Col sm={12}>
            <div className="header-left">
              <div onClick={toggle} className="trigger iconButton">
                {props.collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )}
              </div>
              {/* <div className="breadcrumb">
                <Breadcrumb style={{ padding: "8px 12px" }}>
                  <HomeOutlined />
                  {extraItems}
                </Breadcrumb>
              </div> */}
            </div>
          </Col>
          <Col sm={12}>
            <div className="right-menu">{rightMenu}</div>
          </Col>
        </Row>
      </WrapperHeader>
    </Layout.Header>
  )
}
