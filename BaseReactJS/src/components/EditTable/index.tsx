import { SaveTwoTone } from "@ant-design/icons"
import { Col, Form, Input } from "antd"
import React, { useContext, useEffect, useRef, useState } from "react"

const EditableContext = React.createContext({})

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm<any>()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  changeStatus,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>()
  const form = useContext<any>(EditableContext)
  const [editStatus, setEditStatus] = useState(false)
  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form?.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const save = async () => {
    try {
      const values = await form?.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
      >
        <Input ref={inputRef} addonAfter={<SaveTwoTone onClick={save} />} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}
