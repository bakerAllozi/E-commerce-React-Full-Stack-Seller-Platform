import { useEffect } from "react";
import BoxItem from "./components/BoxItem";
import CartTotal from "./components/CartTotal";
import Button from "./ui/Button";
import { calcPrice, RemoveALLFromCart } from "./CartSlice";
import useRedux from "../../hooks/useRedux";
import { Link } from "react-router-dom";

function Cart() {
  const { dispatch } = useRedux();

  useEffect(() => {
    dispatch(calcPrice());
  });
  const handelRemoveALLFromCart = () => {
    dispatch(RemoveALLFromCart());
  };
  return (
    <div className="">
      <BoxItem />
      <div className=" flex justify-around items-center mt-6 ">
        <Button handelRemoveALLFromCart={handelRemoveALLFromCart}>
          Return To Shop
        </Button>

        <Link
          to="/Checkout"
          className="w-[122px] h-[24px] rounded-md  flex justify-center  text-sm bg-red-600 text-white
          cursor-pointer items-center py-5 px-1"
        >
          Update Cart
        </Link>
      </div>
      <CartTotal />
    </div>
  );
}

export default Cart;
