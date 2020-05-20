import { CryptoReducer, CryptoRate, CryptoHistoryRate } from './types'
import { cryptoActions } from './actions'

type NullableArray<T> = T[] | null

type InitialState = typeof initialState

const initialState: CryptoReducer = {
  cryptoRates: null as NullableArray<CryptoRate>,
  cryptoHistoryRates: null as NullableArray<CryptoHistoryRate>,
  isLoading: false,
  error: null,
}

const handlers: any = {
  DEFAULT: (state: InitialState, actions: any): any => state,
  [cryptoActions.LOAD_CRYPTO_REQUEST]: 
  (state: InitialState, actions: any): InitialState => ({ ...state, isLoading: true }),
  [cryptoActions.LOAD_CRYPTO_SUCCESS]: 
  (state: InitialState, actions: any): InitialState => ({ ...state, cryptoRates: actions.payload }),
  [cryptoActions.LOAD_CRYPTO_FAILURE]: 
  (state: InitialState, actions: any): InitialState => ({ ...state, isLoading: false, error: actions.payload }),
  [cryptoActions.LOAD_CRYPTO_HISTORY_REQUEST]:
  (state: InitialState, actions: any): InitialState => ({ ...state, isLoading: true }),
  [cryptoActions.LOAD_CRYPTO_HISTORY_SUCCESS]:
  (state: InitialState, actions: any): InitialState => ({ ...state, cryptoHistoryRates: actions.payload }),
  [cryptoActions.LOAD_CRYPTO_HISTORY_FAILURE]:
  (state: InitialState, actions: any): InitialState => ({ ...state, isLoading: false, error: actions.payload })
}

export const cryptoReducer = (state: InitialState = initialState, action: any): InitialState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}
