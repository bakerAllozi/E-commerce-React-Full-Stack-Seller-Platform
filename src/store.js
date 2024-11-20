import { configureStore } from "@reduxjs/toolkit";
import HomepageReducer from "./features/Homepage/HomepageSlice";
import wishlistSlice from "./features/Wishlist/wishlistSlice";
import CartSlice from "./features/Cart/CartSlice";
import userSlice from "./features/User/userSlice";

const store = configureStore({
  reducer: {
    product: HomepageReducer,
    wishlistData: wishlistSlice,
    cartItem: CartSlice,
    UserData: userSlice,
  },
});

export default store;
