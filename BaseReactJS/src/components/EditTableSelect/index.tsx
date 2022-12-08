import { Form, Select, Spin } from "antd"
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { useDispatch } from "react-redux"
import _ from "lodash"
import { Console } from "console"

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
  optionUserTypes,
  optionSex,
  dataImport,
  setDataImport,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>()
  const form = useContext<any>(EditableContext)
  const [editStatus, setEditStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState<any>("")

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

  const onChange = (value, option) => {
    if (dataIndex?.includes("userTypeId")) {
      setDataImport(
        dataImport?.map(item =>
          item?.staffCode === record?.staffCode
            ? {
                ...item,
                userTypeId: value
              }
            : item
        )
      )
    } else {
      setDataImport(
        dataImport?.map(item =>
          item?.staffCode === record?.staffCode
            ? {
                ...item,
                sex: value
              }
            : item
        )
      )
    }
  }

  const userTypeDefault = optionUserTypes?.find(item =>
    item?.key?.includes("USER_TD")
  )

  return (
    <td {...restProps}>
      {editable ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
        >
          <Select
            ref={inputRef}
            onChange={onChange}
            defaultValue={
              dataIndex?.includes("userTypeId")
                ? userTypeDefault?.value
                : "FEMALE"
            }
            options={
              dataIndex?.includes("userTypeId") ? optionUserTypes : optionSex
            }
            style={{ width: 150 }}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
