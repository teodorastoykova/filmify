/* eslint-disable react/prop-types */
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import MoviePoster from "../movies/MoviePoster";
import TvSeriesPoster from "../tvSeries/TvSeriesPoster";
import { useNavigate } from "react-router";
import useRequireAuth from "./useRequireAuth";

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    if (sessionId) {
      const fetchTrendingData = async () => {
        try {
          const trendingMoviesResponse = await axios.get(
            "https://api.themoviedb.org/3/trending/movie/day",
            {
              params: { language: "en-US" },
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
              },
            }
          );

          const trendingTvResponse = await axios.get(
            "https://api.themoviedb.org/3/trending/tv/day",
            {
              params: { language: "en-US" },
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
              },
            }
          );
          setMovies(trendingMoviesResponse.data.results);
          setTvSeries(trendingTvResponse.data.results);
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
    <div className="app-container">
      <Header />

      <h1>Trending Movies</h1>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />

      <h1>Trending TV Series</h1>
      <TvSeriesPoster
        tvSeries={tvSeries}
        onTvSeriesClick={handleTvSeriesClick}
      />
    </div>
  ) : null;
}

export default Home;
