import axios from "axios";
import TvSeries from "../../models/TvSeries"
const getTopRatedTvSeries = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/top_rated",
      {
        params: { language: "en-US" },
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
        tvSerie.poster_path,
      );
    });
    return tvSeries;
  } catch (error) {
    throw new Error("Failed to get the top rated TV Series.");
  }
};

export default getTopRatedTvSeries;
