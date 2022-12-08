import { ModalConstants } from "../../constants/modal"

const initialState = {
  showModal: false,
  title: null
}
export const ModalReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ModalConstants.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      }
    case ModalConstants.HIDE_MODAL:
      return {
        ...state,
        showModal: false
      }
    case ModalConstants.CHANGE_TITLE_MODAL:
      return {
        ...state,
        title: payload
      }
    default:
      return state
  }
}
