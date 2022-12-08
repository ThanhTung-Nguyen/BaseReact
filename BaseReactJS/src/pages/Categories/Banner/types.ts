import { FormAction } from "src/constants/enum"

export interface ITableBannerProps {
  page: number
  pageSize?: number
  records?: number
  showLoading?: boolean
  selectedRows?: any
  data: any[]
  handleChangePage: (page: number, pageSize?: number) => void
  setSelectedRows: any
  handleShowDetailModal: (selectedRow: IBannerType) => void
  handleShowEditModal: (selectedRow: IBannerType) => void
  handleCreate: (selectedRow: IBannerType) => void
  handleDelete: (selectedRow: IBannerType) => void
  handleChangeStatus: (selectedRow: IBannerType) => void
  handleSubmit: (value: IBannerType) => void
  handleShowCreateModal: () => void
}

export interface IFilterBannerProps {
  handleShowCreateModal: () => void
  handleMultipleDelete: () => void
  handleSearch: (title?: string) => void
}

export interface IFormBannerProps {
  data: IBannerType | null
  list: IBannerType[]
  formAction: FormAction | null
  showModal: boolean
  loadingSave: boolean
  handleCloseModal: () => void
  handleSubmit: (value: IBannerType) => void
}
