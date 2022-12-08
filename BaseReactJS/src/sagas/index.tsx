import { AxiosResponse } from "axios"
import {
  all,
  call,
  put,
  spawn,
  takeEvery,
  takeLatest,
  takeLeading
} from "redux-saga/effects"
import { Response } from "src/constants/message"
import {
  expiredMessage,
  openNotificationWithIcon
} from "src/helpers/notification"
import { hideLoading, showLoading } from "src/reducer/actions/loading.action"
import { HideModal } from "src/reducer/actions/modal.action"
import { cancelRequests } from "src/services/utils"
import { history } from "src/utils/history"
import { userConstants } from "../constants/user"
import {
  fetchLogoutAllSessionFailure,
  fetchLogoutAllSessionSuccess,
  fetchLogoutAllUserSessionFailure,
  fetchLogoutAllUserSessionSuccess,
  // fetchImportUsersFailure,
  // fetchImportUsersSuccess,
  fetchRefreshTokenFailure,
  fetchRefreshTokenSuccess,
  LoginFailure,
  LoginSuccess,
  logoutUser
} from "../reducer/actions/auth.action"
import {
  // fetchGetMe,
  fetchLogin,
  fetchRefreshToken,
  logout,
  logoutAllSession,
  logoutAllUserSession
} from "../services/auth.service"
import { NotifySaga } from "./notify.saga"

function* auth(payload) {
  const { request } = payload

  try {
    // const response = yield call(fetchLogin, request)
    // if (response?.data?.status === Response.STATUS_SUCCESS) {
    //   yield put(LoginSuccess(response?.data?.data))
    //   const dataLogin = JSON.stringify(response?.data?.data)
    //   // Cookies.set("LOGIN_INFO", dataLogin)
    window.localStorage.setItem("login", JSON.stringify(request))
    yield history.push("/admin/home")
    // } else {
    //   yield put(LoginFailure(response))
    //   yield openNotificationWithIcon("error", response?.data?.message, "")
    //   history.push("/login")
    // }
  } catch (error: any) {
    yield put(LoginFailure(error))
    yield openNotificationWithIcon("error", error?.message, "")
  }
}

// function* getMe(payload) {
//   const { request } = payload
//   try {
//     const response = yield call(fetchGetMe)
//     if (response?.data?.status === Response.STATUS_SUCCESS) {
//       yield put(fetchGetMeSuccess(response?.data?.data))
//     } else {
//       yield openNotificationWithIcon("error", response?.data?.message, "")
//       yield put(fetchGetMeFailure(response))
//     }
//   } catch (error: any) {
//     yield openNotificationWithIcon("error", error?.message, "")
//   }
// }

function* fetchLogoutUser(payload) {
  try {
    // const resp = yield call(logout)
    // if (resp?.data?.status !== Response.STATUS_SUCCESS) {
    //   throw Error(resp?.data?.message)
    // }
  } catch (error: any) {
    yield openNotificationWithIcon("error", error?.message, "")
  } finally {
    // Cookies.remove("LOGIN_INFO")
    window.localStorage.removeItem("login")
    history.push("/login")
  }
}

// function* fetchImportUsers(payload) {
//   const { request } = payload
//   try {
//     const response = yield call(importUsers, request)
//     if (response?.data?.status === Response.STATUS_SUCCESS) {
//       yield put(fetchImportUsersSuccess(response?.data?.data))
//       yield openNotificationWithIcon("success", response?.data?.message, "")
//     } else {
//       yield put(fetchImportUsersFailure(response))
//       yield openNotificationWithIcon("error", response?.data?.message, "")
//     }
//   } catch (error: any) {
//     yield openNotificationWithIcon("error", error?.message, "")
//   }
// }

// function* changeInfo(action: IAction<IGeneralInfo>) {
//   yield put(showLoading())
//   try {
//     const response = yield call(fetchChangeInfo, action.payload)
//     if (response.data.data.changeInfo.status === Response.STATUS_SUCCESS) {
//       yield put(changeInfoSuccess(response.data.data.changeInfo.data))
//       yield openNotificationWithIcon(
//         "success",
//         response.data.data.changeInfo.message,
//         ""
//       )
//     } else {
//       throw Error(response.data.data.changeInfo.message)
//     }
//   } catch (error: any) {
//     yield openNotificationWithIcon("error", error?.message, "")
//     yield put(changeInfoFailure(error.message))
//   }
//   yield put(hideLoading())
// }

function* fetchLogoutAllSession(payload) {
  yield put(showLoading())

  try {
    const response: AxiosResponse<IResponse> = yield call(logoutAllSession)
    if (response?.data?.status === Response.STATUS_SUCCESS) {
      yield put(fetchLogoutAllSessionSuccess(response?.data))
      yield openNotificationWithIcon("success", response.data?.message, "")
    } else {
      throw Error(response.data?.message)
    }
  } catch (error: any) {
    yield openNotificationWithIcon("error", error?.message, "")
    yield put(fetchLogoutAllSessionFailure(error.message))
  }
  yield put(hideLoading())
}

function* fetchLogoutAllUserSession(payload) {
  const { request } = payload
  yield put(showLoading())

  try {
    const response: AxiosResponse<IResponse> = yield call(
      logoutAllUserSession,
      request
    )
    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put(fetchLogoutAllUserSessionSuccess(response.data))
      yield openNotificationWithIcon("success", response.data.message, "")
    } else {
      throw Error(response.data.message)
    }
  } catch (error: any) {
    yield openNotificationWithIcon("error", error?.message, "", 1)
    yield put(fetchLogoutAllUserSessionFailure(error.message))
  }
  yield put(hideLoading())
}

function* refreshToken(payload) {
  const expiredMessageLang =
    expiredMessage.message[navigator.language] ??
    expiredMessage.message.en ??
    expiredMessage.message.vi
  yield call(cancelRequests, expiredMessageLang)
  yield put(HideModal())
  yield put(logoutUser())
  let user
  const dataUser = localStorage.getItem("user")
  try {
    const resp = yield call(fetchRefreshToken)
    if (resp?.data?.code === "REFRESH_TOKEN_EXPIRED") {
      yield put(logoutUser())
      yield put(fetchRefreshTokenFailure(resp?.data?.message))
    } else {
      if (dataUser) {
        user = JSON.parse(dataUser)
      }
      const userUpdate = {
        ...user,
        token: resp?.data?.data?.token,
        refreshToken: resp?.data?.data?.token
      }
      yield localStorage.setItem("user", JSON.stringify(userUpdate))
      yield put(fetchRefreshTokenSuccess(resp?.data?.data))
    }
  } catch (error: any) {
    yield openNotificationWithIcon("error", error?.message, "")
  }
}

function* rootSaga() {
  yield takeEvery(userConstants.LOGIN_REQUEST, auth)
  // yield takeLatest(userConstants.GET_CURRENT_USER_REQUEST, getMe)
  yield takeLatest(userConstants.LOGOUT, fetchLogoutUser)
  // yield takeLatest(userConstants.CHANGE_INFO_REQUEST, changeInfo)
  // yield takeLatest(userConstants.CHANGE_PASSWORD_REQUEST, changePassword)
  yield takeLeading(userConstants.REFRESH_TOKEN_REQUEST, refreshToken)

  yield takeLeading(
    userConstants.LOGOUT_ALL_SESSION_REQUEST,
    fetchLogoutAllSession
  )
  yield takeLeading(
    userConstants.LOGOUT_ALL_USER_SESSION_REQUEST,
    fetchLogoutAllUserSession
  )

  yield all([yield spawn(NotifySaga)])
}

export default rootSaga
