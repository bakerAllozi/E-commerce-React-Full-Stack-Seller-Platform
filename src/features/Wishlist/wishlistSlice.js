import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistData: [],
  Data: [],
};

const wishlistReducer = createSlice({
  name: " Wishlist",
  initialState,
  reducers: {
    getProductToWishlist(state, action) {
      state.Data = action.payload.map((item) => ({
        ...item,
        price2: item.price,
      }));
    },
    gitWishlistData(state, action) {
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
  gitWishlistData,
  deleteAllFromWishList,
} = wishlistReducer.actions;
