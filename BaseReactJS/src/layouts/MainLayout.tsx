import { BackTop, Breadcrumb, Layout, Menu, Spin } from "antd"
import React, { Fragment, ReactNode, useEffect, useState } from "react"
import { useClearCache } from "react-clear-cache"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { FooterPage } from "src/components/footer"
import { HeaderPage } from "src/components/header"
import { SideBar } from "src/components/sidebar"
import { Response } from "src/constants/message"
import { useQueryLazyGetMe } from "src/graphql/auth.graphql"
import { fetchGetMeSuccess } from "src/reducer/actions/auth.action"
import store from "src/store/store"
import menu, { menuFlat } from "../constants/menu"
import "./styles.css"
interface Props {
  children: ReactNode
}

const { Content, Footer } = Layout
const { SubMenu } = Menu

const MainLayout = (props: Props) => {
  const { children } = props
  const [collapsed, setCollapsed] = useState(false)
  // const { isLatestVersion, emptyCacheStorage } = useClearCache()
  const [userInfo, setUserInfo] = useState<any>()
  const [userLogin, setUserLogin] = useState<any>()
  // const { showLoading } = useSelector((state: any) => ({
  //   showLoading: state.AuthReducer?.loading
  // }))
  const [isBroken, setIsBroken] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  let user

  useEffect(() => {
    const dataLogin = localStorage.getItem("login")
    if (dataLogin && typeof dataLogin !== "undefined") {
      user = JSON?.parse(dataLogin)
    }

    setUserLogin(user)
  }, [])

  const [queryLazyGetMe, { data: dataGetMe, loading: loadingGetMe }] =
    useQueryLazyGetMe({ fetchPolicy: "network-only" })

  useEffect(() => {
    if (userLogin) {
      // setUserInfo(null)
      // queryLazyGetMe()
    }
  }, [userLogin])

  useEffect(() => {
    if (dataGetMe?.getMe?.status === Response.STATUS_SUCCESS) {
      setUserInfo(dataGetMe?.getMe?.data)
      // store.dispatch(fetchGetMeSuccess(dataGetMe?.getMe?.data))
    }
  }, [dataGetMe])

  // useEffect(() => {
  //   if (!isLatestVersion) {
  //     emptyCacheStorage()
  //   }
  // }, [isLatestVersion])

  const pathSnippets = location.pathname.split("/").filter(i => i)
  const extraItems = pathSnippets.map((item, index) => {
    let url = `/${pathSnippets.slice(0, index + 1).join("/")}`
    const title = menuFlat.find(val => url === val.path)?.title

    return (
      <Breadcrumb.Item key={url}>
        <span>{title}</span>
      </Breadcrumb.Item>
    )
  })

  return (
    <Fragment>
      <Spin spinning={loadingGetMe}>
        <Layout>
          <SideBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            menu={menu}
            userInfo={userInfo}
            setIsBroken={setIsBroken}
            isBroken={isBroken}
          />
          <Layout>
            <div className="container">
              <HeaderPage
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                userInfo={userInfo}
                token={userLogin?.token}
                extraItems={extraItems}
                setIsBroken={setIsBroken}
                isBroken={isBroken}
              />
              {/* <Breadcrumb style={{ padding: "8px 12px" }}>
                <HomeOutlined />
                {extraItems}
              </Breadcrumb> */}
              <Content className="content">
                {children}
                <BackTop>
                  <div
                    style={{
                      height: 40,
                      width: 40,
                      lineHeight: "40px",
                      borderRadius: 4,
                      backgroundColor: "#1088e9",
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 14
                    }}
                  >
                    UP
                  </div>
                </BackTop>
              </Content>

              <FooterPage />
            </div>
          </Layout>
        </Layout>
      </Spin>
    </Fragment>
  )
}
export default MainLayout
