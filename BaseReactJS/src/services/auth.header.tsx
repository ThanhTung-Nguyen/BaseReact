export const getRefreshToken = () => {
  let userInfo = JSON.parse(window.localStorage.getItem("login") as string)
  return userInfo?.refreshToken || ""
}

export default function AuthHeader() {
  let user: any
  let header = {} as any

  const data = window.localStorage.getItem("login")
  if (data && typeof data !== "undefined") {
    user = JSON?.parse(data)
    header = {
      // Authorization: `Bearer ` + user?.token,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Accept-Language": "vi"
    }
  }

  return header
}
