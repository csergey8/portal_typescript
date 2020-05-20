import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { getNews } from '../../redux';
import { NewsItem, AppState } from '../../redux/types'
import { RootReducerType } from '../../redux/store'
import { NewsCarousel } from './NewsCarousel';
import NewsGrid from './NewsGrid';


type PropsTypes = MapStatePropsType & MapDispatchPropsType

const NewsContainer: React.FC<PropsTypes> = (props) => {
  React.useEffect(() => props.getNews(), [])
  return (
    <Paper elevation={3} style={{ width: 600 }}>
      <NewsCarousel items={props.topNews} />
      <NewsGrid items={props.gridNews}/>
    </Paper>
  );
};

type MapStatePropsType = {
  topNews: Array<NewsItem> | null
  gridNews: Array<NewsItem> | null
  isLoading: boolean
}

type MapDispatchPropsType = {
  getNews: () => void
}

const mapStateToProps = (state: RootReducerType): MapStatePropsType => ({
  topNews: state.newsReducer.topNews,
  gridNews: state.newsReducer.gridNews,
  isLoading: state.newsReducer.isLoading,
})

const ReduxNewsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppState
>(mapStateToProps, { getNews })(NewsContainer);

export { ReduxNewsContainer as NewsContainer }