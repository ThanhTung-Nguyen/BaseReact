import AuthHeader from "src/services/auth.header"
import { ApiUploadArticleImage } from "src/utils/config"

const header = AuthHeader()

export const ckEditorConfig = {
  extraPlugins: "uploadimage,image2",
  height: 400,
  uploadUrl: ApiUploadArticleImage.url,
  filebrowserUploadUrl: ApiUploadArticleImage.url,
  filebrowserImageUploadUrl: ApiUploadArticleImage.url,
  fileTools_requestHeaders: header,
  scayt_autoStartup: false,
  enterMode: 2,
  shiftEnterMode: 2,
  toolbar: [
    {
      name: "document",
      items: [
        "Source",
        "-",
        "Save",
        "NewPage",
        "ExportPdf",
        "Preview",
        "Print",
        "-",
        "Templates"
      ]
    },
    {
      name: "clipboard",
      items: [
        "Cut",
        "Copy",
        "Paste",
        "PasteText",
        "PasteFromWord",
        "-",
        "Undo",
        "Redo"
      ]
    },
    {
      name: "editing",
      items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
    },
    {
      name: "forms",
      items: [
        "Form",
        "Checkbox",
        "Radio",
        "TextField",
        "Textarea",
        "Select",
        "Button",
        "ImageButton",
        "HiddenField"
      ]
    },
    "/",
    {
      name: "basicstyles",
      items: [
        "Bold",
        "Italic",
        "Underline",
        "Strike",
        "Subscript",
        "Superscript",
        "-",
        "CopyFormatting",
        "RemoveFormat"
      ]
    },
    {
      name: "paragraph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "links", items: ["Link", "Unlink", "Anchor"] },
    {
      name: "insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontalRule",
        "Smiley",
        "SpecialChar",
        "PageBreak",
        "Iframe"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize", "ShowBlocks"] },
    { name: "about", items: ["About"] }
  ]
}
