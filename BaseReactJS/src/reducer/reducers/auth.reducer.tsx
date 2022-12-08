import { userConstants } from "../../constants/user"

const initialState = {
  isAuthenticated: false,
  user: {},
  listFunc: [],
  dataLogin: {},
  isSaveSuccess: false,
  loading: false
} as any

export const AuthReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        dataLogin: {}
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        dataLogin: payload,
        loading: false
      }
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error
      }
    case userConstants.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        listFunc: [],
        loading: true
      }
    case userConstants.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        listFunc: payload?.functions,
        user: payload,
        loading: false
      }
    case userConstants.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }
    case userConstants.LOGOUT:
      return {
        ...state
      }

    case userConstants.REFRESH_TOKEN_REQUEST:
      return {
        ...state
      }
    case userConstants.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        payload
      }

    case userConstants.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        error
      }

    case userConstants.LOGOUT_ALL_SESSION_REQUEST:
      return {
        ...state
      }
    case userConstants.LOGOUT_ALL_SESSION_SUCCESS:
      return {
        ...state,
        payload
      }

    case userConstants.LOGOUT_ALL_SESSION_FAILURE:
      return {
        ...state,
        error
      }

    case userConstants.LOGOUT_ALL_USER_SESSION_REQUEST:
      return {
        ...state
      }
    case userConstants.LOGOUT_ALL_USER_SESSION_SUCCESS:
      return {
        ...state,
        payload
      }

    case userConstants.LOGOUT_ALL_USER_SESSION_FAILURE:
      return {
        ...state,
        error
      }

    default:
      return state
  }
}
