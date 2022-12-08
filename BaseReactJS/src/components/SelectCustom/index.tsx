import { Select, Spin } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import debounce from "lodash/debounce"
import { useQueryServices } from "src/graphql/categories/service/service.graphql"
import { Response } from "src/constants/message"
import _ from "lodash"

interface Props {
  inputRef: any
  record?: any
  dataService?: any[]
  setDataService?: any
  setErrorMessage?: any
}

const SelectCustom = props => {
  const { inputRef, dataService, setDataService, record, setErrorMessage } =
    props
  const [options, setOptions] = useState<any>([])
  const [variables, setVariables] = useState({
    page: 1,
    pageSize: 50
  })

  const { data, loading } = useQueryServices({
    variables
  })

  const onChange = (value, option) => {
    const service = data?.serviceCMS.data.find(
      item2 => item2.serviceCode === option.code
    )
    if (checkExist(value)) {
      setErrorMessage("Mã xét nghiệm đã tồn tại!")
    } else {
      setDataService(
        dataService?.map((val: any) =>
          val?.key === record?.key
            ? {
                ...val,
                serviceId: service?.serviceId,
                serviceCode: service?.serviceCode,
                serviceName: service?.serviceName,
                originPrice: service?.originPrice,
                status: 1
              }
            : val
        )
      )
    }
  }

  const checkExist = value => {
    const service = dataService?.find(item =>
      item?.serviceName?.includes(value)
    )

    if (service != null) {
      return true
    } else {
      return false
    }
  }

  const onSearch = useCallback(
    _.debounce((value: string) => {
      if (value !== null && value !== "") {
        const requestVariable = {
          page: 1,
          pageSize: 50,
          filtered: [
            // {
            //   id: "serviceName",
            //   value,
            //   operation: "~"
            // }
            {
              id: "serviceCode",
              value,
              operation: "~"
            }
          ],
          sorted: []
        }
        setVariables(requestVariable)
      } else {
        setVariables({
          page: 1,
          pageSize: 50
        })
      }
    }, 1000),
    []
  )

  useEffect(() => {
    if (data?.serviceCMS?.code === Response.SUCCESS) {
      setOptions(
        data?.serviceCMS.data.map(item => ({
          label: item?.serviceCode + " - " + item?.serviceName,
          value: item?.serviceName ?? "",
          code: item?.serviceCode
        }))
      )
    }
  }, [data?.serviceCMS])

  return (
    <>
      <Select
        ref={inputRef}
        showSearch
        onChange={onChange}
        onSearch={onSearch}
        loading={loading}
        options={options}
        filterOption={false}
        style={{ width: 300 }}
        notFoundContent={
          loading ? (
            <Spin spinning={loading}>Đang tải</Spin>
          ) : (
            "Nhập để tìm kiếm"
          )
        }
      />
    </>
  )
}

export default SelectCustom
