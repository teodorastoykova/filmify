import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/pages/Home";
import * as getTrendingMovies from "../../src/services/Movies/TrendingMoviesService";
import * as getTrendingTvSeries from "../../src/services/TvSeries/TrendingTvSeriesService";
import * as useRequireAuth from "../../src/components/common/useRequireAuth";
import * as router from "react-router";

describe("Home page", () => {
  const mockGetTrendingMovies = vi.fn();
  const mockGetTrendingTvSeries = vi.fn();
  const mockUseRequireAuth = vi.fn();
  const mockUseNavigate = vi.fn();

  const mockedMovies = [
    { id: 1, title: "Movie 1", posterPath: "/poster1.jpg" },
    { id: 2, title: "Movie 2", posterPath: "/poster2.jpg" },
    { id: 3, title: "Movie 3", posterPath: "/poster3.jpg" },
    { id: 4, title: "Movie 4", posterPath: "/poster4.jpg" },
    { id: 5, title: "Movie 5", posterPath: "/poster5.jpg" },
    { id: 6, title: "Movie 6", posterPath: "/poster6.jpg" },
  ];

  const mockedTvSeries = [
    { id: 1, title: "TvSeries 1", posterPath: "/poster1.jpg" },
    { id: 2, title: "TvSeries 2", posterPath: "/poster2.jpg" },
    { id: 3, title: "TvSeries 3", posterPath: "/poster3.jpg" },
    { id: 4, title: "TvSeries 4", posterPath: "/poster4.jpg" },
    { id: 5, title: "TvSeries 5", posterPath: "/poster5.jpg" },
    { id: 6, title: "TvSeries 6", posterPath: "/poster6.jpg" },
  ];
  beforeEach(() => {
    vi.spyOn(getTrendingMovies, "default").mockImplementation(
      mockGetTrendingMovies
    );
    vi.spyOn(getTrendingTvSeries, "default").mockImplementation(
      mockGetTrendingTvSeries
    );
    vi.spyOn(useRequireAuth, "default").mockImplementation(mockUseRequireAuth);
  });

  it("renders a snapshot", () => {
    mockGetTrendingMovies.mockResolvedValue(mockedMovies);
    mockGetTrendingTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it("fetches trending movies and TV series data when user is authenticated", async () => {
    mockGetTrendingMovies.mockResolvedValue(mockedMovies);
    mockGetTrendingTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);

    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(getByText("Trending Movies")).toBeInTheDocument();
    expect(getByText("Trending TV Series")).toBeInTheDocument();

    expect(mockGetTrendingMovies).toHaveBeenCalled();
    expect(mockGetTrendingTvSeries).toHaveBeenCalled();
  });
  it("redirects to login page when user is not authenticated", async () => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockUseNavigate);

    mockUseRequireAuth.mockReturnValue(null);
    const { queryByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(queryByText("Trending Movies")).not.toBeInTheDocument();
    expect(queryByText("Trending TV Series")).not.toBeInTheDocument();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  });
});
