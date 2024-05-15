import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Browse from "../../src/pages/Browse";
import * as getBrowseResults from "../../src/services/Common/BrowseService";
import * as useRequireAuth from "../../src/components/common/useRequireAuth";
import * as router from "react-router";

describe("Browse page", () => {
  const mockGetBrowseResults = vi.fn();
  const mockUseRequireAuth = vi.fn();
  const mockUseNavigate = vi.fn();
  const mockUseLocation = vi.fn();

  const mockedResults = [
    {
      id: 1,
      title: "Movie 1",
      poster_path: "/poster1.jpg",
      media_type: "movie",
    },
    {
      id: 2,
      title: "Movie 2",
      poster_path: "/poster2.jpg",
      media_type: "movie",
    },
    {
      id: 3,
      title: "Movie 3",
      poster_path: "/poster3.jpg",
      media_type: "movie",
    },
    {
      id: 4,
      title: "Movie 4",
      poster_path: "/poster4.jpg",
      media_type: "movie",
    },
    {
      id: 5,
      title: "Movie 5",
      poster_path: "/poster5.jpg",
      media_type: "movie",
    },
    {
      id: 6,
      name: "TV Series 1",
      poster_path: "/poster6.jpg",
      media_type: "tv",
    },
    {
      id: 7,
      name: "TV Series 2",
      poster_path: "/poster7.jpg",
      media_type: "tv",
    },
    {
      id: 8,
      name: "TV Series 3",
      poster_path: "/poster8.jpg",
      media_type: "tv",
    },
    {
      id: 9,
      name: "TV Series 4",
      poster_path: "/poster9.jpg",
      media_type: "tv",
    },
    {
      id: 10,
      name: "TV Series 5",
      poster_path: "/poster10.jpg",
      media_type: "tv",
    },
  ];

  beforeEach(() => {
    vi.spyOn(getBrowseResults, "default").mockImplementation(
      mockGetBrowseResults
    );
    vi.spyOn(useRequireAuth, "default").mockImplementation(mockUseRequireAuth);
  });
  it("renders a snapshot", () => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockUseNavigate);
    vi.spyOn(router, "useLocation").mockImplementation(() => mockUseLocation);
    
    mockGetBrowseResults.mockResolvedValue(mockedResults);
    mockUseRequireAuth.mockResolvedValue(1);
    mockUseLocation.mockResolvedValue({ search: "?query=test" });
    const { container } = render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
