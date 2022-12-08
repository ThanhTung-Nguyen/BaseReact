import {
  FIND_ALL_ACCOUNT,
  GET_USER_FACILITIES,
  UPDATE_USER_FACILITIES
} from "../../graphql/account/account.graphql"
import AuthHeader from "../../services/auth.header"
import {
  ApiGraphql
  // ApiForceLogouts,
  // ApiImportUsers,
  // ApiUpdatePermissions
} from "../../utils/config"
import { axiosInstance, axiosProvider } from "../utils"

const header = AuthHeader()

// export const findAllAccounts = () => {
//   return axiosInstance.post(ApiAccount.url, {
//     query: FIND_ALL_ACCOUNT
//   })
// }

// export const updatePermissions = param => {
//   return axiosInstance.post(ApiUpdatePermissions.url, param)
// }

// export const forceLogout = param => {
//   return axiosInstance.post(ApiForceLogouts.url, param)
// }

// export const updateUserFacility = userFacilityInput => {
//   return axiosInstance.post(ApiAccount.url, {
//     query: UPDATE_USER_FACILITIES,
//     variables: { userFacilityInput }
//   })
// }

// export const getUserFacilities = userId => {
//   return axiosInstance.post(ApiAccount.url, {
//     query: GET_USER_FACILITIES,
//     variables: { userId }
//   })
// }
