import { CKEditor, CKEditorEventPayload } from "ckeditor4-react"
import { useEffect, useState } from "react"
import AuthHeader from "src/services/auth.header"
import { ApiGraphql } from "src/utils/config"
import { ckEditorConfig } from "./config"

const header = AuthHeader()

interface IProps {
  initData?: string
  onChange?: (e: CKEditorEventPayload<"change">) => void
  onEditorReady?: (e: CKEditorEventPayload<"instanceReady">) => void
}

const TextEditor = ({ initData, onChange, onEditorReady }: IProps) => {
  const [editor, setEditor] = useState<any>()

  useEffect(() => {
    editor?.setData(initData)
  }, [editor])

  const onInstanceReady = (e: CKEditorEventPayload<"instanceReady">) => {
    setEditor(e.editor)
    onEditorReady?.(e)

    e.editor.on("fileUploadRequest", function (evt) {
      const fileLoader = evt.data.fileLoader,
        formData = new FormData(),
        xhr = fileLoader.xhr

      xhr.open("POST", fileLoader.uploadUrl, true)
      xhr.setRequestHeader("Authorization", header?.Authorization)
      formData.append("file", fileLoader.file)
      xhr.send(formData)

      evt.stop()
    })

    e.editor.on("fileUploadResponse", function (evt) {
      // Prevent the default response handler.
      evt.stop()

      // Get XHR and response.
      const data = evt.data

      const response = JSON.parse(evt?.data?.fileLoader?.xhr?.response)

      if (response == null || response.status !== 0) {
        data.message = response?.message ?? "Error Upload"
        evt.cancel()
      } else {
        data.url = new URL(response.data ?? "").href
      }
    })
  }

  return (
    <CKEditor
      onInstanceReady={onInstanceReady}
      config={ckEditorConfig}
      initData={initData}
      onChange={onChange}
      editorUrl="https://cdn.ckeditor.com/4.16.2/full-all/ckeditor.js"
    />
  )
}

export default TextEditor
