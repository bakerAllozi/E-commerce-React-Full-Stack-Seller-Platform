import { configureStore } from '@reduxjs/toolkit';
import HomepageReducer from '@/APP/features/Homepage/HomepageSlice';
import wishlistSlice from '@/APP/features/Wishlist/wishlistSlice';
import CartSlice from '@/APP/features/Cart/CartSlice';
import userSlice from '@/APP/features/User/userSlice';

const store = configureStore({
  reducer: {
    product: HomepageReducer,
    wishlistData: wishlistSlice,
    cartItem: CartSlice,
    UserData: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
