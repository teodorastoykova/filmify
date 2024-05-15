import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MoviePoster from "../../src/components/movies/MoviePoster";
import { MemoryRouter } from "react-router-dom";

describe("MoviePoster", () => {
  const mockedMovies = [
    { id: 1, title: "Movie 1", posterPath: "/poster1.jpg" },
    { id: 2, title: "Movie 2", posterPath: "/poster2.jpg" },
    { id: 3, title: "Movie 3", posterPath: "/poster3.jpg" },
    { id: 4, title: "Movie 4", posterPath: "/poster4.jpg" },
    { id: 5, title: "Movie 5", posterPath: "/poster5.jpg" },
    { id: 6, title: "Movie 6", posterPath: "/poster6.jpg" },
  ];
  const mockOnMovieClick = vi.fn();
  it("Renders all properties", () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
  it("Clicking a poster calls onMovieClick", () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
      </MemoryRouter>
    );

    const firstMovieCard = screen.getByAltText("Movie 1");
    fireEvent.click(firstMovieCard);

    expect(mockOnMovieClick).toHaveBeenCalledWith(mockedMovies[0]);
  });
  it("Clicking the next icon renders the next set of posters", async () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];

    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.queryByAltText("Movie 6")).not.toBeInTheDocument();

    await fireEvent.click(nextButton);

    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByAltText("Movie 6")).toBeInTheDocument();
  });
  it("Clicking the before icon renders the prev set of posters", async () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    await fireEvent.click(nextButton);
    expect(screen.getAllByRole("img")).toHaveLength(2);

    await fireEvent.click(prevButton);
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });
  it("The next button is disabled when there are no more next posters", () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];

    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
  it("The previous button is disabled when there are no more previous posters", () => {
    render(
      <MemoryRouter>
        <MoviePoster movies={mockedMovies} onMovieClick={mockOnMovieClick} />
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
