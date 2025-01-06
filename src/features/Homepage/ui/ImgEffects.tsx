import { motion } from 'framer-motion';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWishlistAndCart from '../../../hooks/useWishlistAndCart';
import React from 'react';

function ImgEffects({ product, AddTo, noButton = false }) {
  const { itemStatus, itAdd, handleAddToWishlist } =
    useWishlistAndCart(product);

  return (
    <div
      className={`group/item  bg-white relative w-full   h-64 flex justify-center items-center border-2  `}
    >
      {itAdd && (
        <FontAwesomeIcon
          icon={faShoppingBasket}
          className="  w-7 h-7 absolute bottom-2 right-14"
        />
      )}

      <motion.img
        animate={{
          width: itAdd ? [176, 50, 0, 0, 0, 0, 0, 0, 176] : 176,
          height: itAdd ? [176, 50, 0, 0, 0, 0, 0, 0, 176] : 176,
          transform: itAdd
            ? ['translate(0, 0)', 'translate(90px, 160px) ', 'translate(0, 0)']
            : 'translate(0, 0)',
        }}
        transition={{ delay: 0, type: 'tween', duration: 2 }}
        className="  h-44 w-44"
        src={product.image}
        alt={product.id}
      />

      {noButton || (
        <>
          {itemStatus !== 'in stack' ? (
            <p className=" absolute left-[100px] bottom-2  text-black font-bold ">
              {itemStatus}
            </p>
          ) : (
            <button
              onClick={() => handleAddToWishlist()}
              className="invisible  group-hover/item:visible  absolute   w-full  h-8 bg-black text-white  bottom-0 z-50 flex gap-3 justify-center items-center "
            >
              <FontAwesomeIcon icon={faShoppingBasket} />
              <p>{AddTo}</p>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ImgEffects;
