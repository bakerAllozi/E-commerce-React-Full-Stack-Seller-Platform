import { TestProviders } from "@/mock/TestProviders";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import StarRating from "./StarRating";

describe("ViewByCategory Component", () => {





  it("star with text-yellow-500 === 1 ", () => {
    render(
          <StarRating  rating={1}/>
    );

    expect(screen.getAllByText("★")[0]).toHaveClass("text-yellow-500");

    screen.getAllByText("★")
      .slice(1) 
      .forEach(star => expect(star).toHaveClass("text-gray-300"));
  });
  });

  

 
