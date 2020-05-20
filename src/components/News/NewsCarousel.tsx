import React from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { NewsItem } from '../../redux/types';
import { NewsCarouselItem } from './NewsCarouselItem';

type PropsTypes = {
  items: Array<NewsItem> | null
}
const NewsCarousel: React.FC<PropsTypes> = (props) => {
  return (
    <div style={{ width: 600 }}>
    <Carousel infinite rtl dots autoPlay={4000} centered itemWidth={600}>
      {props.items?.map(item => <NewsCarouselItem title={item.title} urlToImage={item.urlToImage}/>)}
    </Carousel>
    </div>
  );
};

export { NewsCarousel };