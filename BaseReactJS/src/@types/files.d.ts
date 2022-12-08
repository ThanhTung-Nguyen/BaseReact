/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly PUBLIC_URL: string
    readonly REACT_APP_API_LOGIN: string
    readonly REACT_APP_API_LOGOUT: string
    readonly REACT_APP_API_GRAPHQL: string
    readonly REACT_APP_API_REFRESH_TOKEN: string
    readonly REACT_APP_API_FILE_UPLOAD: string
    readonly REACT_APP_API_LOGOUT_ALL_SESSION: string
    readonly REACT_APP_API_LOGOUT_ALL_USER_SESSION: string
    readonly REACT_APP_API_LOGOUT_ALL_OTHER_SESSION: string
    readonly REACT_APP_API_UPLOAD_ARTICLE_IMAGE: string
    // readonly REACT_APP_API_UPLOAD_IMAGE: string
    // readonly REACT_APP_API_VIEW: string
    // readonly REACT_APP_API_GET_M: string
    // readonly REACT_APP_API_QA: string
    // readonly REACT_APP_API_NEWS: string
    // readonly REACT_APP_API_UPDATE_PERMISSION: string
    // readonly REACT_APP_API_FORCE_LOGOUT: string
    // readonly REACT_APP_API_VC_HISTORY: string
    // readonly REACT_APP_API_NOTIFY: string
    // readonly REACT_APP_API_APPOINTMENT: string

    // readonly REACT_APP_API_IMPORT_USER: string
  }
}

declare module "*.bmp" {
  const src: string
  export default src
}

declare module "*.gif" {
  const src: string
  export default src
}

declare module "*.jpg" {
  const src: string
  export default src
}

declare module "*.jpeg" {
  const src: string
  export default src
}

declare module "*.png" {
  const src: string
  export default src
}

declare module "*.webp" {
  const src: string
  export default src
}

declare module "*.svg" {
  import * as React from "react"

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string }
  export default classes
}
