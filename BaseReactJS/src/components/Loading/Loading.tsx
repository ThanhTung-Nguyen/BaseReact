import { Spin } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import { WrapperLoading } from "./style"

export const Loading = () => {
  const loading = useSelector((state: any) => state.LoadingReducer?.showLoading)

  return loading ? (
    <WrapperLoading>
      <Spin spinning={loading} />
    </WrapperLoading>
  ) : null
}
