import { useState } from 'react';
import useRedux from './useRedux';
import { MyProductType } from '@/types/product.type';
import { getWishlistData } from '@/store/features/Wishlist/wishlistSlice';

const useWishlistAndCart = (ProductDetails: MyProductType) => {
  const idItem = ProductDetails.id;
  const { dispatch, appSelector } = useRedux();
  const { wishlistData } = appSelector((state) => state.wishlistData);
  const { cartData } = appSelector((state) => state.cartItem);
  const checkIfItIsInWishlist = wishlistData.some((e) => e.id === idItem);
  const checkIfItIsInCart = cartData.some((e) => e.id === idItem);

  const itemStatus =
    ProductDetails.piecesRemaining === 0
      ? 'Out Of Stock'
      : checkIfItIsInCart
        ? 'in cart'
        : checkIfItIsInWishlist
          ? 'in wishlist'
          : 'in stack';

  const [itAdd, setItAdd] = useState(false);
  const handleAddToWishlist = () => {
    dispatch(getWishlistData(idItem));
    setItAdd(true);
  };

  return {
    itemStatus,
    itAdd,
    handleAddToWishlist,
    checkIfItIsInCart,
  };
};

export default useWishlistAndCart;
