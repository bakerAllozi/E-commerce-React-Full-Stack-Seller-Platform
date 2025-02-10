import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { configureStore } from '@reduxjs/toolkit';
import AppLayout from "@/APP/AppLayout";
import Login from "@/APP/features/auth/Login";
import SignUp from "@/APP/features/auth/SignUp";
import Cart from "@/APP/features/Cart/Cart";
import CheckOut from "@/APP/features/CheckOut/CheckOut";
import Homepage from "@/APP/features/Homepage/Homepage";
import AddNewProduct from "@/APP/features/User/components/AddNewProduct";
import ChatPage from "@/APP/features/User/components/cahtUser/ChatPage";
import MessageNotifications from "@/APP/features/User/components/cahtUser/MessageNotifications";
import MyAccount from "@/APP/features/User/components/MyAccount";
import UserPage from "@/APP/features/User/UserPage";
import Wishlist from "@/APP/features/Wishlist/Wishlist";
import ProtectedRoute from "@/APP/ProtectedRoute";
import Commentpage from "@/components/Navbar/components/Comment/Commentpage";
import About from "@/components/page/About";
import ContactPage from "@/components/page/ContactPage";
import LikePage from "@/components/page/LikePage";
import ViewByCategory from "@/components/page/ViewByCategory";
import ViewProductDetails from "@/components/page/ViewProductDetails/ViewProductDetails";
import Error from "@/ui/Error/Error";
import Loading from "@/ui/Loading";
import { Suspense } from "react";
import {  MemoryRouter, Route, Routes } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';


const supabaseUrl = import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<Stripe | null> =
  loadStripe(`pk_test_51QPYMAKxnNgqIQklhBT5FTH7UU1rPPpPP78wG0n7dsGfze107LYUk1WhLbMs5mzZj6DPfYOpRkLQD88UvgZdbD6P00dGYGvcBE`);

const store = configureStore({
  reducer: {
    product: (state = { data: []}, action) => state,
    cartItem: (state = { cartData: []}, action) => state,
    wishlistData: (state = { wishlistData: []}, action) => state,
    UserData: (state = { cartData: []}, action) => state,
  },
  preloadedState: {
    cartItem: {
      cartData: [
        { id: 1, name: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5 },
      ],
    },
    product: {
      Data: [
        { id: 1, name: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5, product_like:['123'] },
        { id: 2, name: 'منتج 2', price2: 100, quantity: 2, piecesRemaining: 5, product_like:['123'] },
      ],
    },
    wishlistData: {
      wishlistData: [
        { id: 1, name: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5 },
      ],
    },
    UserData: {
      ReceiverChat: [
        {
          id: '1',
          name: 'محمد',
          avatar: ''
          
        },
      ],
    },
  },
});


const queryClient = new QueryClient();

interface TestProvidersProps {
  children: ReactNode;
}
export function TestProviders({ children }: TestProvidersProps) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Homepage />} />
                  <Route path="Contact" element={<ContactPage />} />
                  <Route path="About" element={<About />} />
                  <Route path="Cart" element={<Cart />} />
                  <Route path="LikePage" element={<LikePage />} />
                  <Route path="Wishlist" element={<Wishlist />} />
                  <Route path="Messages" element={<MessageNotifications />} />
                  <Route path="UserPage" element={<UserPage />} />
                  <Route path="MyAccount" element={<MyAccount />} />
                  <Route path="CategoryPage" element={<ViewByCategory />} />
                  <Route path="AddNewProduct" element={<AddNewProduct />} />
                  <Route path="ChatPage" element={<ChatPage />} />
                  <Route path="Commentpage" element={<Commentpage />} />
                  <Route path="/:productId" element={<ViewProductDetails />} />
                  <Route path="*" element={<Error />} />
                </Route>
                <Route path="SignUp" element={<SignUp />} />
                <Route path="LogIn" element={<Login />} />
              </Routes>
            </Suspense>
            {children}
          </Elements>
        </QueryClientProvider>
      </MemoryRouter>
    </Provider>
  );
}
