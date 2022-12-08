import React, { useCallback, useState } from "react"
import { Avatar, Drawer, Layout, Menu, MenuProps, Row, Switch } from "antd"
import { useLocation, NavLink, Link } from "react-router-dom"
import "./styles.css"
import { useAppSelector } from "src/store/store"
import { SiderTheme } from "antd/lib/layout/Sider"
import { menuFlat } from "src/constants/menu"
import { PATH } from "src/constants/paths"
import LogoAdmin from "../../assets/images/logo-trang-01.png"
import { UserOutlined } from "@ant-design/icons"
const { SubMenu, Item } = Menu

interface Props {
  menu: IMenu[]
  collapsed?: boolean
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: any
  setIsBroken: React.Dispatch<React.SetStateAction<boolean>>
  isBroken: boolean
}

export const SideBar = ({
  menu,
  userInfo,
  collapsed,
  setCollapsed,
  isBroken,
  setIsBroken
}: Props) => {
  const [theme, setTheme] = useState<SiderTheme>("dark")
  const [openKeys, setOpenKeys] = React.useState([""])
  // const [isBroken, setIsBroken] = useState(false)
  const location = useLocation()

  const { listFuncs } = useAppSelector((state: any) => ({
    listFuncs: state.AuthReducer?.listFunc as IUserFunction[]
  }))

  const changeTheme = value => {
    setTheme(value ? "dark" : "light")
  }

  const defaultSelectedKeys = useCallback(
    () => menuFlat.find(val => val.path === location.pathname),
    []
  )

  const generateMenuItem = useCallback(
    (menu: IMenu[]) =>
      menu.map(item => {
        // const role = listFuncs?.find(val => val?.code?.includes(item.id))

        // if (item.hide || !role) {
        //   return null
        // }

        return item.children ? (
          <SubMenu key={item.id} title={item.title} icon={item.icon}>
            {generateMenuItem(item.children)}
          </SubMenu>
        ) : (
          <Menu.Item
            key={item.id}
            icon={item.icon}
            onClick={() => {
              if (isBroken) {
                setCollapsed?.(true)
              }
            }}
          >
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        )
      }),
    [listFuncs, isBroken]
  )
  const onOpenChange = keys => {
    const latestOpenKey = keys?.find(
      (key: any) => openKeys?.indexOf(key) === -1
    )

    const menuItem = menu?.find(
      (item: any) => item?.id?.indexOf(latestOpenKey!) === -1
    )

    if (!menu?.includes(menuItem!)) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <>
      <Layout.Sider
        width={isBroken ? 0 : 256}
        collapsible={!isBroken}
        collapsed={!isBroken && collapsed}
        trigger={null}
        theme={theme}
        breakpoint="md"
        hidden={collapsed}
        onBreakpoint={broken => {
          setIsBroken(broken)
          if (broken) {
            setCollapsed?.(true)
          }
        }}
        style={{ overflow: "auto" }}
      >
        <Layout.Header style={{ textAlign: "center", background: " #2073d3" }}>
          <Row>
            <Link
              to={PATH.HOME}
              style={{ color: theme === "dark" ? "white" : "#001529" }}
            >
              <img
                src={LogoAdmin}
                width="150px"
                style={{ paddingBottom: "30px", paddingLeft: "10px" }}
              />
            </Link>
          </Row>
        </Layout.Header>

        <div className="user-info-avt">
          <Avatar
            style={{ marginLeft: 8 }}
            icon={<UserOutlined />}
            src={userInfo ? userInfo?.avatar : ""}
            size={64}
          />
        </div>
        <div className="user-info">
          <span style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
            {userInfo ? userInfo?.name : ""}
          </span>
          <p style={{ fontSize: "14px", color: "#7f7f7f" }}>
            {userInfo ? userInfo?.email : ""}
          </p>
        </div>
        <hr />
        <div>
          <Menu
            theme={theme}
            defaultSelectedKeys={[defaultSelectedKeys()?.id ?? "home"]}
            mode="inline"
            onOpenChange={onOpenChange}
            openKeys={openKeys}
          >
            {generateMenuItem(menu)}
          </Menu>
        </div>
        {/* <div
          // className="switchSide"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 20px 0"
          }}
        >
          {!collapsed && (
            <Switch
              onChange={changeTheme}
              checked={theme === "dark"}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          )}
        </div> */}
      </Layout.Sider>
      <Drawer
        title={
          <div>
            <Link
              to={PATH.HOME}
              style={{ color: theme === "dark" ? "white" : "#001529" }}
            >
              <img
                src={LogoAdmin}
                width="150px"
                style={{ paddingBottom: "30px", paddingLeft: "10px" }}
              />
            </Link>
          </div>
        }
        placement="left"
        // className="menu-drawer"
        onClose={() => setCollapsed?.(true)}
        visible={isBroken && !collapsed}
        bodyStyle={{
          padding: 0,
          background: "#001529"
        }}
        headerStyle={{
          background: "#2073d3",
          height: 64,
          textAlign: "center",
          padding: 0
        }}
      >
        <div className="user-info-avt">
          <Avatar
            style={{ marginLeft: 8 }}
            icon={<UserOutlined />}
            src={userInfo ? userInfo?.avatar : ""}
            size={64}
          />
        </div>
        <div className="user-info">
          <span style={{ fontSize: "18px", color: "#fff", fontWeight: 700 }}>
            {userInfo ? userInfo?.name : ""}
          </span>
          <p style={{ fontSize: "14px", color: "#7f7f7f" }}>
            {userInfo ? userInfo?.email : ""}
          </p>
        </div>
        <hr />
        <div>
          <Menu
            theme={theme}
            defaultSelectedKeys={[defaultSelectedKeys()?.id ?? "home"]}
            mode="inline"
            onOpenChange={onOpenChange}
            openKeys={openKeys}
          >
            {generateMenuItem(menu)}
          </Menu>
        </div>
      </Drawer>
    </>
  )
}
