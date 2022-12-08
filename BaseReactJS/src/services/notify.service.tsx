import { ApiGraphql } from "src/utils/config"
import AuthHeader from "./auth.header"
import { axiosInstance, axiosProvider } from "./utils"

const headers = AuthHeader()

export const getNotify = (data?: INotifyRequest) =>
  axiosInstance.post<IResponse<INotify>>(
    `${ApiGraphql.url}/notifications`,
    data
  )

export const getNotifyType = () =>
  axiosInstance.post<IResponse<INotifyType>>(
    `${ApiGraphql.url}/notifyTypes`,
    {}
  )

export const sendNotifyAll = (data?: Partial<IAddNotifyRequest>) =>
  axiosInstance.post(`${ApiGraphql.url}/sendNotifyTopicToKafka`, data)

export const sendNotify = (data?: Partial<IAddNotifyRequest>) =>
  axiosInstance.post(`${ApiGraphql.url}/sendNotifyKafka`, data)

export const deleteNotify = (id?: string) =>
  axiosInstance.post(`${ApiGraphql.url}/deleteNotify`, { id })
