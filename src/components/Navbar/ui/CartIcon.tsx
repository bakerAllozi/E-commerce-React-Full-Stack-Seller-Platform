import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useRedux from '@/hooks/useRedux';

function CartIcon() {
  const { appSelector } = useRedux();
  const { cartData } = appSelector((state) => state.cartItem);
  return (
    <div>
      <NavLink to="Cart" className="  relative hidden sm:block ">
        {cartData.length > 0 && (
          <motion.p
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: 0, type: 'tween', duration: 0.2 }}
            className=" bg-red-600  w-2 h-2  p-2  right-1   top-[-10px]  flex justify-center items-center text-xs  rounded-full  absolute  text-white"
          >
            {cartData.length}
          </motion.p>
        )}

        <FontAwesomeIcon
          icon={faCreditCard}
          className="w-6 h-6 cursor-pointer"
        />
      </NavLink>
    </div>
  );
}

export default CartIcon;
