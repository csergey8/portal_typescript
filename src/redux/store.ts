import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { newsReducer } from './newsReducer'
import { cryptoReducer } from './cryptoReducer'
import { rootSaga } from './sagas'
import { AppState } from './types'

export type RootReducerType = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers<AppState>({
  newsReducer,
  cryptoReducer
})

//@ts-ignore
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk, sagaMiddleware]

const store = createStore<AppState, any, any, any>(rootReducer, storeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export { store }

