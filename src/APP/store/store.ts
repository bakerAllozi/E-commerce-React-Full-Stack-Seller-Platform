import { configureStore } from '@reduxjs/toolkit';
import HomepageReducer from './features/Homepage/HomepageSlice';
import wishlistSlice from './features/Wishlist/wishlistSlice';
import CartSlice from './features/Cart/CartSlice';
import userSlice from './features/User/userSlice';
import RecommenderSlice from './features/RecommenderSystems/RecommenderSlice';

const store = configureStore({
  reducer: {
    product: HomepageReducer,
    wishlistData: wishlistSlice,
    cartItem: CartSlice,
    UserData: userSlice,
    RecommendData:RecommenderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
