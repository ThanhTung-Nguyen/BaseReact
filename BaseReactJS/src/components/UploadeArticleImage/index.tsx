import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Modal, Upload } from "antd"
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Response } from "src/constants/message"
// import { ApiView } from "src/utils/config"
import { uploadArticleImage, uploadImage } from "src/services/utils"

interface IProps {
  src?: string
  singleFile?: boolean
  multiple?: boolean
  onChange?: (files: UploadFile[]) => void
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const UploadArticleImage = ({
  src,
  singleFile,
  multiple,
  onChange
}: IProps) => {
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState("")
  const [previewTitle, setPreviewTitle] = React.useState("")
  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const [loading, setLoading] = React.useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (src != null && src !== "") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: src
        }
      ])
    } else {
      setFileList([])
    }
  }, [src])

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    )
  }

  const handleChange = async ({ fileList }: UploadChangeParam<UploadFile>) => {
    if (fileList == null) {
      return
    }

    if (singleFile && fileList.length !== 0) {
      setLoading(true)
      const lastFile = fileList[fileList.length - 1]
      let file: UploadFile
      try {
        const response = await uploadArticleImage(lastFile.originFileObj)
        if (response.data.status === Response.STATUS_SUCCESS) {
          setLoading(false)
          const url = new URL(response.data.data ?? "").href
          file = {
            ...lastFile,
            status: "success",
            thumbUrl: url,
            url
          }
        } else {
          // if (response?.data?.code.includes("TOKEN_")) {
          //   dispatch(fetchRefreshTokenRequest())
          //   ResponseMessage(response.data)
          // }
          setLoading(false)
          throw Error(response.data.message)
        }
      } catch (err) {
        setLoading(false)
        file = {
          ...lastFile,
          status: "error",
          response: err.code || err.message,
          thumbUrl: "",
          url: ""
        }
      }
      setFileList([file])
      onChange?.([file])
    } else {
      setFileList(fileList)
      onChange?.(fileList)
    }
  }

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div>
          <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <Upload
        name="file-uploader"
        disabled={loading}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={multiple}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UploadArticleImage
