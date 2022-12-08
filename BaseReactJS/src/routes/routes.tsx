import { useCallback } from "react"
import { Route, Switch } from "react-router"
import { Loading } from "src/components/Loading/Loading"
import { PATH } from "src/constants/paths"
import AuthenticatedGuard from "src/guards/AuthenticatedGuard"
import { menuFlat } from "src/constants/menu"
import { NotAuthorized, NotFound } from "src/pages/Error"
import { useAppSelector } from "src/store/store"

const whitelist = ["home", "general", "change-password"]

export default function Routes() {
  const { listFuncs } = useAppSelector(state => ({
    listFuncs: state.AuthReducer?.listFunc as IUserFunction[]
  }))

  const generateRoutes = useCallback(
    (menu: IMenu[]) =>
      menu.map(item => {
        // const role = listFuncs?.find(val => val?.code?.includes(item.id))

        return (
          <AuthenticatedGuard
            key={item.id}
            exact
            redirect={PATH.HOME}
            path={item.path}
            component={
              // listFuncs != null && listFuncs.length > 0
              //   ? role || whitelist?.includes(item.id)
              //     ?
              item.component ?? (() => <NotFound />)
              //   : () => <NotAuthorized />
              // : () => <Loading />
            }
          />
        )
      }),
    []
  )

  return (
    <Switch>
      {generateRoutes(menuFlat)}
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
