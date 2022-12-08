import { type } from "os"
import { combineReducers } from "redux"
import { AuthReducer } from "./auth.reducer"
import LoadingReducer from "./loading.reducer"
import { ModalReducer } from "./modal.reducer"

import { NotifyReducer } from "./notify.reducer"

const rootReducer = combineReducers({
  AuthReducer,
  LoadingReducer,
  ModalReducer,

  // Quản lý thông báo
  NotifyReducer
})

export type IState = ReturnType<typeof rootReducer>

export default rootReducer
