import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CheckOut from './CheckOut';
import { TestProviders } from '@/test/TestProviders';




describe('CheckOut Component', () => {

  test('يجب أن يعرض نموذج الدفع', async () => {
    render(
      <TestProviders>
      <CheckOut />
      </TestProviders>
  
    );

    expect(screen.getByText(/إتمام الدفع/i)).toBeInTheDocument();
    expect(screen.getByText(/أدخل تفاصيل بطاقة الائتمان/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /دفع/i })).toBeInTheDocument();

    // fireEvent.submit(screen.getByRole('button', { name: /دفع/i }));

    // const button = screen.getByRole('button', { name: /دفع/i });
    // expect(screen.getByRole('button', { name: /دفع/i })).toBeDisabled(); // تأكد أنه معطل قبل إرسال النموذج

    // fireEvent.submit(button);

    // await waitFor(() => {
    //   expect(
    //     screen.getByText(/خطأ: Your card number is incomplete/i)
    //   ).toBeInTheDocument();
    // });
  });

  //   test('يجب أن يظهر خطأ إذا لم يتم العثور على عنصر البطاقة', async () => {
  //     render(
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <Elements stripe={stripePromise}>
  //             <CheckOut />
  //           </Elements>
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //
  //   });

  //   test('يجب أن يتم الدفع بنجاح عند إدخال بيانات صحيحة', async () => {
  //     render(
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <Elements stripe={stripePromise}>
  //             <CheckOut />
  //           </Elements>
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     // محاكاة النقر على زر الدفع
  //     fireEvent.submit(screen.getByRole('button', { name: /دفع/i }));

  //     await waitFor(() => {
  //       expect(screen.getByText(/تم الدفع بنجاح!/i)).toBeInTheDocument();
  //     });
  //   });
});
