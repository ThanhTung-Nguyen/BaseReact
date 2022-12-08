import { loadingConstants } from "../../constants/loading"

const initialState = {
  showLoading: false
}

const LoadingReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case loadingConstants.SHOW_LOADING:
      return {
        ...state,
        showLoading: true
      }
    case loadingConstants.HIDE_LOADING:
      return {
        ...state,
        showLoading: false
      }
    default: {
      return state
    }
  }
}

export default LoadingReducer
