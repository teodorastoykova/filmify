import axios from "axios";
import Movie from "../../models/Movie";
import TvSeries from "../../models/TvSeries";

const getBrowseResults = async (searchQuery) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi`,
      {
        params: {
          query: searchQuery,
          include_adult: "false",
          language: "en-US",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    const results = response.data.results
    .filter((item) => item.media_type !== 'person')
    .map((item) => {
      if (item.media_type === "movie") {
        return new Movie(
          item.id,
          item.title,
          undefined,
          item.poster_path,
          undefined, 
          undefined, 
          undefined,
          item.media_type
        );
      } else if (item.media_type === "tv") {
        return new TvSeries(
          item.id,
          item.name,
          undefined,
          item.poster_path,
          undefined, 
          undefined, 
          undefined, 
          undefined, 
          undefined,
          item.media_type
        );
      }
    });
    
    return results;
  } catch (error) {
    console.error("Error fetching browse results:", error);
    throw error;
  }
};
export default getBrowseResults;
