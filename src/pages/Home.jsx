/* eslint-disable react/prop-types */
import "../App.css";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import MoviePoster from "../components/movies/MoviePoster";
import TvSeriesPoster from "../components/tvSeries/TvSeriesPoster";
import { useNavigate } from "react-router";
import useRequireAuth from "../components/common/useRequireAuth";
import { Typography } from "@mui/material";
import getTrendingMovies from "../services/Movies/TrendingMoviesService";
import getTrendingTvSeries from "../services/TvSeries/TrendingTvSeriesService";

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    if (sessionId) {
      const fetchTrendingData = async () => {
        try {
          const trendingMoviesResponse = await getTrendingMovies();
          const trendingTvResponse = await getTrendingTvSeries();
          setMovies(trendingMoviesResponse);
          setTvSeries(trendingTvResponse);
        } catch (error) {
          console.error("Error fetching trending data:", error);
        }
      };
      fetchTrendingData();
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
      <Typography variant="h3" gutterBottom>
        Trending Movies
      </Typography>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />
      <Typography variant="h3" gutterBottom>
        Trending TV Series
      </Typography>
      <TvSeriesPoster
        tvSeries={tvSeries}
        onTvSeriesClick={handleTvSeriesClick}
      />
    </>
  ) : null;
}

export default Home;
