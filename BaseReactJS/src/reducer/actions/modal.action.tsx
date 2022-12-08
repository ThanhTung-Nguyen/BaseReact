import { ModalConstants } from "../../constants/modal"

export const ShowModal = () => {
  return {
    type: ModalConstants.SHOW_MODAL
  }
}

export const HideModal = () => {
  return {
    type: ModalConstants.HIDE_MODAL
  }
}
export const ChangeTitleModal = title => {
  return {
    type: ModalConstants.CHANGE_TITLE_MODAL,
    payload: title
  }
}
