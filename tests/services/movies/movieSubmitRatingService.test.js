import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import submitRatingMovie from "../../../src/services/Movies/MovieSubmitRatingService";

vi.mock("axios");

describe("submitRatingMovie", () => {
  const mockMovieId = 123;
  const mockNewValue = 8;
  const mockSessionId = "mockSessionId";
  it("Successfully fetches data", async () => {
    const mockResponse = {
      status: 201,
    };

    axios.post.mockReturnValue(mockResponse);

    const result = await submitRatingMovie(
      mockMovieId,
      mockNewValue,
      mockSessionId
    );

    expect(result).toBe(mockNewValue);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.post.mockRejectedValue(new Error("Error submitting your rating"));

    await expect(
      submitRatingMovie(mockMovieId, mockNewValue, mockSessionId)
    ).rejects.toThrow("Error submitting your rating");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error rating movie:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
