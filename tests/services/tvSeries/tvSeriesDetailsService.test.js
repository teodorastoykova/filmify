import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import getTvSeriesDetails from "../../../src/services/TvSeries/TvSeriesDetailsService";

vi.mock("axios");

describe("getTvSeriesDetails", async () => {
  it("Fetches data successfully", async () => {
    const mockTvSeries = {
      id: 1,
      name: "Test Tv Series",
      overview: "This is a test tv series",
      poster_path: "/test_poster.jpg",
      first_air_date: "2022-01-01",
      vote_average: 8.5,
      number_of_seasons: 5,
      number_of_episodes: 100,
      production_companies: [
        { id: 1, name: "Company A" },
        { id: 2, name: "Company B" },
      ],
    };

    const promise = Promise.resolve({
      data: mockTvSeries,
    });
    axios.get.mockImplementation(() => promise);

    const tvSeries = await getTvSeriesDetails(mockTvSeries.id);

    expect(tvSeries.id).toBe(1);
    expect(tvSeries.title).toBe("Test Tv Series");
    expect(tvSeries.overview).toBe("This is a test tv series");
    expect(tvSeries.posterPath).toBe("/test_poster.jpg");
    expect(tvSeries.releaseDate).toBe("2022-01-01");
    expect(tvSeries.voteAverage).toBe(8.5);
    expect(tvSeries.seasons).toBe(5);
    expect(tvSeries.episodes).toBe(100);
    expect(tvSeries.productionCompanies[0].name).toBe("Company A");
    expect(tvSeries.productionCompanies[1].name).toBe("Company B");
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Request denied"));

    await expect(getTvSeriesDetails(1)).rejects.toThrow("Request denied");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch this tv series:",
      expect.any(Error)
    );
  });
});
