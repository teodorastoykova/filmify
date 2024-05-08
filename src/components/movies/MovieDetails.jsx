/* eslint-disable react/prop-types */
import {
  IconButton,
  Typography,
  Dialog,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import useRequireAuth from "../common/useRequireAuth";
import StyledRating from "../common/StyledRating";
import submitRatingMovie from "../../services/Movies/MovieSubmitRatingService";
import getUserRating from "../../services/Movies/MovieRatingService";
import getMovieDetails from "../../services/Movies/MovieDetailsService";
import addToWatchList from "../../services/Common/AddToWatchListService";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieRating, setMovieRating] = useState(0);
  const sessionId = useRequireAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);

        const userRating = await getUserRating(sessionId, movieId);
        setMovieRating(userRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [movieId, sessionId]);

  const handleRateClick = (newValue) => {
    console.log("rate");
    submitRatingMovie(movieId, newValue, sessionId);
    setMovieRating(newValue);
  };

  const handleAddToWatchListClick = () => {
    console.log("add");
    addToWatchList("movie", movieId);
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
          image={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={movie.title}
        />
        <CardContent style={{ padding: "16px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <IconButton data-testid="add-to-watchlist-button" onClick={handleAddToWatchListClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">
            Rate:
            <StyledRating data-testid="rate-button"
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
            Release Date: {movie.releaseDate}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Rating: {parseFloat(movie.voteAverage).toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Produced by:{" "}
            {movie && movie.productionCompanies ? (
              movie.productionCompanies.map((company) => (
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
