import { useState } from "react";
import useRedux from "./useRedux";
import { gitWishlistData } from "../features/Wishlist/wishlistSlice";

const useWishlistAndCart = (idItem) => {
  const { dispatch, appSelector } = useRedux();

  const { wishlistData } = appSelector((state) => state.wishlistData);
  const { cartData } = appSelector((state) => state.cartItem);

  const arrOfIsSelectedToWishlist = wishlistData.map((e) => e.id);
  const arrOfIsSelectedToCart = cartData.map((e) => e.id);
  const checkIfItIsInCart = arrOfIsSelectedToCart.includes(idItem);
  const checkIfItIsInWishlist = arrOfIsSelectedToWishlist.includes(idItem);

  const itemStatus = checkIfItIsInCart
    ? "in cart"
    : checkIfItIsInWishlist
    ? "in wishlist"
    : "in stack";

  const [itAdd, setItAdd] = useState(false);
  const handelAddToWishlist = () => {
    dispatch(gitWishlistData(idItem));
    setItAdd(true);
  };

  return {
    checkIfItIsInCart,
    checkIfItIsInWishlist,
    itemStatus,
    itAdd,
    handelAddToWishlist,
  };
};

export default useWishlistAndCart;
