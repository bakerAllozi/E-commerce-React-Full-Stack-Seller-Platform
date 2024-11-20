import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  totalPrice: 0,
};

const cartReducer = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    gitCartItem(state, action) {
      state.cartData.push(...action.payload);
    },
    increaseQuantity(state, action) {
      state.cartData = state.cartData.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
          const CQuantity = item.price * item.quantity;

          return { ...item, price2: parseFloat(CQuantity.toFixed(2)) };
        }
        return item;
      });
    },
    decreaseQuantity(state, action) {
      state.cartData = state.cartData.map((item) => {
        if (item.id === action.payload) {
          item.quantity--;
          const CQuantity = item.price * item.quantity;

          return { ...item, price2: parseFloat(CQuantity.toFixed(2)) };
        }
        return item;
      });
    },
    calcPrice(state) {
      state.totalPrice = state.cartData.reduce(
        (accumulator, item) => accumulator + item.price2,
        0
      );
    },
    RemoveALLFromCart(state) {
      state.cartData = [];
      state.totalPrice = 0;
    },
  },
});

export default cartReducer.reducer;
export const {
  gitCartItem,
  increaseQuantity,
  decreaseQuantity,
  calcPrice,
  RemoveALLFromCart,
} = cartReducer.actions;
