import { NotifyConstant } from "src/constants/notify"

export const getNotify = (
  payload: INotifyRequest
): IAction<INotifyRequest> => ({
  type: NotifyConstant.GET_ALL_NOTIFY_REQUEST,
  payload
})

export const getNotifyType = (): IAction => ({
  type: NotifyConstant.GET_ALL_NOTIFY_TYPE_REQUEST
})

export const sendNotifyAll = (
  payload: Partial<IAddNotifyRequest>
): IAction<Partial<IAddNotifyRequest>> => ({
  type: NotifyConstant.SEND_ALL_NOTIFY_REQUEST,
  payload
})

export const sendNotify = (
  payload: Partial<IAddNotifyRequest>
): IAction<Partial<IAddNotifyRequest>> => ({
  type: NotifyConstant.SEND_NOTIFY_REQUEST,
  payload
})

export const deleteNotify = (id: string): IAction<{ id: string }> => ({
  type: NotifyConstant.DELETE_NOTIFY_REQUEST,
  payload: { id }
})
