import { userConstants } from "../../constants/user"

export const LoginRequest = request => {
  return {
    type: userConstants.LOGIN_REQUEST,
    request
  }
}

export const LoginSuccess = data => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: data
  }
}

export const LoginFailure = error => {
  return {
    type: userConstants.LOGIN_FAILURE,
    error
  }
}

export const fetchGetMeRequest = request => {
  return {
    type: userConstants.GET_CURRENT_USER_REQUEST,
    request
  }
}
export const fetchGetMeSuccess = data => {
  return {
    type: userConstants.GET_CURRENT_USER_SUCCESS,
    payload: data
  }
}
export const fetchGetMeFailure = error => {
  return {
    type: userConstants.GET_CURRENT_USER_FAILURE,
    error
  }
}

export const logoutUser = () => {
  return {
    type: userConstants.LOGOUT
  }
}

export const fetchRefreshTokenRequest = () => {
  return {
    type: userConstants.REFRESH_TOKEN_REQUEST
  }
}

export const fetchRefreshTokenSuccess = data => {
  return {
    type: userConstants.REFRESH_TOKEN_SUCCESS,
    payload: data
  }
}

export const fetchRefreshTokenFailure = error => {
  return {
    type: userConstants.REFRESH_TOKEN_FAILURE,
    payload: error
  }
}

export const fetchLogoutAllSessionRequest = () => {
  return {
    type: userConstants.LOGOUT_ALL_SESSION_REQUEST
  }
}

export const fetchLogoutAllSessionSuccess = data => {
  return {
    type: userConstants.LOGOUT_ALL_SESSION_SUCCESS,
    payload: data
  }
}

export const fetchLogoutAllSessionFailure = error => {
  return {
    type: userConstants.LOGOUT_ALL_SESSION_FAILURE,
    payload: error
  }
}

export const fetchLogoutAllUserSessionRequest = request => {
  return {
    type: userConstants.LOGOUT_ALL_USER_SESSION_REQUEST,
    request
  }
}

export const fetchLogoutAllUserSessionSuccess = data => {
  return {
    type: userConstants.LOGOUT_ALL_USER_SESSION_SUCCESS,
    payload: data
  }
}

export const fetchLogoutAllUserSessionFailure = error => {
  return {
    type: userConstants.LOGOUT_ALL_USER_SESSION_FAILURE,
    payload: error
  }
}
