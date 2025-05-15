import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { describe, expect, test } from "vitest";

describe("Footer Component", () => {
  test("renders all section titles correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Exclusive")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Qdivck Link")).toBeInTheDocument();
    expect(screen.getByText("Download App")).toBeInTheDocument();
  });

  test("renders input field for email", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });


  test("renders copyright text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Copyright Baker Allozi 2024/i)).toBeInTheDocument();
  });
});
