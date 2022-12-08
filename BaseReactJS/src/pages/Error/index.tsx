import { Button, Result } from "antd"
import { Link } from "react-router-dom"
import { PATH } from "src/constants/paths"
import { useAppSelector } from "src/store/store"
import { WrapperNotFound } from "./style"

export const NotFound = () => {
  const { isAuthenticated } = useAppSelector(state => state.AuthReducer)

  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy trang này."
      extra={
        <Link to={isAuthenticated ? PATH.HOME : "/login"} type="primary">
          Về trang chủ
        </Link>
      }
    />
  )
}

export const NotAuthorized = () => {
  const { isAuthenticated } = useAppSelector(state => state.AuthReducer)

  return (
    <Result
      status="403"
      title="403"
      subTitle="Không có quyền truy cập trang này."
      extra={
        <Link to={isAuthenticated ? PATH.HOME : "/login"}>
          <Button type="primary">Về trang chủ</Button>
        </Link>
      }
    />
  )
}
