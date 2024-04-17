import axios from "axios";

const submitRatingMovie = async (movieId, newValue, sessionId) => {
  try {
    await axios.post(
      `https://api.themoviedb.org/3/movie/${movieId}/rating`,
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
    console.log("Movie rating updated: " + newValue);
    return newValue;
  } catch (error) {
    console.error("Error rating movie:", error);
  }
};
export default submitRatingMovie;
