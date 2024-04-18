import { useEffect, useState } from "react";
import Header from "../common/Header";
import TvSeriesPoster from "./TvSeriesPoster";
import { useNavigate } from "react-router";
import useRequireAuth from "../common/useRequireAuth";
import { Typography } from "@mui/material";
import getTopRatedTvSeries from "../../Services/TvSeries/TopRatedTvSeriesService";
const TopRatedTvSeries = () => {
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    const fetchTopRatedTvSeries = async () => {
      try {
        if (sessionId) {
          const topRatedTvSeries = await getTopRatedTvSeries();
          setSeries(topRatedTvSeries);
        } else {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTopRatedTvSeries();
  }, [navigate, sessionId]);

  const handleTvSeriesClick = (tvSeries) => {
    navigate(`/series/${tvSeries.id}`);
  };

  return (
    <>
      <Header />
      <Typography variant="h3" gutterBottom>
        Top Rated TV Series
      </Typography>
      <TvSeriesPoster tvSeries={series} onTvSeriesClick={handleTvSeriesClick} />
    </>
  );
};

export default TopRatedTvSeries;
