import { useSelector } from "react-redux"
import { applyMiddleware, compose, createStore, Middleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer, { IState } from "../reducer/reducers/reducer"
import rootSaga from "../sagas"

const composeEnhancers =
  typeof window === "object" &&
  process.env.NODE_ENV === "development" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware] as Middleware[]
const enhancers = [applyMiddleware(...middlewares)]
const store = createStore(rootReducer, composeEnhancers(...enhancers))
sagaMiddleware.run(rootSaga)

export const useAppSelector = <T extends (state: IState) => any>(
  selector: T
): ReturnType<T> => useSelector(selector)

export default store
