import { TestProviders } from "@/test/TestProviders";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import useUser from "@/hooks/useUser";
import useReviews from "@/hooks/useReviews";
import useLikedProducts from "@/hooks/useLikedProducts";
import userEvent from "@testing-library/user-event";
import useCartActions from "@/hooks/useCartActions";
import useWishlistAndCart from "@/hooks/useWishlistAndCart";
import ViewProductDetails from "./ViewProductDetails";

vi.mock("@/hooks/useUser", () => ({
  default: vi.fn(),
}));

vi.mock("@/hooks/useReviews");
vi.mock("@/hooks/useLikedProducts", () => ({
  default: vi.fn(),
}));
vi.mock("@/hooks/useCartActions", () => ({
  default: vi.fn(),
}));
vi.mock("@/hooks/useWishlistAndCart", () => ({
  default: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ViewProductDetails Component", () => {
  it("يجب أن يعرض المنتجات التابعة للفئة المختارة", async () => {
    (useUser as vi.Mock).mockReturnValue({
      user: { id: "123", name: "Baker" },
    });
  
    const handleLikedMock = vi.fn();
    const handelDecreaseMock = vi.fn();
    const handelIncreaseMock = vi.fn();
    const checkIfItIsInCartMock = vi.fn();
    const navigateMock = vi.fn(); 

    (useNavigate as vi.Mock).mockReturnValue(navigateMock);
  


    (useLikedProducts as vi.Mock).mockReturnValue({
      isLiked: true,
      handleLiked: handleLikedMock,
    });

    (useCartActions as vi.Mock).mockReturnValue({
      handelDecrease: handelDecreaseMock,
      handelIncrease: handelIncreaseMock,
      cartData: [
        { id: "93a9d2b7-c7ab-42eb-83ed-440d4ba83df4", title: "منتج 1", price2: 100, quantity: 2, piecesRemaining: 5 }
      ],
    });

    (useWishlistAndCart as vi.Mock).mockReturnValue({
      checkIfItIsInCart: checkIfItIsInCartMock,
      itemStatus: true,
    });
    (useReviews  as vi.Mock).mockReturnValue({
        data: [
            { Product_ID:'93a9d2b7-c7ab-42eb-83ed-440d4ba83df4',id: "123", user: "Ali", comment: "منتج رائع!", rating: 5 },
          ],
          });



    render(
      <TestProviders initialEntriest={"/Men’s Fashion/93a9d2b7-c7ab-42eb-83ed-440d4ba83df4"}>
        <Routes>
          <Route path="/:categoryName/:productId" element={<ViewProductDetails  testmode={true} />} />
        </Routes>
      </TestProviders>
    );


    expect(screen.getByText("Buy Now")).toBeInTheDocument();
    expect(screen.getByText("Product Reviews")).toBeInTheDocument();

    expect(screen.getByText(/منتج رائع!/i)).toBeInTheDocument();
    const buttonLike = screen.getByTestId("Liked");
    expect(buttonLike).toBeInTheDocument();
    await userEvent.click(buttonLike);
    expect(handleLikedMock).toHaveBeenCalled();

    const buttonBuyNow = screen.getByText("Buy Now");
    expect(buttonBuyNow).toBeInTheDocument();
    await userEvent.click(buttonBuyNow);

    const buttonDecrease = screen.getByTestId("decrease-btn");
    const buttonIncrease = screen.getByTestId("increase-btn");
    expect(buttonDecrease).toBeInTheDocument();
    expect(buttonIncrease).toBeInTheDocument();

    await userEvent.click(buttonIncrease);
    expect(handelIncreaseMock).toHaveBeenCalled();

    await userEvent.click(buttonDecrease);
    expect(handelDecreaseMock).toHaveBeenCalled();
  });
});
