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
        { id: 1, title: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5 },
      ],
    },
    product: {
      Data: [
        {
          created_at: new Date().toISOString(),
          id: "93a9d2b7-c7ab-42eb-83ed-440d4ba83df4",
          name: "Smartphone",
          price: 100,
          title: "Smartphone",
          image: [], 
          description: "A high-quality smartphone",
          userId: "user_123",
          piecesRemaining: 5,
          category: "Electronics",
          quantity: 2,
          product_like: ["123"],
          price2: 100,
          stock: 10,
          rating: {
            rate: 4,
            count: 5,
          },
          discount: 0,
          color: {},
        },
        {
          created_at: new Date().toISOString(),
          id: "2",
          name: "منتج 2",
          price: 100,
          title: "منتج 2",
          image: [], // تحتاج إلى توفير ملفات حقيقية هنا
          description: "وصف المنتج 2",
          userId: "user_456",
          piecesRemaining: 5,
          category: "Electronics",
          quantity: 2,
          product_like: ["123"],
          price2: 100,
          stock: 10,
          rating: {
            rate: 4,
            count: 5,
          },
          discount: 0,
          color: {},
        }
      ]
    },
    wishlistData: {
      wishlistData: [
        { id: 1, title: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5 },
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
  initialEntriest?:string;
  children: ReactNode;
}
// export function TestProviders({ children }: TestProvidersProps) {
//   return (
//     <Provider store={store}>
//       <MemoryRouter initialEntries={["/CategoryPage/fakeCategory"]}>
//         <QueryClientProvider client={queryClient}>
//           <Elements stripe={stripePromise}>
//           
//             {children}
//           </Elements>
//         </QueryClientProvider>
//       </MemoryRouter>
//     </Provider>
//   );
// }
export function TestProviders({ children, initialEntriest = '/' }: TestProvidersProps) {
  return (
    <MemoryRouter initialEntries={[initialEntriest]}>
    <Provider store={store}>
         <QueryClientProvider client={queryClient}>
           <Elements stripe={stripePromise}>  
             {children}

           </Elements>
         </QueryClientProvider>
     </Provider>
    </MemoryRouter>

  );
}
