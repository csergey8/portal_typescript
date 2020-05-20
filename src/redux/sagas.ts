import {
  put,
  call,
  takeEvery,
  all,
  select,
  take,
  delay
} from 'redux-saga/effects'
import moment from 'moment'
import { newsActions, cryptoActions } from './actions'
import { newsApi, ResultCodeEnum, cryptoApi } from '../api'
import { DifferenceCryptoRate, CryptoHistoryRate } from './types'

function * getNews () {
  yield put({ type: newsActions.LOAD_NEWS_REQUEST })
  try {
    const data = yield call(newsApi.getNewsUa)
    if (data.status === ResultCodeEnum.Success) {
      const { articles } = data
      yield put({ type: newsActions.LOAD_NEWS_SUCCESS, articles })
    }
  } catch (error) {
    yield put({ type: newsActions.LOAD_NEWS_FAILURE })
  }
}

export function* getCryptoHistoryPrice() {
  yield put({ type: cryptoActions.LOAD_CRYPTO_HISTORY_REQUEST })
  try { 
    const { cryptoReducer } = yield select()
    const results = yield all(cryptoReducer.cryptoRates.map((rate: any) => call(cryptoApi.getCryptoHistoryPrice, rate.name)));
    const cryptoHistoryData: CryptoHistoryRate[] = results.map((res: any, i: number): CryptoHistoryRate => {
      return {
        name: cryptoReducer.cryptoRates[i].name,
        data: res.data.Data.Data.map((item: any) => item.high),
      }
    })
    yield put({ type: cryptoActions.LOAD_CRYPTO_HISTORY_SUCCESS, payload: cryptoHistoryData })
  } catch (error) {
    yield put({ type: cryptoActions.LOAD_CRYPTO_HISTORY_FAILURE, payload: error })
  }
  
}

export function * getCryptoPrice () {
  yield put({ type: cryptoActions.LOAD_CRYPTO_REQUEST })
  const { data } = yield call(cryptoApi.getCryptoPrice)
  let cryptoPriceData = data.Data.map((coin: any) => ({
    name: coin.CoinInfo.Name,
    fullName: coin.CoinInfo.FullName,
    imgUrl: coin.CoinInfo.ImageUrl,
    price: coin.RAW.USD.PRICE.toFixed(2),
    diff:
      coin.RAW.USD.CHANGEHOUR > 0
        ? DifferenceCryptoRate.UP
        : coin.RAW.USD.CHANGEHOUR < 0
        ? DifferenceCryptoRate.DOWN
        : DifferenceCryptoRate.NO_CHANGE
  }))
  const { cryptoReducer } = yield select()
  if (cryptoReducer.cryptoCurrencies) {
    cryptoPriceData = cryptoReducer.cryptoCurrencies.map(
      (coin: any, i: number) => ({
        ...coin,
        diff:
          coin.price < cryptoPriceData[i].price
            ? DifferenceCryptoRate.UP
            : coin.price > cryptoPriceData[i].price
            ? DifferenceCryptoRate.DOWN
            : DifferenceCryptoRate.NO_CHANGE
      })
    )
  }
  yield put({
    type: cryptoActions.LOAD_CRYPTO_SUCCESS,
    payload: cryptoPriceData
  })
}

function * watchGetNews () {
  yield takeEvery(newsActions.GET_NEWS, getNews)
}

export function * watchGetCryptoPrice () {
  yield take(cryptoActions.GET_CRYPTO_PRICE)
  yield call(getCryptoPrice)
  yield call(getCryptoHistoryPrice)
  while (true) {
    yield call(getCryptoPrice)
    yield delay(60000)
  }
}

export function * rootSaga () {
  yield all([watchGetNews(), watchGetCryptoPrice()])
}
