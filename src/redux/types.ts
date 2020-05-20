import { newsActions } from './actions';

export interface AppState {
  newsReducer: NewsReducer
  cryptoReducer: CryptoReducer
}

export interface NewsItem {
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

export interface NewsReducer {
  topNews: NewsItem[] | null
  gridNews: NewsItem[] | null
  isLoading: boolean
  error: boolean | null
}

export interface GetNewsAction {
  type: typeof newsActions.GET_NEWS
}

export interface CryptoReducer {
  cryptoRates: CryptoRate[] | null
  cryptoHistoryRates: CryptoHistoryRate[] | null
  isLoading: boolean
  error?: string | null
}

export interface CryptoRate {
  name: string
  fullName: string
  imgUrl: string
  price: number
  diff: DifferenceCryptoRate
}

export interface CryptoHistoryRate {
  name: string
  data: number[]
}

export enum DifferenceCryptoRate {
  UP = 'UP',
  DOWN = 'DOWN',
  NO_CHANGE = 'NO_CHANGE',
}

