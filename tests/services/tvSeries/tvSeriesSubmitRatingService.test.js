import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import submitRatingTvSeries from "../../../src/services/TvSeries/TVSeriesSubmitRatingService";

vi.mock("axios");

describe("submitRatingTvSeries", () => {
  const mockTvSeriesId = 123;
  const mockNewValue = 8;
  const mockSessionId = "mockSessionId";
  it("Successfully fetches data", async () => {
    const mockResponse = {
      status: 201,
    };

    axios.post.mockReturnValue(mockResponse);

    const result = await submitRatingTvSeries(
      mockTvSeriesId,
      mockNewValue,
      mockSessionId
    );

    expect(result).toBe(mockNewValue);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.post.mockRejectedValue(new Error("Failed"));

    await expect(
      submitRatingTvSeries(mockTvSeriesId, mockNewValue, mockSessionId)
    ).rejects.toThrow("Failed");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error rating tv series: ",
      expect.any(Error)
    );
  });
});