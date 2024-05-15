import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WatchList from "../../src/pages/WatchList";
import * as getWatchListMovies from "../../src/services/Movies/WatchListMoviesService";
import * as getWatchListTvSeries from "../../src/services/TvSeries/WatchListTvSeriesService";
import * as useRequireAuth from "../../src/components/common/useRequireAuth";
import * as router from "react-router";

describe("My watch list page", () => {
  const mockGetWatchListMovies = vi.fn();
  const mockGetWatchListTvSeries = vi.fn();
  const mockUseRequireAuth = vi.fn();
  const mockUseNavigate = vi.fn();

  const mockedMovies = [
    { id: 1, title: "Movie 1", undefined, posterPath: "/poster1.jpg" },
    { id: 2, title: "Movie 2", undefined, posterPath: "/poster2.jpg" },
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
    vi.spyOn(getWatchListMovies, "default").mockImplementation(
      mockGetWatchListMovies
    );
    vi.spyOn(getWatchListTvSeries, "default").mockImplementation(
      mockGetWatchListTvSeries
    );
    vi.spyOn(useRequireAuth, "default").mockImplementation(mockUseRequireAuth);
  });

  it("renders a snapshot", () => {
    mockGetWatchListMovies.mockResolvedValue(mockedMovies);
    mockGetWatchListTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);
    const { container } = render(
      <MemoryRouter>
        <WatchList />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it("fetches trending movies and TV series data when user is authenticated", async () => {
    mockGetWatchListMovies.mockResolvedValue(mockedMovies);
    mockGetWatchListTvSeries.mockResolvedValue(mockedTvSeries);
    mockUseRequireAuth.mockResolvedValue(1);

    const { getByText } = render(
      <MemoryRouter>
        <WatchList />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      expect(getByText("Watch List Movies")).toBeInTheDocument();
      expect(getByText("Watch List TV Series")).toBeInTheDocument();

      expect(mockGetWatchListMovies).toHaveBeenCalled();
      expect(mockGetWatchListTvSeries).toHaveBeenCalled();
    });
  });
  it("redirects to login page when user is not authenticated", async () => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockUseNavigate);

    mockUseRequireAuth.mockReturnValue(null);
    const { queryByText } = render(
      <MemoryRouter>
        <WatchList />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      expect(queryByText("Watch List Movies")).not.toBeInTheDocument();
      expect(queryByText("Watch List TV Series")).not.toBeInTheDocument();
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    });
  });
  it("renders a message when there are no movies/tv series in the watch list", async () => {
    mockGetWatchListMovies.mockResolvedValue([]);
    mockGetWatchListTvSeries.mockResolvedValue([]);
    mockUseRequireAuth.mockResolvedValue(1);

    const { queryByText } = render(
      <MemoryRouter>
        <WatchList />
      </MemoryRouter>
    );

    await vi.waitFor(() => {
      expect(queryByText("You have not added any Movies or TV series to your watch list.")).toBeInTheDocument();
      expect(queryByText("Watch List Movies")).toBeNull();
      expect(queryByText("Watch List TV Series")).toBeNull();
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
