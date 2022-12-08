import React from "react"
import { notification, message, Modal, Tag } from "antd"
import { WalletOutlined } from "@ant-design/icons"
const { confirm } = Modal

export const expiredMessage = {
  code: "TOKEN_EXPIRED",
  message: {
    vi: "Phiên đăng nhập đã hết hạn!",
    en: "Token is expired!"
  }
}
let blockExpiredMessage = false

type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"

function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O {
  return key in obj
}
export const openNotificationWithIcon = (
  type: string,
  message?: string,
  description?: string,
  duration?: number,
  placement?: NotificationPlacement
) => {
  let config: any = {
    message: message ? message : "",
    description: description ? description : "",
    style:
      type === "success"
        ? {
            background: "#59d01e"
          }
        : type === "warning"
        ? {
            background: "yellow"
          }
        : type === "error"
        ? {
            background: "red"
          }
        : ""
  }
  notification.config({
    duration: duration && duration > 1 ? duration : 5,
    placement: placement ? placement : "topRight"
    // closeIcon: true
  })

  const expiredMessageLang =
    expiredMessage.message[navigator.language] ??
    expiredMessage.message.en ??
    expiredMessage.message.vi

  if (expiredMessageLang === message) {
    if (blockExpiredMessage) {
      return
    }
    blockExpiredMessage = true
    setTimeout(() => {
      blockExpiredMessage = false
    }, 5000)
  }

  hasKey(notification, type) && notification[type](config)
}

export const openConfirmModal = (
  onOk: () => void,
  title: string = "Cảnh báo",
  description: string = "Bạn có chắc muốn thực hiện hành động này?",
  onCancel: () => void = () => {},
  okButtonText: string = "Đồng ý",
  cancelButtonText: string = "Huỷ bỏ"
) => {
  Modal.confirm({
    title: title,
    // icon: WalletOutlined,
    content: description,
    okText: okButtonText,
    cancelText: cancelButtonText,
    onOk: () => onOk(),
    onCancel: () => onCancel()
  })
}
