import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MoviePoster from "../components/movies/MoviePoster";
import TvSeriesPoster from "../components/tvSeries/TvSeriesPoster";
import useRequireAuth from "../components/common/useRequireAuth";
import { Typography } from "@mui/material";
import getBrowseResults from "../services/Common/BrowseService";

const Browse = () => {
  const sessionId = useRequireAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        try {
          const data = await getBrowseResults(searchQuery);

          const results = data || [];

          const moviesList = results.filter(
            (item) => item.media_type === "movie"
          );
          const tvSeriesList = results.filter(
            (item) => item.media_type === "tv"
          );

          setMovies(moviesList);
          setTvSeries(tvSeriesList);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
    };

    fetchData();
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
