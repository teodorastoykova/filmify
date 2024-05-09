import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import getMovieDetails from "../../../src/services/Movies/MovieDetailsService";

vi.mock("axios");

describe("getMovieDetails", () => {
  const mockMovie = {
    id: 1,
    title: "Test Movie",
    overview: "This is a test movie",
    poster_path: "/test_poster.jpg",
    release_date: "2022-01-01",
    vote_average: 8.5,
    production_companies: [
      { id: 1, name: "Company A" },
      { id: 2, name: "Company B" },
    ],
  };

  const movieId = 1;

  it("Succeeds fetching data", async () => {
    const promise = Promise.resolve({
      data: mockMovie,
    });
    axios.get.mockImplementation(() => promise);

    const movie = await getMovieDetails(movieId);

    expect(movie.id).toBe(1);
    expect(movie.title).toBe("Test Movie");
    expect(movie.overview).toBe("This is a test movie");
    expect(movie.posterPath).toBe("/test_poster.jpg");
    expect(movie.releaseDate).toBe("2022-01-01");
    expect(movie.voteAverage).toBe(8.5);
    expect(movie.productionCompanies.length).toBe(2);
    expect(movie.productionCompanies[0].name).toBe("Company A");
    expect(movie.productionCompanies[1].name).toBe("Company B");
  });

  it("Fails to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Request failed"));

    await expect(getMovieDetails(1)).rejects.toThrow("Request failed");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching movie details:",
      expect.any(Error)
    );
  });
});
