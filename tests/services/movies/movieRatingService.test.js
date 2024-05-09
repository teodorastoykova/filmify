import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import getUserRating from "../../../src/services/Movies/MovieRatingService";

vi.mock("axios");

describe("getUserRating", () => {
  const mockSessionId = "mock session id";
  const mockMovieId = 1239146;
  
  it("Successfully fetches data", async () => {
    const mockResponse = {
      data: {
        results: [
          { id: 1239146, rating: 7 },
          { id: 438631, rating: 8 },
          { id: 1019317, rating: 6 },
        ],
      },
    };

    axios.get.mockReturnValue(mockResponse);
    const rating = await getUserRating(mockSessionId, mockMovieId);

    expect(rating).toBe(7);
  });
  it("Failes to fetch data", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Request failed"));

    await expect(getUserRating(mockSessionId, mockMovieId)).rejects.toThrow(
      "Request failed"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching movie rating:",
      expect.any(Error)
    );
  });
});
