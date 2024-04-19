import axios from "axios";
import Movie from "../../models/Movie";

const getMovieDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
    }
  );

  const movie = new Movie(
    response.data.id,
    response.data.title,
    response.data.overview,
    response.data.poster_path,
    response.data.release_date,
    response.data.vote_average,
    response.data.production_companies
  );
  return movie
};

export default getMovieDetails;
