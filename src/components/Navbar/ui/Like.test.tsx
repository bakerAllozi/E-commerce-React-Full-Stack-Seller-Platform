import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { TestProviders } from '@/test/TestProviders';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import useUser from '@/hooks/useUser';
import LikePage from '@/components/page/LikePage';

describe('Navbar Component', () => {
    vi.mock("@/hooks/useUser", () => ({
        default: vi.fn(),
      }));
      
  test('renders Navbar correctly', () => {
    (useUser as vi.Mock).mockReturnValue({
        user: { id: "123", name: "Baker" },
      });

    render(
        <TestProviders>
        <Navbar/>
        <LikePage />
        </TestProviders>
    );

    expect(screen.getByText(/2/)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('like-container'));

    expect(window.location.pathname).toBe('/LikePage');

    // userEvent.click(screen.getByText(/Home/i));
    // expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

    // userEvent.click(screen.getByText(/Contact/i));
    // expect(screen.getByText(/Contact Page/i)).toBeInTheDocument(); 

    // userEvent.click(screen.getByText(/About/i));
    // expect(screen.getByText(/About Page/i)).toBeInTheDocument();

  });
});
