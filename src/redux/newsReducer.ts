import { NewsReducer, NewsItem } from './types'
import { newsActions, newsACTypes } from './actions'

type NullableArray<T> = T[] | null

type InitialState = typeof initialState

const initialState: NewsReducer = {
  gridNews: null as NullableArray<NewsItem>,
  topNews: null as NullableArray<NewsItem>,
  isLoading: true,
  error: null,
}

const handlers: any = {
  DEFAULT: (state: InitialState, actions: any): any => state,
  [newsActions.LOAD_NEWS_REQUEST]: 
  (state: InitialState, actions: any): InitialState => ({ ...state, isLoading: true }),
  [newsActions.LOAD_NEWS_SUCCESS]: 
  (state: InitialState, { articles }: any): InitialState => {
    const topNews = articles.slice(0, 3)
    const gridNews = articles.slice(3)
    return { ...state, topNews, gridNews, isLoading: false }
  },
  [newsActions.LOAD_NEWS_FAILURE]: 
  (state: InitialState, actions: newsACTypes): InitialState => ({ ...state, isLoading: false }),
}

export const newsReducer = (state: InitialState = initialState, action: newsACTypes): InitialState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}