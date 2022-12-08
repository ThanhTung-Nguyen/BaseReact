import React from "react"
import ReactDOM from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import App from "./App/App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import store from "./store/store"
import "antd/dist/antd.css"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo"
import ErrorBoundary from "antd/lib/alert/ErrorBoundary"
import { ClearBrowserCacheBoundary } from "react-clear-browser-cache"

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
