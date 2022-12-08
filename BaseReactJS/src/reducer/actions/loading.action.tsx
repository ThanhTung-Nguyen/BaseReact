import { loadingConstants } from "../../constants/loading"

export const showLoading = () => {
  return {
    type: loadingConstants.SHOW_LOADING
  }
}

export const hideLoading = () => {
  return { type: loadingConstants.HIDE_LOADING }
}
