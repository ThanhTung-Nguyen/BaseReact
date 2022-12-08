export const getTreeData = (arr?: ICategory[], id?: string) => {
  if (arr == null) {
    return
  }

  const result: TreeNodeData[] = []

  for (const item of arr) {
    result.push({
      title: item.name,
      value: item.id,
      disabled: item.id === id,
      children: getTreeData(item.children, id)
    })
  }

  return result
}
