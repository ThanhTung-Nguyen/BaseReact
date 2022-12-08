export interface IPackageCategory {
  id?: string
  name?: string
  createDate?: string
  createUser?: string
  description?: string
  image?: string
  orders?: number
  status?: number
}

export interface IPackageCategoryReducer {
  changeData?: boolean
  listPackageType?: IPackageCategory[]
  payload?: {
    listPackageTypes?: IPackageCategory[]
  }
  error?: Error
}
