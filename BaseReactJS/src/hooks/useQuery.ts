import React from "react"
import { AxiosRequestConfig } from "axios"
import { axiosProvider } from "src/services/utils"

interface Props<P> {
  url: string
  method?: "get" | "post"
  initialCall?: boolean
  initialParams?: P
  config?: AxiosRequestConfig
  functionName?: string
}

const useQuery = <T = any, P = any>({
  url,
  initialCall = true,
  initialParams,
  method = "get",
  config,
  functionName = ""
}: Props<P>) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCalled, setIsCalled] = React.useState(initialCall)
  const [isError, setIsError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [data, setData] = React.useState<T>()
  const [params, setParams] = React.useState<P | undefined>(initialParams)

  React.useEffect(() => {
    const fetchData = async () => {
      setData(undefined)
      setIsLoading(true)
      try {
        let res = await axiosProvider({
          ...config,
          method,
          data: params,
          url
        })

        const responseData = res.data.data[functionName]
        if (responseData?.status === 0) {
          throw Error(res.data.message)
        }
        setData(responseData.data)
        setIsError(false)
        setErrorMessage("")
      } catch (err) {
        setIsError(true)
        setErrorMessage(err.message)
      }
      setIsLoading(false)
      setIsCalled(false)
    }

    if (isCalled) {
      fetchData()
    }
  }, [isCalled])

  const call = (params?: P) => {
    setParams(params ?? initialParams)
    setIsCalled(true)
  }

  const reset = () => {
    setData(undefined)
    setIsLoading(false)
    setIsCalled(false)
    setParams(initialParams)
    setErrorMessage("")
    setIsError(false)
  }

  return { isLoading, isError, data, call, errorMessage, reset }
}

export default useQuery
