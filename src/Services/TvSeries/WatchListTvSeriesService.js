import axios from "axios";
import TvSeries from "../../models/TvSeries";

const getWatchListTvSeries = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/account/21198834/watchlist/tv",
      {
        params: {
          language: "en-US",
          page: "1",
          session_id: localStorage.getItem("sessionId"),
          sort_by: "created_at.asc",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    const tvSeries = response.data.results.map((tvSerie) => {
      return new TvSeries(
        tvSerie.id,
        tvSerie.name,
        undefined,
        tvSerie.poster_path
      );
    });
    return tvSeries;
  } catch (error) {
    console.error("Failed to fetch watch list series: ", error);
    throw error;
  }
};
export default getWatchListTvSeries;
