interface TreeNodeData {
  title?: string | number
  value?: string | number
  children?: TreeNodeData[]
  disabled?: boolean
}

// interface ICategory {
//   id?: string
//   children?: ICategory[]
// }

interface IMenu {
  id: string
  path: string
  title?: string
  hide?: boolean
  children?: IMenu[]
  parentId?: string
  icon?: React.ReactNode
  component?: React.ComponentType<RouteComponentProps>
}

interface IAction<T = any> {
  type: string
  payload?: T
  request?: T
}
