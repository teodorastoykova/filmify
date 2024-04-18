import axios from "axios";

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
    return response.data.results
  } catch (error) {
    throw new Error("Failed to fetch watch list series: ", error);
  }
};
export default getWatchListTvSeries;
