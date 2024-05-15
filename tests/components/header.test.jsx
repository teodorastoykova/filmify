import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../src/components/common/Header";
import * as router from "react-router";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  const mockedUseNavigate = vi.fn();
  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockedUseNavigate);
  });

  it("Renders all properties", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(screen.getByText("Filmify")).toBeInTheDocument();
    expect(buttons).toHaveLength(6);
  });
  it("Renders a home button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });
  it("Clicking the home button navigates to the home page", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");

      return {
        ...actual,
        useNavigate: () => mockedUseNavigate(),
      };
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeButton = screen.getByRole("button", { name: "Home" });
    fireEvent.click(homeButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });
  it("Renders a top rated button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "Top Rated" })
    ).toBeInTheDocument();
  });
  it("Clicking the top rated button navigates to the top rated page", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockedUseNavigate(),
      };
    });
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const topRatedButton = screen.getByRole("button", { name: "Top Rated" });
    fireEvent.click(topRatedButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/top_rated");
  });
  it("Renders a my watch list button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "My Watch List" })
    ).toBeInTheDocument();
  });
  it("Clicking the my watch list button navigates to the my watch lst page", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockedUseNavigate,
      };
    });
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const myWatchListButton = screen.getByRole("button", {
      name: "My Watch List",
    });
    fireEvent.click(myWatchListButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/my_watch_list");
  });
  it("Renders a logout button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: "Log Out" })).toBeInTheDocument();
  });
  it("Clicking the logun button navigates to the login page and cleas the local storage", async()=>{
    localStorage.setItem('sessionId', 'mockSessionId');
    vi.mock("react-router-dom", async()=>{
      const actual = await vi.importActual('react-router-dom');
      return{
        ...actual,
        useNavigate: () => mockedUseNavigate,
      }
    })
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>)
    const logOutButton = screen.getByRole('button', {name: "Log Out"})
    fireEvent.click(logOutButton)

    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login')
  });
});
