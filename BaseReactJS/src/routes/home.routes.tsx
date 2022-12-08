import { lazy, Suspense } from "react"
import { Switch, useRouteMatch } from "react-router-dom"
import { Loading } from "src/components/Loading/Loading"
import { PATH } from "src/constants/paths"
import AuthenticatedGuard from "src/guards/AuthenticatedGuard"
const Home = lazy(() => import("src/pages/Home/index"))

const HomeRoutes = props => {
  const { url } = useRouteMatch()
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={`${url}/home`}
        component={() => (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )}
      />
    </Switch>
  )
}
export default HomeRoutes
