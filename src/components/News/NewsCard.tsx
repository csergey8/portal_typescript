import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type PropsTypes = {
  title: string
  urlToImage: string
}

const useStyles = makeStyles({
  cardContainer: {
    width: 250,
    borderRadius: 3,
    marginBottom: 15,
    overflow: 'hidden',
    boxShadow: `1px 1px 5px 0px rgba(150,150,150,1)`,
    cursor: 'pointer'
  },
  cardImage: {
    height: 150, 
    width: 250,
    objectFit: 'cover',
    
  },
  title: {
    fontSize: 11,
    padding: 12
  }
})

const NewsCard: React.FC<PropsTypes> = ({ title, urlToImage }) => {
  const classes = useStyles();
  const [imgSrc, setImgSrc] = React.useState(urlToImage)
  return (
    <div className={classes.cardContainer}>
      <img src={imgSrc} alt="newsImage" className={classes.cardImage} onError={() => setImgSrc("/assets/news.jpg")} />
      <div className={classes.title}>
      {title}
      </div>
    </div>
  );
};

export { NewsCard };