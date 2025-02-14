import { TestProviders } from "@/test/TestProviders";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ViewProductDetails from "../ViewProductDetails";
import useUser from "@/hooks/useUser";
import useReviews from "@/hooks/useReviews";

describe("ViewByCategory Component", () => {

    vi.mock("@/hooks/useUser", () => ({
        default: vi.fn(),
      }));
    vi.mock("@/hooks/useReviews", () => ({
        default: vi.fn(),
      }));



  it("يجب أن يعرض المنتجات التابعة للفئة المختارة", () => {
       (useUser as vi.Mock).mockReturnValue({
            user: { id: "123", name: "Baker" },
          });
       (useReviews  as vi.Mock).mockReturnValue({
        data: [
            { Product_ID:'93a9d2b7-c7ab-42eb-83ed-440d4ba83df4', user: "Ali", comment: "منتج رائع!", rating: 5 },
          ],
          });
    render(
        
        <TestProviders initialEntriest={'/Men’s Fashion/93a9d2b7-c7ab-42eb-83ed-440d4ba83df4'}>
          <Routes>
            <Route path="/:categoryName/:productId" element={<ViewProductDetails />} />
          </Routes>
      </TestProviders>
      
    );


    expect(screen.getByText("Product Reviews")).toBeInTheDocument();
    // expect(screen.getByText("Men’s Fashion")).toBeInTheDocument();

    expect(screen.getByText(/منتج رائع!/i)).toBeInTheDocument();
  });

  

  
});
