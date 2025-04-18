import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  cartData: MyProductType[];
  totalPrice: number | null;
}
const initialState: initialStateType = {
  cartData: [],
  totalPrice: 0,
};

const cartReducer = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    gitCartItem(state, action) {
      const newItems = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      newItems.forEach((item) => {
        if (!state.cartData.some((cartItem) => cartItem.id === item.id)) {
          state.cartData.push(item);
        }
      });
    },
    increaseQuantity(state, action) {
      state.cartData = state.cartData.map((item) => {
        if (
          item.id === action.payload &&
          item.quantity < item.piecesRemaining
        ) {
          item.quantity++;
          const CQuantity = item.price * item.quantity;

          return { ...item, price2: parseFloat(CQuantity.toFixed(2)) };
        } else if (item.piecesRemaining === 0) {
          return { ...item, quantity: 0 };
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
