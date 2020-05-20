import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type PropsTypes = {
  title: string
  urlToImage: string
}

const NewsCarouselItem: React.FC<PropsTypes> = ({ title, urlToImage }) => {
  const useStyles = makeStyles({
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: `url(${urlToImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 300,
      '&:before': {
        content: `""`,
        display: 'block',
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }
    },
    title: {
      fontSize: 18,
      color: '#fff',
      zIndex: 2,
    }
  })

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
      {title}
      </div>
    </div>
  );
};

export { NewsCarouselItem };