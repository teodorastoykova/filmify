/* eslint-disable react/prop-types */
import {
  IconButton,
  Typography,
  Dialog,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useRequireAuth from "../common/useRequireAuth";
import StyledRating from "../common/StyledRating";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieRating, setMovieRating] = useState(0);
  const sessionId = useRequireAuth();

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/account/21198834/rated/movies',
      params: {language: 'en-US', session_id: sessionId, sort_by: 'created_at.asc'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        for (const currmovie of response.data.results) {
          if (currmovie.id == movieId) {
            console.log(`Rating: ${currmovie.rating}`);
            setMovieRating(currmovie.rating);
            break;
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [movieId, sessionId]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovie(response.data);
      })
      .catch(function (error) {
        console.error("Error 2" + error);
      });
  }, [movieId]);

  const handleRateClick = async (newValue) => {
    try {
      await axios.post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating`,
        { value: newValue },
        {
          params: { session_id: sessionId },
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
          },
        }
      );
      console.log("Movie rating updated: " + newValue);
      setMovieRating(newValue);
    } catch (error) {
      console.error("Error rating movie:", error);
    }
  };

  return (
    <Dialog open={true} maxWidth="md">
      <Card
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        sx={{ maxWidth: 345 }}
      >
        <IconButton
          onClick={() => window.history.back()}
          style={{ position: "absolute", right: 0, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent style={{ padding: "16px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="h6">
            Rate:
            <StyledRating
              value={movieRating || 0}
              onChange={(event, newValue) => {
                handleRateClick(newValue);
              }}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.5}
              max={10}
              icon={<FavoriteIcon />}
              emptyIcon={<FavoriteBorderIcon />}
            />
          </Typography>
          <Typography variant="body2" gutterBottom>
            {movie.overview}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Rating: {parseFloat(movie.vote_average).toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Produced by:{" "}
            {movie && movie.production_companies ? (
              movie.production_companies.map((company) => (
                <span key={company.id}>
                  {" "}
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      style={{ width: "100px", marginRight: "5px" }}
                    />
                  )}{" "}
                </span>
              ))
            ) : (
              <span>N/A</span>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default MovieDetails;
