import axios from "axios";

const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching top rated movies:", error);
  }
};

export default getTopRatedMovies;
