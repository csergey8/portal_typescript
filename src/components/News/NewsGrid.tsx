import React from 'react';
import { NewsItem } from '../../redux/types';
import { makeStyles } from '@material-ui/core/styles';
import { NewsCard } from './NewsCard';

type PropsTypes = {
  items: Array<NewsItem> | null
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20
  }
})

const NewsGrid: React.FC<PropsTypes> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {props.items?.slice(0, 8).map(item => <NewsCard title={item.title} urlToImage={item.urlToImage} />)}
    </div>
  );
};

export default NewsGrid;