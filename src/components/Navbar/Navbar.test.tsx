import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Navbar from './Navbar';
import { TestProviders } from '@/mock/TestProviders';
import userEvent from '@testing-library/user-event';

describe('Navbar Component', () => {
  test('renders Navbar correctly', () => {
    render(
        <TestProviders>
        <Navbar />
        </TestProviders>
    );

    expect(screen.getByText(/Exclusive/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product\+/i)).toBeInTheDocument();


    // userEvent.click(screen.getByText(/Home/i));
    // expect(window.location.pathname).toBe('/');


    // userEvent.click(screen.getByText(/Contact/i));
    // expect(window.location.pathname).toBe('/Contact');


    // userEvent.click(screen.getByText(/About/i));
    // expect(window.location.pathname).toBe('/About');

  });
});
