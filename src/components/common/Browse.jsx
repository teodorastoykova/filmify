import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import MoviePoster from "../movies/MoviePoster";
import TvSeriesPoster from "../tvSeries/TvSeriesPoster";
import useRequireAuth from "./useRequireAuth";
import { Typography } from "@mui/material";

const Browse = () => {
  const sessionId = useRequireAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/multi",
        params: {
          query: searchQuery,
          include_adult: "false",
          language: "en-US",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);

          const results = response.data.results || [];
          setSearchResults(results);

          const moviesList = results.filter(
            (item) => item.media_type === "movie"
          );
          const tvSeriesList = results.filter(
            (item) => item.media_type === "tv"
          );

          setMovies(moviesList);
          setTvSeries(tvSeriesList);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handleTvSeriesClick = (tvSeries) => {
    navigate(`/series/${tvSeries.id}`);
  };
  return sessionId ? (
    <>
      <Header />
      <Typography variant="h2" gutterBottom>
        Search Results For {searchQuery}
      </Typography>
      <Typography variant="h3" gutterBottom>
        Movies
      </Typography>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />

      <Typography variant="h3" gutterBottom>
        TV Series
      </Typography>
      <TvSeriesPoster
        tvSeries={tvSeries}
        onTvSeriesClick={handleTvSeriesClick}
      />
    </>
  ) : null;
};

export default Browse;
