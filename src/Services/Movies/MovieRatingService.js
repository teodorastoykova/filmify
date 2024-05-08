import axios from "axios";

const getUserRating = async (sessionId, movieId) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/account/21198834/rated/movies",
      {
        params: {
          language: "en-US",
          session_id: sessionId,
          sort_by: "created_at.asc",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    const rating = response.data.results.find(
      (currMovie) => currMovie.id === parseInt(movieId)
    );
    return rating ? rating.rating : 0;
  } catch (error) {
    console.error("Error fetching movie rating:", error);
    throw error;
  }
};

export default getUserRating;
