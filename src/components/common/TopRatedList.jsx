import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequireAuth from "./useRequireAuth";
import getTopRatedMovies from "../../Services/Movies/TopRatedMoviesService";
import getTopRatedTvSeries from "../../Services/TvSeries/TopRatedTvSeriesService";
import TvSeriesPoster from "../tvSeries/TvSeriesPoster";
import Header from "./Header";
import MoviePoster from "../movies/MoviePoster";

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
