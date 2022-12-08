import React, { useState } from "react"
import CheckboxTree from "react-checkbox-tree"
import "react-checkbox-tree/lib/react-checkbox-tree.css"
import {
  FaChevronDown,
  FaChevronRight,
  FaRegCheckSquare,
  FaRegMinusSquare,
  FaRegSquare
} from "react-icons/fa"

interface Props {
  dataTree: []
  checkedKeys: string[]
  expandedKeys: string[]
  onCheck: (checked, node) => void
  onExpand: (expanded, node) => void
  // onClick: (node) => void
}

const TreeView = (props: Props) => {
  const { dataTree, checkedKeys, expandedKeys, onCheck, onExpand } = props

  const icons = {
    check: <FaRegCheckSquare />,
    uncheck: <FaRegSquare />,
    halfCheck: <FaRegMinusSquare />,
    expandClose: <FaChevronRight />,
    expandOpen: <FaChevronDown />,
    expandAll: <FaChevronDown />
  }
  const nodes = [
    {
      value: "mars",
      label: "Mars",
      children: [
        {
          value: "mars1",
          label: "Mars1"
        },
        {
          value: "mars2",
          label: "Mars2",

          children: [
            {
              value: "mars3",
              label: "Mars3",
              disabled: true
            },
            {
              value: "mars4",
              label: "Mars4"
            }
          ]
        }
      ]
    }
  ]

  return (
    <div>
      <CheckboxTree
        nodes={dataTree}
        checked={checkedKeys}
        expanded={expandedKeys}
        onCheck={onCheck}
        onExpand={onExpand}
        icons={icons}
        showNodeIcon={false}
        // onClick={onClick}
      />
    </div>
  )
}
export default TreeView
