import { lazy, Suspense } from "react"
import { Route, Router, Switch } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Loading } from "src/components/Loading/Loading"
import { PATH } from "src/constants/paths"
import AuthenticatedGuard from "src/guards/AuthenticatedGuard"
import Routes from "src/routes/routes"
import MainLayout from "../layouts/MainLayout"
import { NotFound } from "../pages/Error"
import { history } from "../utils/history"

const Login = lazy(() => import("src/pages/Login/login"))

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AuthenticatedGuard
          exact
          path={PATH.LOGIN}
          reverse={true}
          redirect={PATH.HOME}
          component={() => (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={PATH.ADMIN}
          component={() => (
            <MainLayout>
              <Routes />
            </MainLayout>
          )}
        />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
