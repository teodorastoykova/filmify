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
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import StyledRating from "../common/StyledRating";
import useRequireAuth from "../common/useRequireAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import submitRatingTvSeries from "../../services/TvSeries/TVSeriesSubmitRatingService";
import getTvSeriesDetails from "../../services/TvSeries/TvSeriesDetailsService";
import getTvSeriesRating from "../../services/TvSeries/TvSeriesRatingService";
import addToWatchList from "../../services/Common/AddToWatchListService";

const TvSeriesDetails = () => {
  const { seriesId } = useParams();
  const [tvSeries, setTvSeries] = useState([]);
  const [tvSeriesRating, setTvSeriesRating] = useState(0);
  const sessionId = useRequireAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvSeriesDetails = await getTvSeriesDetails(seriesId);
        setTvSeries(tvSeriesDetails);

        const userRating = await getTvSeriesRating(sessionId, seriesId);
        setTvSeriesRating(userRating);
      } catch (error) {
        console.error("Erro", error);
      }
    };
    fetchData();
  }, [seriesId, sessionId]);

  const handleRateClick = async (newValue) => {
    console.log("rate");
    submitRatingTvSeries(seriesId, newValue, sessionId);
    setTvSeriesRating(newValue);
  };

  const handleAddToWatchListClick = () => {
    console.log("add");
    addToWatchList("tv", seriesId);
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
          image={`https://image.tmdb.org/t/p/w500${tvSeries.posterPath}`}
          alt={tvSeries.title}
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
              {tvSeries.title}
            </Typography>
            <IconButton data-testid="add-to-watchlist-button" onClick={handleAddToWatchListClick}>
              <AddIcon />
            </IconButton>
          </Box>

          <Typography variant="h6">
            Rate:
            <StyledRating
              value={tvSeriesRating || 0}
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
            {tvSeries.overview}
          </Typography>
          <Typography variant="body2" gutterBottom>
            First Air Date: {tvSeries.releaseDate}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Rating: {parseFloat(tvSeries.voteAverage).toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Seasons: {tvSeries.seasons} Episodes:{" "}
            {tvSeries.episodes}
          </Typography>
          <Typography>
            Produced by:{" "}
            {tvSeries && tvSeries.productionCompanies ? (
              tvSeries.productionCompanies.map((company) => (
                <span key={company.id}>
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      style={{ width: "50px", marginRight: "5px" }}
                    />
                  )}
                </span>
              ))
            ) : (
              <span>N?/A</span>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default TvSeriesDetails;
