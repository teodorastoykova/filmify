import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TvSeriesPoster from "../../src/components/tvSeries/TvSeriesPoster";
import { MemoryRouter } from "react-router-dom";

describe("TvSeriesPoster", () => {
  const mockedTvSeries = [
    { id: 1, title: "TvSeries 1", posterPath: "/poster1.jpg" },
    { id: 2, title: "TvSeries 2", posterPath: "/poster2.jpg" },
    { id: 3, title: "TvSeries 3", posterPath: "/poster3.jpg" },
    { id: 4, title: "TvSeries 4", posterPath: "/poster4.jpg" },
    { id: 5, title: "TvSeries 5", posterPath: "/poster5.jpg" },
    { id: 6, title: "TvSeries 6", posterPath: "/poster6.jpg" },
  ];
  const mockOnTvSeriesClick = vi.fn();
  it("Renders all properties", () => {
    render(
      <MemoryRouter>
        <TvSeriesPoster
          tvSeries={mockedTvSeries}
          onTvSeriesClick={mockOnTvSeriesClick}
        />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Clicking a poster calls onTvSeriesClick", () => {
    render(
      <TvSeriesPoster
        tvSeries={mockedTvSeries}
        onTvSeriesClick={mockOnTvSeriesClick}
      />
    );
    const firstTvSeries = screen.getByAltText("TvSeries 1");
    fireEvent.click(firstTvSeries);

    expect(mockOnTvSeriesClick).toHaveBeenCalledWith(mockedTvSeries[0]);
    expect(mockOnTvSeriesClick).toHaveBeenCalledOnce();
  });
  it("Clicking the next icon renders the next set of posters", async () => {
    render(
      <MemoryRouter>
        <TvSeriesPoster
          tvSeries={mockedTvSeries}
          onTvSeriesClick={mockOnTvSeriesClick}
        />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];

    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.queryByAltText("TvSeries 6")).not.toBeInTheDocument();

    await fireEvent.click(nextButton);

    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByAltText("TvSeries 6")).toBeInTheDocument();
  });
  it("Clicking the before icon renders the previous set of posters", async () => {
    render(
      <MemoryRouter>
        <TvSeriesPoster
          tvSeries={mockedTvSeries}
          onTvSeriesClick={mockOnTvSeriesClick}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getByAltText("TvSeries 1")).toBeInTheDocument();
    expect(screen.queryByAltText("TvSeries 6")).not.toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByAltText("TvSeries 6")).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getByAltText("TvSeries 1")).toBeInTheDocument();
    expect(screen.queryByAltText("TvSeries 6")).not.toBeInTheDocument();
  });
  it("The next button is disabled when there are no more next posters", () => {
    render(
      <MemoryRouter>
        <TvSeriesPoster
          tvSeries={mockedTvSeries}
          onTvSeriesClick={mockOnTvSeriesClick}
        />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];

    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
  it("The previous button is disabled when there are no previous posters", () => {
    render(
      <MemoryRouter>
        <TvSeriesPoster
          tvSeries={mockedTvSeries}
          onTvSeriesClick={mockOnTvSeriesClick}
        />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(prevButton).toBeEnabled();

    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });
}); 
