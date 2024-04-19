import axios from "axios";
import TvSeries from "../../models/TvSeries"

const getTvSeriesDetails = async (seriesId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}`,
    {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
    }
  );
  const tvSeries = new TvSeries(
    response.data.id,
    response.data.name,
    response.data.overview,
    response.data.poster_path,
    response.data.first_air_date,
    response.data.vote_average,
    response.data.number_of_seasons,
    response.data.number_of_episodes,
    response.data.production_companies,
  )
  return tvSeries;
};

export default getTvSeriesDetails;
