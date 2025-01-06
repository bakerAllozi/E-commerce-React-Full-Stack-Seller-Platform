import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  wishlistData: MyProductType[];
  Data: MyProductType[];
}
const initialState: initialStateType = {
  wishlistData: [],
  Data: [],
};

const wishlistReducer = createSlice({
  name: ' Wishlist',
  initialState,
  reducers: {
    getProductToWishlist(state, action) {
      state.Data = action.payload.map((item: MyProductType) => ({
        ...item,
        price2: item.price,
      }));
    },
    getWishlistData(state, action) {
      const findProduct = state.Data.find((data) => data.id === action.payload);
      if (findProduct) {
        if (!state.wishlistData.some((e) => e.id === action.payload)) {
          state.wishlistData.push(findProduct);
        }
      }
    },
    deleteFromWishList(state, action) {
      state.wishlistData = state.wishlistData.filter(
        (arr) => arr.id !== action.payload
      );
    },
    deleteAllFromWishList(state) {
      state.wishlistData = [];
    },
  },
});

export default wishlistReducer.reducer;
export const {
  deleteFromWishList,
  getProductToWishlist,
  getWishlistData,
  deleteAllFromWishList,
} = wishlistReducer.actions;
