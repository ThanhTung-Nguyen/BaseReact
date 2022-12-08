import * as _ from "lodash"

export const findCategory = <T extends ICategory>(list?: T[], id?: string) => {
  if (list == null || id == null) {
    return
  }
  let result: T | undefined

  for (const item of list) {
    if (result != null) {
      break
    }

    if (item.id === id) {
      result = item
    } else {
      result = findCategory(item?.children as T[], id)
    }
  }

  return result
}

/**
 * Build children tree
 * @param data: list item
 * @param idAttr: id's attribute name, default `id`
 * @param parentAttr: parent's attribute name, default `parent`
 * @param parentIdAttr: parent id's attribute name, default `parentId`
 * @param childrenAttr: children's attribute name, default `children`
 */
export function treeify<T = any>({
  data = [],
  idAttr = "id",
  parentAttr = "parent",
  parentIdAttr = "parentId",
  childrenAttr = "children"
}: {
  data?: T[]
  idAttr?: string
  parentAttr?: string
  childrenAttr?: string
  parentIdAttr?: string
}) {
  if (!data || data.length === 0) {
    return data
  }

  const list = _.cloneDeep(data)
  const treeList: T[] = []
  const lookup: Record<string, T> = {}

  for (const obj of list) {
    lookup[obj[idAttr]] = obj
  }

  for (const obj of list) {
    const parentId = obj[parentIdAttr]
    const parent = lookup[parentId]

    if (parentId != null && parent != null) {
      const children = parent[childrenAttr]

      parent[childrenAttr] = Array.isArray(children)
        ? [...children, obj]
        : [obj]

      obj[parentAttr] = {
        ...parent,
        [childrenAttr]: undefined
      }
    } else {
      treeList.push(obj)
    }
  }

  return treeList
}

export const getMap = (menu?: any[], key = "id"): Record<string, any> => {
  return menu?.reduce((acc, val) => {
    const children = val.children ? getMap(val.children) : []

    return {
      ...acc,
      [val[key]]: { ...val, children }
    }
  }, {})
}

export const getFlatMap = (mainMenu: any[], parentId?: string): any[] => {
  const menu = _.cloneDeep(mainMenu)
  return menu
    .reduce<any[]>((acc, val) => {
      const children = val.children ? getFlatMap(val.children, val.id) : []
      if (children.length > 0) {
        val.children = undefined
      } else {
        val.parentId = parentId
      }
      return [...acc, val, ...children]
    }, [])
    .filter(Boolean)
}
