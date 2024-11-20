import {
  calcPrice,
  decreaseQuantity,
  increaseQuantity,
} from "../features/Cart/CartSlice";
import useRedux from "./useRedux";

const useCartActions = () => {
  const { dispatch, appSelector } = useRedux();

  const { cartData } = appSelector((state) => state.cartItem);

  const handelIncrease = (id) => {
    dispatch(increaseQuantity(id));
    dispatch(calcPrice());
  };

  const handelDecrease = (id) => {
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
