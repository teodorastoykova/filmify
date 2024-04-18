import { useEffect, useState } from "react";
import MoviePoster from "./MoviePoster";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import useRequireAuth from "../common/useRequireAuth";
import { Typography } from "@mui/material";
import getTopRatedMovies from "../../Services/Movies/TopRatedMoviesService";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        if (sessionId) {
          const topRatedMovies = await getTopRatedMovies();
          setMovies(topRatedMovies);
        } else {
          navigate("login");
          return;
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTopRatedMovies();
  }, [navigate, sessionId]);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <>
      <Header />
      <Typography variant="h3" gutterBottom>
        Top Rated Movies
      </Typography>
      <MoviePoster movies={movies} onMovieClick={handleMovieClick} />
    </>
  );
};

export default TopRatedMovies;
