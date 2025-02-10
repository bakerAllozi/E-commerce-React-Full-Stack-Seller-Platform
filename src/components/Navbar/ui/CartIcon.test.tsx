import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { TestProviders } from '@/test/TestProviders';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  test('renders Navbar correctly', () => {
    render(
        <TestProviders>
        <Navbar/>
        </TestProviders>
    );

    expect(screen.getByText(/Exclusive/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product\+/i)).toBeInTheDocument();


    // userEvent.click(screen.getByText(/Home/i));
    // expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

    // userEvent.click(screen.getByText(/Contact/i));
    // expect(screen.getByText(/Contact Page/i)).toBeInTheDocument(); 

    // userEvent.click(screen.getByText(/About/i));
    // expect(screen.getByText(/About Page/i)).toBeInTheDocument();

  });
});
