import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import TvSeries from "../../../src/models/TvSeries";
import getWatchListTvSeries from "../../../src/services/TvSeries/WatchListTvSeriesService";

vi.mock("axios");

describe("getTopRatedTvSeries", async () => {
  it("Successfully fetches the data", async () => {
    const mockResponse = {
      data: {
        results: [
          { id: 1, name: "Tv series 1", poster_path: "/poster1.jpg" },
          { id: 2, name: "Tv series 2", poster_path: "/poster2.jpg" },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const tvSeries = await getWatchListTvSeries();

    expect(tvSeries).toEqual([
      new TvSeries(1, "Tv series 1", undefined, "/poster1.jpg"),
      new TvSeries(2, "Tv series 2", undefined, "/poster2.jpg"),
    ]);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Rejected"));

    await expect(getWatchListTvSeries()).rejects.toThrow("Rejected");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch watch list series: ",
      expect.any(Error)
    );
  });
});
