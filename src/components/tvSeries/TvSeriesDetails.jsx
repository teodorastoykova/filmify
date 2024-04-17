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
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import StyledRating from "../common/StyledRating";
import useRequireAuth from "../common/useRequireAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const TvSeriesDetails = () => {
  const { seriesId } = useParams();
  const [tvSeries, setTvSeries] = useState([]);
  const [tvSeriesRating, setTvSeriesRating] = useState(0);
  const sessionId = useRequireAuth();

  useEffect(()=> {

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/account/21198834/rated/tv',
      params: {language: 'en-US', session_id: sessionId, sort_by: 'created_at.asc'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        for (const currTvSeries of response.data.results) {
          if (currTvSeries.id == seriesId) {
            console.log(`Rating: ${currTvSeries.rating}`);
            setTvSeriesRating(currTvSeries.rating);
            break;
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [seriesId, sessionId])

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${seriesId}`,
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
        setTvSeries(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [seriesId]);

  const handleRateClick = async (newValue) => {
    try {
      await axios.post(
        `https://api.themoviedb.org/3/tv/${seriesId}/rating`,
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
      console.log("Tv Series rating updated: " + newValue);
      setTvSeriesRating(newValue);
    } catch (error) {
      console.error("Error rating tv series: ", error);
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
          image={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
          alt={tvSeries.name}
        />
        <CardContent style={{ padding: "16px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {tvSeries.name}
          </Typography>
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
            First Air Date: {tvSeries.first_air_date}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Rating: {parseFloat(tvSeries.vote_average).toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Seasons: {tvSeries.number_of_seasons} Episodes:{" "}
            {tvSeries.number_of_episodes}
          </Typography>
          <Typography>
            Produced by:{" "}
            {tvSeries && tvSeries.production_companies ? (
              tvSeries.production_companies.map((company) => (
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
