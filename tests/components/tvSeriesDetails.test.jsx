import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import TvSeriesDetails from "../../src/components/tvSeries/TvSeriesDetails";
import * as getTvSeriesDetails from "../../src/services/TvSeries/TvSeriesDetailsService";
import * as getTvSeriesRating from "../../src/services/TvSeries/TvSeriesRatingService";
import * as submitRatingTvSeries from "../../src/services/TvSeries/TVSeriesSubmitRatingService";
import * as addToWatchList from "../../src/services/Common/AddToWatchListService";
import * as router from "react-router";

describe("TvSeriesDetails component", () => {
  const mockGetTvSeriesDetails = vi.fn();
  const mockGetTvSeriesRating = vi.fn();
  const mockSubmitRatingTvSeries = vi.fn();
  const mockAddToWatchList = vi.fn();
  const mockUseParams = vi.fn();

  beforeEach(() => {
    vi.spyOn(getTvSeriesDetails, "default").mockImplementation(
      mockGetTvSeriesDetails
    );
    vi.spyOn(getTvSeriesRating, "default").mockImplementation(
      mockGetTvSeriesRating
    );
    vi.spyOn(submitRatingTvSeries, "default").mockImplementation(
      mockSubmitRatingTvSeries
    );
    vi.spyOn(addToWatchList, "default").mockImplementation(mockAddToWatchList);
    vi.spyOn(router, "useParams").mockImplementation(mockUseParams);
  });

  const mockTvSeriesDetails = {
    id: 1,
    title: "Mock Tv Series",
    posterPath: "/mock-poster.jpg",
    overview: "Mock overview",
    releaseDate: "2022-01-01",
    voteAverage: 7.5,
    seasons: 9,
    episodes: 90,
    productionCompanies: [
      { id: "1", name: "Mock Production Company", logo_path: "/mock-logo.jpg" },
    ],
  };
  const mockUserRating = 7;

  it("Renders all properties", async () => {
    mockGetTvSeriesDetails.mockResolvedValue(mockTvSeriesDetails);
    mockGetTvSeriesRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue(1);

    render(
      <MemoryRouter initialEntries={[`/movies/${mockTvSeriesDetails.id}`]}>
        <TvSeriesDetails />
      </MemoryRouter>
    );

    await vi.waitFor(() => {
      expect(screen.getByText("Mock Tv Series")).toBeInTheDocument();
      expect(screen.getByText("Mock overview")).toBeInTheDocument();
      expect(
        screen.getByText("First Air Date: 2022-01-01")
      ).toBeInTheDocument();
      expect(screen.getByText("Rating: 7.50")).toBeInTheDocument();
      expect(screen.getByText("Seasons: 9 Episodes: 90")).toBeInTheDocument();
    });
  });
  it("Adds tv series to watchlist when the add button is clicked", async () => {
    mockGetTvSeriesDetails.mockResolvedValue(mockTvSeriesDetails);
    mockGetTvSeriesRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue();

    render(
      <MemoryRouter>
        <TvSeriesDetails />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      expect(screen.getByText("Mock Tv Series")).toBeInTheDocument();
      expect(screen.getByText("Mock overview")).toBeInTheDocument();
      expect(screen.getByText("First Air Date: 2022-01-01")).toBeInTheDocument();
      expect(screen.getByText("Rating: 7.50")).toBeInTheDocument();
      expect(screen.getByText("Seasons: 9 Episodes: 90")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("add-to-watchlist-button"));
    expect(mockAddToWatchList).toHaveBeenCalled();
  });

  it("Submits a rating from the user", async () => {
    mockGetTvSeriesDetails.mockResolvedValue(mockTvSeriesDetails);
    mockGetTvSeriesRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue(1);

    render(
      <MemoryRouter initialEntries={[`/movies/${mockTvSeriesDetails.id}`]}>
        <TvSeriesDetails />
      </MemoryRouter>
    );

    const ratingInput = screen.getByLabelText('5 Hearts');

    fireEvent.click(ratingInput);

    await vi.waitFor(() => {
      expect(mockSubmitRatingTvSeries).toHaveBeenCalled();
    });
  });
});
