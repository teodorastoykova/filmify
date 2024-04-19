import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequireAuth from "../components/common/useRequireAuth";
import getTopRatedMovies from "../services/Movies/TopRatedMoviesService";
import getTopRatedTvSeries from "../services/TvSeries/TopRatedTvSeriesService";
import TvSeriesPoster from "../components/tvSeries/TvSeriesPoster";
import Header from "../components/common/Header";
import MoviePoster from "../components/movies/MoviePoster";

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    const fetchTopRatedData = async () => {
      try {
        if (sessionId) {
          const topRatedMovies = await getTopRatedMovies();
          setMovies(topRatedMovies);
          const topRatedTvSeries = await getTopRatedTvSeries();
          setSeries(topRatedTvSeries);
        } else {
          navigate("login");
          return;
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTopRatedData();
  }, [navigate, sessionId]);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handleTvSeriesClick = (tvSeries) => {
    navigate(`/series/${tvSeries.id}`);
  };

  return (
    <>
      <Header />
      <Typography variant="h3" gutterBottom>
        Top Rated Movies
      </Typography>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />
      <Typography variant="h3" gutterBottom>
        Top Rated TV Series
      </Typography>
      <TvSeriesPoster tvSeries={series} onTvSeriesClick={handleTvSeriesClick} />
    </>
  );
}

export default TopRated;
