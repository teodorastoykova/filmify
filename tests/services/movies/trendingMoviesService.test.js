import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import Movie from "../../../src/models/Movie";
import getTrendingMovies from "../../../src/services/Movies/TrendingMoviesService";

vi.mock("axios");

describe("getTopRatedTvSeries", async () => {
  it("Successfully fetches the data", async () => {
    const mockResponse = {
      data: {
        results: [
          { id: 1, title: "Movie 1", poster_path: "/poster1.jpg" },
          { id: 2, title: "Movie 2", poster_path: "/poster2.jpg" },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const movies = await getTrendingMovies();

    expect(movies).toEqual([
      new Movie(1, "Movie 1", undefined, "/poster1.jpg"),
      new Movie(2, "Movie 2", undefined, "/poster2.jpg"),
    ]);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Rejected"));

    await expect(getTrendingMovies()).rejects.toThrow("Rejected");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to get the trending movies",
      expect.any(Error)
    );
  }); 
});
