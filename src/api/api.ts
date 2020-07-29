import axios, { AxiosResponse } from 'axios'
import { NewsItem } from '../redux/types'

const { REACT_APP_OPEN_WEATHER_MAP_API_KEY, REACT_APP_CRYPTO_COPMARE_API_KEY } = process.env;

const newsApiInstance = axios.create({
  baseURL: 'http://newsapi.org/v2/top-headlines?country=ua',
  headers: {
    'X-Api-Key': 'f0471d6844434a7ea53daadffb1ac103',
  },
})

const cryptoApiInstance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: {
    authorization: `Apikey ${REACT_APP_CRYPTO_COPMARE_API_KEY}`,
  },
});

const airportsFinderInstance = axios.create({
  baseURL: 'https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius',
  headers: {
    "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
  	"x-rapidapi-key": "843a748b10msh14238632f35cf23p1803c5jsnace816f4e42f"
  },
})

const travelPayoutsInstance = axios.create({
  baseURL: '',
  headers: {
    "X-Access-Token": '98bbefcb147bac2191c7967076b8544a'
  }
})

export enum ResultCodeEnum {
  Success = 'ok',
  Error = 'error'
}

interface NewsApi {
  getNewsUa(): Promise<AxiosResponse<any>>
}

type NewsApiResponseType = {
  status: ResultCodeEnum
  totalResults: number
  articles: Array<NewsItem>
}

export const newsApi: NewsApi = {
  getNewsUa: async () => await newsApiInstance.get<AxiosResponse<NewsApiResponseType>>('').then(res => res.data),
}

export const cryptoApi = {
  getCryptoPrice: async () => cryptoApiInstance.get('/top/totalvolfull', { params: { limit: 10, tsym: 'USD' } }),
  getCryptoHistoryPrice: async (currency = 'BTC') =>  cryptoApiInstance.get('/v2/histoday', { params: { fsym: currency, tsym: 'USD', limit: 6, toTs: new Date().getTime() }}),
};

export const airportsFinderApi = {
  getAirportsByRadius: async (coords: any) => airportsFinderInstance.get('', { params: { radius: 50, ...coords }}), 
}

export const travelPayoutsApi = {
  autocompleteRequest: async (text: any) => travelPayoutsInstance.get('', { params: { term: text, locale: 'en', 'types[]': 'country', callback: 'function'}})
}

export const cityAndAirportsListApi = {
  getList: async () => axios.get('https://raw.githubusercontent.com/mwgg/Airports/master/airports.json')
} 