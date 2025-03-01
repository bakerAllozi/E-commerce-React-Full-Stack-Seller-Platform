import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { configureStore } from '@reduxjs/toolkit';

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
    UserData: (state = { cartData: [],forHowYouChat:[] }, action) => state,
  },
  preloadedState: {
    cartItem: {
      cartData: [
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
          image: [], 
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
      forHowYouChat:[
        {
          id:"880e849d-2374-459c-84fd-3128f7ab41c0",
name:"baker",
avatar:"https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/avatar-cagm43f8veq"
        }
      ]
    },
  }
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
