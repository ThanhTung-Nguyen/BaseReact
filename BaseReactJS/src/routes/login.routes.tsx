import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { Loading } from "src/components/Loading/Loading"
import { PATH } from "src/constants/paths"
import AuthenticatedGuard from "src/guards/AuthenticatedGuard"
const Login = lazy(() => import("src/pages/Login/login"))

const LoginRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={PATH.LOGIN}
        component={() => (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        )}
      />
    </Switch>
  )
}
export default LoginRoutes
