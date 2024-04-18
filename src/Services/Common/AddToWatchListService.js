import axios from "axios";

const addToWatchList = async (mediaType, mediaId) => {
  try {
    const response = await axios.post(
      "https://api.themoviedb.org/3/account/21198834/watchlist",
      { media_type: mediaType, media_id: mediaId, watchlist: true },
      {
        params: {session_id: localStorage.getItem('sessionId')},
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    return response
  } catch (error) {
    throw new Error("Failed to add this movie/series to watch list");
  }
};

export default addToWatchList;
