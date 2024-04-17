/* eslint-disable react/prop-types */
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const TvSeriesPoster = ({ tvSeries, onTvSeriesClick }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(startIndex - 4);
  };

  const handleNext = () => {
    setStartIndex(startIndex + 4);
  };

  return(
    <>
      <Grid container>
        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
          <NavigateBeforeIcon />
        </IconButton>
        <Grid container spacing={2} className="movie-grid">
          {tvSeries.slice(startIndex, startIndex + 4).map((tvSeries) => (
            <Grid item key={tvSeries.id} xs={12} sm={6} md={3}>
              <Card onClick={() => onTvSeriesClick(tvSeries)}>
                <CardMedia
                  component="img"
                  height="400"
                  image={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                  alt={tvSeries.name}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <IconButton onClick={handleNext} disabled={startIndex + 4 >= tvSeries.length}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default TvSeriesPoster;
