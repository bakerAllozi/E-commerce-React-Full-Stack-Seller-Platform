import { configureStore } from '@reduxjs/toolkit';
import HomepageReducer from '@/components/features/Homepage/HomepageSlice';
import wishlistSlice from '@/components/features/Wishlist/wishlistSlice';
import CartSlice from '@/components/features/Cart/CartSlice';
import userSlice from '@/components/features/User/userSlice';

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
