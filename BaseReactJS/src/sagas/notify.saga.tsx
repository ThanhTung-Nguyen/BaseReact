import { call, put, takeLatest } from "@redux-saga/core/effects"
import { AxiosResponse } from "axios"
import { Response } from "src/constants/message"
import { NotifyConstant } from "src/constants/notify"
import { openNotificationWithIcon } from "src/helpers/notification"
import { fetchRefreshTokenRequest } from "src/reducer/actions/auth.action"
import {
  getNotify,
  deleteNotify,
  getNotifyType,
  sendNotify,
  sendNotifyAll
} from "src/services/notify.service"
import { ResponseMessage } from "./response.base"

function* fetchAllNotify(action: IAction<INotifyRequest>) {
  try {
    const response: AxiosResponse<IResponse<INotify[]>> = yield call(
      getNotify,
      action.payload
    )

    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put<IAction<INotifyReducer>>({
        type: NotifyConstant.GET_ALL_NOTIFY_SUCCESS,
        payload: {
          ...response.data
        }
      })
    } else {
      yield ResponseMessage(response.data)
      throw Error(response.data.message)
    }
  } catch (error) {
    yield openNotificationWithIcon("error", error.message, "")
    yield put<IAction<Partial<INotifyReducer>>>({
      type: NotifyConstant.GET_ALL_NOTIFY_FAILED,
      payload: {
        errorMessage: error.message
      }
    })
  }
}

function* fetchAllNotifyType(action: IAction) {
  try {
    const response: AxiosResponse<IResponse<INotifyType[]>> = yield call(
      getNotifyType
    )

    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put<IAction<Partial<INotifyReducer>>>({
        type: NotifyConstant.GET_ALL_NOTIFY_TYPE_SUCCESS,
        payload: {
          notifyTypes: response.data.data
        }
      })
    } else {
      yield ResponseMessage(response.data)
      throw Error(response.data.message)
    }
  } catch (error) {
    yield openNotificationWithIcon("error", error.message, "")
    yield put<IAction<Partial<INotifyReducer>>>({
      type: NotifyConstant.GET_ALL_NOTIFY_TYPE_FAILED,
      payload: {
        errorMessage: error.message
      }
    })
  }
}

function* fetchSendAllNotify(action: IAction<Partial<IAddNotifyRequest>>) {
  try {
    const response: AxiosResponse<IResponse<INotify>> = yield call(
      sendNotifyAll,
      action.payload
    )

    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put<IAction<Partial<INotifyReducer>>>({
        type: NotifyConstant.SEND_ALL_NOTIFY_SUCCESS,
        payload: {}
      })
      yield ResponseMessage(response.data)
    } else {
      yield ResponseMessage(response.data)
      throw Error(response.data.message)
    }
  } catch (error) {
    yield openNotificationWithIcon("error", error.message, "")
    yield put<IAction<Partial<INotifyReducer>>>({
      type: NotifyConstant.SEND_ALL_NOTIFY_FAILED,
      payload: {
        errorMessage: error.message
      }
    })
  }
}

function* fetchSendNotify(action: IAction<Partial<IAddNotifyRequest>>) {
  try {
    const response: AxiosResponse<IResponse<INotify>> = yield call(
      sendNotify,
      action.payload
    )

    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put<IAction<Partial<INotifyReducer>>>({
        type: NotifyConstant.SEND_NOTIFY_SUCCESS,
        payload: {}
      })
      yield ResponseMessage(response.data)
    } else {
      yield ResponseMessage(response.data)
      throw Error(response.data.message)
    }
  } catch (error) {
    yield openNotificationWithIcon("error", error.message, "")
    yield put<IAction<Partial<INotifyReducer>>>({
      type: NotifyConstant.SEND_NOTIFY_FAILED,
      payload: {
        errorMessage: error.message
      }
    })
  }
}

function* fetchDeleteNotify(action: IAction<{ id: string }>) {
  try {
    const response: AxiosResponse<IResponse<INotify>> = yield call(
      deleteNotify,
      action.payload?.id
    )

    if (response.data.status === Response.STATUS_SUCCESS) {
      yield put<IAction<Partial<INotifyReducer>>>({
        type: NotifyConstant.DELETE_NOTIFY_SUCCESS,
        payload: {}
      })
      yield ResponseMessage(response.data)
    } else {
      yield ResponseMessage(response.data)
      throw Error(response.data.message)
    }
  } catch (error) {
    yield openNotificationWithIcon("error", error.message, "")
    yield put<IAction<Partial<INotifyReducer>>>({
      type: NotifyConstant.DELETE_NOTIFY_FAILED,
      payload: {
        errorMessage: error.message
      }
    })
  }
}

export function* NotifySaga() {
  yield takeLatest(NotifyConstant.GET_ALL_NOTIFY_REQUEST, fetchAllNotify)
  yield takeLatest(
    NotifyConstant.GET_ALL_NOTIFY_TYPE_REQUEST,
    fetchAllNotifyType
  )
  yield takeLatest(NotifyConstant.SEND_ALL_NOTIFY_REQUEST, fetchSendAllNotify)
  yield takeLatest(NotifyConstant.SEND_NOTIFY_REQUEST, fetchSendNotify)
  yield takeLatest(NotifyConstant.DELETE_NOTIFY_REQUEST, fetchDeleteNotify)
}
