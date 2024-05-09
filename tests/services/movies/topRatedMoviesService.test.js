import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import Movie from "../../../src/models/Movie";
import getTopRatedMovies from "../../../src/services/Movies/TopRatedMoviesService";

vi.mock("axios");

describe("getTopRatedMovies", () => {
  it("Successfully fetches data", async () => {
    const mockResponse = {
      data: {
        results: [
          { id: 1, title: "Movie 1", poster_path: "/poster1.jpg" },
          { id: 2, title: "Movie 2", poster_path: "/poster2.jpg" },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const movies = await getTopRatedMovies();

    expect(movies).toEqual([
      new Movie(1, "Movie 1", undefined, "/poster1.jpg"),
      new Movie(2, "Movie 2", undefined, "/poster2.jpg"),
    ]);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Request failed"));

    await expect(getTopRatedMovies()).rejects.toThrow("Request failed");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching top rated movies:",
      expect.any(Error) 
    );
  });
});
