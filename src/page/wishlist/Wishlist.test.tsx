import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { TestProviders } from '@/mock/TestProviders';
import Wishlist from './Wishlist';


describe('Navbar Component', () => {

   test('the iteam === 1 ',()=>{
     
    render(
        <TestProviders>
        <Wishlist/>
        </TestProviders>
    );
    expect(screen.getByText(/Move All To Cart/i)).toBeInTheDocument(); 
    expect(screen.getAllByTestId(/box/i).length).toBe(1)

    // const moveAllButton = screen.getByText(/Move All To Cart/i);

    // fireEvent.click(moveAllButton);


   })

  });
      

