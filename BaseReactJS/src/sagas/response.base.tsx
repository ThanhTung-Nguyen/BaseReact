import { Response } from "src/constants/message"
import { openNotificationWithIcon } from "src/helpers/notification"
import { fetchRefreshTokenRequest } from "src/reducer/actions/auth.action"

export const ResponseMessage = data => {
  if (data?.Status == Response.STATUS_FAIL) {
    openNotificationWithIcon("error", data?.Message, "")
  } else if (data?.response?.status == Response.STATUS_FAIL) {
    openNotificationWithIcon("error", data?.response?.message, "")
  } else {
    if (
      data?.status === Response.STATUS_SUCCESS ||
      data?.code === Response.SUCCESS
    ) {
      openNotificationWithIcon("success", data?.message, "")
    } else {
      openNotificationWithIcon("error", data?.message, "")
    }
  }
}
