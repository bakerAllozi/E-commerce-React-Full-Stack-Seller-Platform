import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { TestProviders } from '@/mock/TestProviders';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar/Navbar';
import BoxBroduct from './BoxPoduct';

describe('Navbar Component', () => {
  test('renders Navbar correctly', () => {
    render(
        <TestProviders>
        <BoxBroduct 
        
        />
        </TestProviders>
    );
    expect(screen.getByText(/Exclusive/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product\+/i)).toBeInTheDocument();

  });
});
