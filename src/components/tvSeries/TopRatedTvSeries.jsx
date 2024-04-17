import { useEffect, useState } from "react";
import Header from "../common/Header";
import TvSeriesPoster from "./TvSeriesPoster";
import axios from "axios";
import { useNavigate } from "react-router";
import useRequireAuth from "../common/useRequireAuth";

const TopRatedTvSeries = () => {
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();
  const sessionId = useRequireAuth();

  useEffect(() => {
    if (sessionId){
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/top_rated",
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
        setSeries(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      navigate('/login')
    }
  }, [navigate, sessionId]);

  const handleTvSeriesClick = (tvSeries) => {
    navigate(`/series/${tvSeries.id}`);
  };

  return (
    <>
      <Header />
      <h1>Top Rated TV Series</h1>
      <TvSeriesPoster tvSeries={series} onTvSeriesClick={handleTvSeriesClick}/>
    </>
  );
};

export default TopRatedTvSeries;
