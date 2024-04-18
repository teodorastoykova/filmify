import axios from "axios";

const getSessionId = async () => {
  try {
    const response = await axios.post(
      "https://api.themoviedb.org/3/authentication/session/new",
      { request_token: localStorage.getItem("request_token") },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
        },
      }
    );
    return response.data.session_id;
  } catch (error) {
    throw new Error("Error generating session id.");
  }
};

export default getSessionId;
