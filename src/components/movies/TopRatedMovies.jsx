import { useEffect, useState } from "react";
import axios from "axios";
import MoviePoster from "./MoviePoster";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import useRequireAuth from "../common/useRequireAuth";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const sessionId = useRequireAuth();
  
  useEffect(() => {
    if (sessionId) {
    const topRatedMoviesResponse = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
    };

    axios
      .request(topRatedMoviesResponse)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      navigate('/login')
    }
  }, [navigate, sessionId]);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <>
      <Header />
      <h1>Top Rated Movies</h1>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />
    </>
  );
};

export default TopRatedMovies;
