import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import Navbar from './Navbar';
import { TestProviders } from '@/test/TestProviders';

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
  });
});
