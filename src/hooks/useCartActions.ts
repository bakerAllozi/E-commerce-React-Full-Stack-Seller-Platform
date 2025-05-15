
import { calcPrice, decreaseQuantity, increaseQuantity } from '@/store/features/Cart/CartSlice';
import useRedux from './useRedux';

const useCartActions = () => {
  const { dispatch, appSelector } = useRedux();

  const { cartData } = appSelector((state) => state.cartItem);

  const handelIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
    dispatch(calcPrice());
  };

  const handelDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
    dispatch(calcPrice());
  };

  return {
    cartData,
    handelIncrease,
    handelDecrease,
  };
};

export default useCartActions;
