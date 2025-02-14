import { TestProviders } from "@/test/TestProviders";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ViewByCategory from "./ViewByCategory";

describe("ViewByCategory Component", () => {
  it("يجب أن يعرض المنتجات التابعة للفئة المختارة", () => {
    render(
        <TestProviders initialEntriest='/CategoryPage/Electronics'>
          <Routes>
            <Route path="/CategoryPage/:categoryName" element={<ViewByCategory />} />
          </Routes>
        </TestProviders>
      
    );

    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Smartphone")).toBeInTheDocument();
  });

  it("يجب أن يعرض رسالة عند عدم وجود منتجات للفئة", () => {
    render(
        <TestProviders initialEntriest='/CategoryPage/fakeCategory'>
        <Routes>
          <Route path="/CategoryPage/:categoryName" element={<ViewByCategory />} />
        </Routes>
      </TestProviders>
    );

    expect(screen.getByText("fakeCategory")).toBeInTheDocument();
    expect(screen.queryByText("منتج 1")).not.toBeInTheDocument();
    expect(screen.queryByText("منتج 2")).not.toBeInTheDocument();
  });
});
