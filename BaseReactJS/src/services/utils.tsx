import axios from "axios"
import { useSelector } from "react-redux"
import store from "src/store/store"
import { ApiFileUpload, ApiUploadArticleImage } from "src/utils/config"
import AuthHeader from "../services/auth.header"
import { Response } from "src/constants/message"
// import { ApiUploadImage } from "../utils/config"
// import fs from "fs"
export let axiosCancel = axios.CancelToken.source()

export const axiosInstance = axios.create({
  timeout: 60000,
  cancelToken: axiosCancel.token
})

export let axiosProvider = axios.create({
  headers: AuthHeader()
})

export function setAxiosProvider() {
  axiosProvider = axios.create({
    headers: AuthHeader(),
    cancelToken: axiosCancel.token
  })
}

export function uploadImage<T = any>(file) {
  let data = new FormData()
  data.append("files", file)
  return axiosInstance.post<T>(ApiFileUpload.url, data, {
    headers: AuthHeader()
  })
}
export function uploadArticleImage<T = any>(file) {
  let data = new FormData()
  data.append("file", file)
  return axiosInstance.post<T>(ApiUploadArticleImage.url, data, {
    headers: AuthHeader()
  })
}
export function cancelRequests(message?: string) {
  axiosCancel.cancel(message)
  axiosCancel = axios.CancelToken.source()
  setAxiosProvider()
}

export const updateAccessToken = async (
  token,
  refreshToken,
  tokenExpiredDate
) => {
  let userInfo = JSON.parse(window.localStorage.getItem("login") as string)

  if (token) {
    userInfo.token = token
  }
  if (refreshToken) {
    userInfo.refreshToken = refreshToken
  }
  if (tokenExpiredDate) {
    userInfo.tokenExpiredDate = tokenExpiredDate
  }
  await window.localStorage.setItem("login", JSON.stringify(userInfo))
}
