import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { configureStore } from '@reduxjs/toolkit';

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
        { id: 1, name: 'منتج 1', price2: 100, quantity: 2, piecesRemaining: 5 },
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
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>{children}</Elements>
        </QueryClientProvider>
      </MemoryRouter>
    </Provider>
  );
}