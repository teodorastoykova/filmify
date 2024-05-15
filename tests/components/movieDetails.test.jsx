import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import MovieDetails from "../../src/components/movies/MovieDetails";
import * as getMovieDetails from "../../src/services/Movies/MovieDetailsService";
import * as getUserRating from "../../src/services/Movies/MovieRatingService";
import * as submitRatingMovie from "../../src/services/Movies/MovieSubmitRatingService";
import * as addToWatchList from "../../src/services/Common/AddToWatchListService";
import * as router from "react-router";

describe("MovieDetails component", () => {
  const mockGetMovieDetails = vi.fn();
  const mockGetUserRating = vi.fn();
  const mockSubmitRatingMovie = vi.fn();
  const mockAddToWatchList = vi.fn();
  const mockUseParams = vi.fn();

  beforeEach(() => {
    vi.spyOn(getMovieDetails, "default").mockImplementation(
      mockGetMovieDetails
    );
    vi.spyOn(getUserRating, "default").mockImplementation(mockGetUserRating);
    vi.spyOn(submitRatingMovie, "default").mockImplementation(
      mockSubmitRatingMovie
    );
    vi.spyOn(addToWatchList, "default").mockImplementation(mockAddToWatchList);
    vi.spyOn(router, "useParams").mockImplementation(mockUseParams);
  });

  const mockMovieDetails = {
    id: 1,
    title: "Mock Movie",
    posterPath: "/mock-poster.jpg",
    overview: "Mock overview",
    releaseDate: "2022-01-01",
    voteAverage: 7.5,
    productionCompanies: [
      { id: "1", name: "Mock Production Company", logo_path: "/mock-logo.jpg" },
    ],
  };
  const mockUserRating = 7;

  it("Renders all properties", async () => {
    mockGetMovieDetails.mockResolvedValue(mockMovieDetails);
    mockGetUserRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue(1);
    render(
      <MemoryRouter initialEntries={[`/movies/${mockMovieDetails.id}`]}>
        <MovieDetails />
      </MemoryRouter>
    );

    await vi.waitFor(() => {
      expect(screen.getByText("Mock Movie")).toBeInTheDocument();
      expect(screen.getByText("Mock overview")).toBeInTheDocument();
      expect(screen.getByText("Release Date: 2022-01-01")).toBeInTheDocument();
      expect(screen.getByText("Rating: 7.50")).toBeInTheDocument();
    });
  });

  it("Adds movie to watchlist when the add button is clicked", async () => {
    mockGetMovieDetails.mockResolvedValue(mockMovieDetails);
    mockGetUserRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue(1);
    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      expect(screen.getByText("Mock Movie")).toBeInTheDocument();
      expect(screen.getByText("Mock overview")).toBeInTheDocument();
      expect(screen.getByText("Release Date: 2022-01-01")).toBeInTheDocument();
      expect(screen.getByText("Rating: 7.50")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("add-to-watchlist-button"));
    expect(mockAddToWatchList).toHaveBeenCalled();
  });

  it("Submits a rating from the user", async () => {
    mockGetMovieDetails.mockResolvedValue(mockMovieDetails);
    mockGetUserRating.mockResolvedValue(mockUserRating);
    mockUseParams.mockResolvedValue(1);

    render(
      <MemoryRouter initialEntries={[`/movies/${mockMovieDetails.id}`]}>
        <MovieDetails />
      </MemoryRouter>
    );

    const ratingInput = screen.getByLabelText('5 Hearts');

    fireEvent.click(ratingInput);
  

    await vi.waitFor(() => {
      expect(mockSubmitRatingMovie).toHaveBeenCalled();
    });
  });
});
