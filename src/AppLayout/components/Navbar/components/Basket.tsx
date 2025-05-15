import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useRedux from '@/hooks/useRedux';

function Basket() {
  const { appSelector } = useRedux();
  const { wishlistData } = appSelector((state) => state.wishlistData);

  return (
    <div className="">
      <NavLink to="Wishlist" className="  relative ">
        {wishlistData.length > 0 && (
          <motion.p
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: 0, type: 'tween', duration: 0.2 }}
            className=" bg-red-600  w-2 h-2  p-2  right-1   top-[20]  flex justify-center items-center text-xs  rounded-full  absolute  text-white"
          >
            {wishlistData.length}
          </motion.p>
        )}

        <FontAwesomeIcon icon={faShoppingBasket} className="  w-7 h-7   " />
      </NavLink>
    </div>
  );
}

export default Basket;
