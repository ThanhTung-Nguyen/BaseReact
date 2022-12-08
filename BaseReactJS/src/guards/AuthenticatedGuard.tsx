import React from "react"
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from "react-router-dom"

// interface ReduxProps {
//   isAuthenticated: boolean
// }

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps>
  redirect?: string
  reverse?: boolean
}
function AuthenticatedGuard(props: Props) {
  const { component: Component, reverse, redirect, ...rest } = props
  let token
  // const { dataLogin } = useSelector((state: IState) => ({
  //   dataLogin: state?.AuthReducer?.dataLogin
  // }))
  const dataLogin = localStorage.getItem("login")
  // const data = localStorage.getItem("user")
  if (dataLogin && typeof dataLogin !== "undefined") {
    const user = JSON?.parse(dataLogin)
    token = user.username ?? ""
  }

  const auth = reverse ? !token : !!token

  return (
    <Route
      {...rest}
      render={props => {
        if (auth) {
          return <Component {...props} />
        } else {
          return <Redirect to={redirect ?? "/login"} />
        }
      }}
    />
  )
}

export default AuthenticatedGuard
