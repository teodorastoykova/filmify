import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import About from "../../src/pages/About";
import { MemoryRouter } from "react-router-dom";

describe("About", () => {
  it("Renders all properties", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");

    expect(screen.getByText("Filmify")).toBeInTheDocument();
    expect(screen.getByText("About Filmify")).toBeInTheDocument();
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(screen.getByText("What we offer")).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("Join the Filmify Family")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download Filmify App" })
    ).toBeInTheDocument();
    expect(buttons).toHaveLength(7);
    screen.debug();
  });
  it("Renders clickable download button", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Download Filmify App" });
    fireEvent.click(button);
  });
  it("Renders snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <About />{" "}
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot(); 
  });
});
