import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as useRequireAuth from "../../src/components/common/useRequireAuth";
import * as router from "react-router";
import * as getTopRatedMovies from "../../src/services/Movies/TopRatedMoviesService";
import * as getTopRatedTvSeries from "../../src/services/TvSeries/TopRatedTvSeriesService";
import TopRated from "../../src/pages/TopRatedList";

describe("Top Trending page", () => {
  const mockGetTopRatedMovies = vi.fn();
  const mockGetTopRatedTvSeries = vi.fn();
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
    vi.spyOn(getTopRatedMovies, "default").mockImplementation(
      mockGetTopRatedMovies
    );
    vi.spyOn(getTopRatedTvSeries, "default").mockImplementation(
      mockGetTopRatedTvSeries
    );
    vi.spyOn(useRequireAuth, "default").mockImplementation(mockUseRequireAuth);
  });

  it("renders a snapshot", () => {
    mockGetTopRatedMovies.mockResolvedValue(mockedMovies);
    mockGetTopRatedTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);
    const { container } = render(
      <MemoryRouter>
        <TopRated />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it("fetches top rated movies and TV series data when user is authenticated", async () => {
    mockGetTopRatedMovies.mockResolvedValue(mockedMovies);
    mockGetTopRatedTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);

    const { getByText } = render(
      <MemoryRouter>
        <TopRated />
      </MemoryRouter>
    );

    expect(getByText("Top Rated Movies")).toBeInTheDocument();
    expect(getByText("Top Rated TV Series")).toBeInTheDocument();

    expect(mockGetTopRatedMovies).toHaveBeenCalled();
    expect(mockGetTopRatedTvSeries).toHaveBeenCalled();
  });
  it("redirects to login page when user is not authenticated", () => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockUseNavigate);

    mockUseRequireAuth.mockReturnValue(null);

    const { queryByText } = render(
      <MemoryRouter>
        <TopRated />
      </MemoryRouter>
    );

    expect(queryByText("Top Rated Movies")).not.toBeInTheDocument();
    expect(queryByText("Top Rated TV Series")).not.toBeInTheDocument();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login"); 

  });
});
