import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { TestProviders } from '@/mock/TestProviders';

import Basket from './Basket';

describe('cart icon Component', () => {
  

  test('renders cart icon correctly', () => {
 
    render(
        <TestProviders>
        <Basket/>
        </TestProviders>
    );
    expect(screen.getByText(/1/)).toBeInTheDocument();





    // userEvent.click(screen.getByText(/Home/i));
    // expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

    // userEvent.click(screen.getByText(/Contact/i));
    // expect(screen.getByText(/Contact Page/i)).toBeInTheDocument(); 

    // userEvent.click(screen.getByText(/About/i));
    // expect(screen.getByText(/About Page/i)).toBeInTheDocument();

  });
});
