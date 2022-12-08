import { NotifyConstant } from "src/constants/notify"

const initialState: Partial<INotifyReducer> = {}

export const NotifyReducer = (
  state = initialState,
  action: IAction<Partial<INotifyReducer>>
): Partial<INotifyReducer> => {
  switch (action.type) {
    case NotifyConstant.GET_ALL_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case NotifyConstant.GET_ALL_NOTIFY_SUCCESS:
    case NotifyConstant.GET_ALL_NOTIFY_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case NotifyConstant.GET_ALL_NOTIFY_TYPE_REQUEST:
      return state
    case NotifyConstant.GET_ALL_NOTIFY_TYPE_SUCCESS:
    case NotifyConstant.GET_ALL_NOTIFY_TYPE_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case NotifyConstant.SEND_ALL_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case NotifyConstant.SEND_ALL_NOTIFY_SUCCESS:
    case NotifyConstant.SEND_ALL_NOTIFY_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case NotifyConstant.SEND_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case NotifyConstant.SEND_NOTIFY_SUCCESS:
    case NotifyConstant.SEND_NOTIFY_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case NotifyConstant.DELETE_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case NotifyConstant.DELETE_NOTIFY_SUCCESS:
    case NotifyConstant.DELETE_NOTIFY_FAILED:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    default:
      return state
  }
}
