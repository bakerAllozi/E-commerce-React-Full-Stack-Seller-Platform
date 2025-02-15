import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { TestProviders } from '@/mock/TestProviders';
import useUser from '@/hooks/useUser';
import LikePage from '@/components/page/LikePage';
import userEvent from '@testing-library/user-event';

describe('Navbar Component', () => {
    vi.mock("@/hooks/useUser", () => ({
        default: vi.fn(),
      }));



      
  test('likePage is 0 ===   ', () => {
    (useUser as vi.Mock).mockReturnValue({
        user: { id: "1235", name: "Baker" },
      });

    render(
        <TestProviders>
        <LikePage />
        </TestProviders>
    );

    expect(screen.queryByTestId("like-product")).toBeNull();
    expect(screen.getByText(/You haven`t Liked product press to Back Home/i)).toBeInTheDocument(); 
    userEvent.click(screen.getByText(/You haven`t Liked product press to Back Home/i));
    expect(window.location.pathname).toBe('/');
    

    // userEvent.click(screen.getByText(/Home/i));

    // userEvent.click(screen.getByText(/Contact/i));
    // expect(screen.getByText(/Contact Page/i)).toBeInTheDocument(); 

    // userEvent.click(screen.getByText(/About/i));
    // expect(screen.getByText(/About Page/i)).toBeInTheDocument();

  });
      
  test('likePage is 2 or mor than 0 product ', () => {
    (useUser as vi.Mock).mockReturnValue({
        user: { id: "123", name: "Baker" },
      });

    render(
        <TestProviders>
        <LikePage />
        </TestProviders>
    );



    expect(screen.getAllByTestId("like-product").length).toBeGreaterThan(1)
    expect(screen.getAllByTestId("like-product").length).toBeGreaterThan(0)
    

    // userEvent.click(screen.getByText(/Home/i));

    // userEvent.click(screen.getByText(/Contact/i));
    // expect(screen.getByText(/Contact Page/i)).toBeInTheDocument(); 

    // userEvent.click(screen.getByText(/About/i));
    // expect(screen.getByText(/About Page/i)).toBeInTheDocument();

  });
});
