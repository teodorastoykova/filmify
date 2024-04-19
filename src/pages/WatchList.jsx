import { Typography } from "@mui/material";
import Header from "../components/common/Header";
import MoviePoster from "../components/movies/MoviePoster";
import TvSeriesPoster from "../components/tvSeries/TvSeriesPoster";
import { useEffect, useState } from "react";
import useRequireAuth from "../components/common/useRequireAuth";
import getWatchListMovies from "../services/Movies/WatchListMoviesService";
import getWatchListTvSeries from "../services/TvSeries/WatchListTvSeriesService";
import { useNavigate } from "react-router-dom";

function WatchList() {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const sessionId = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      const fetchWatchListData = async () => {
        try {
          const watchListMoviesResponse = await getWatchListMovies();
          const watchListTvSeriesResponse = await getWatchListTvSeries();
          setMovies(watchListMoviesResponse);
          setTvSeries(watchListTvSeriesResponse);
        } catch (error) {
          console.error("Error fetching watch lists data:", error);
        }
      };
      fetchWatchListData();
    } else {
      navigate("/login");
    }
  }, [navigate, sessionId]);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handleTvSeriesClick = (tvSeries) => {
    navigate(`/series/${tvSeries.id}`);
  };

  return sessionId ? (
    <>
      <Header />
      {movies.length === 0 && tvSeries.length === 0 ? (
        <Typography variant="body1">
          You have not added any Movies or TV series to your watch list.
        </Typography>
      ) : (
        <>
          {movies.length > 0 && (
            <>
              <Typography variant="h3" gutterBottom>
                Watch List Movies
              </Typography>
              <MoviePoster
                movies={movies}
                onMovieClick={handleMovieClick}
              ></MoviePoster>
            </>
          )}

          {tvSeries.length > 0 && (
            <>
              <Typography variant="h3" gutterBottom>
                Watch List TV Series
              </Typography>
              <TvSeriesPoster
                tvSeries={tvSeries}
                onTvSeriesClick={handleTvSeriesClick}
              ></TvSeriesPoster>
            </>
          )}
        </>
      )}
    </>
  ) : null;
}
export default WatchList;
