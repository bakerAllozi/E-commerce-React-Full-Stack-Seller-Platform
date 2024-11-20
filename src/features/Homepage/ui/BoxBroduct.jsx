/*eslint react/prop-types:0*/

import { faEye, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "./Stars";
import ImgEffects from "./ImgEffects";
import { deleteFromWishList } from "../../Wishlist/wishlistSlice";
import useRedux from "../../../hooks/useRedux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useLikedProducts from "../../../hooks/useLikedProducts";
import Spinner from "../../../ui/Spinner";

function BoxBroduct({
  product,
  AddTo = "Add To WishList",
  idItem,
  WasteBasket = false,
  noButton,
}) {
  const { dispatch } = useRedux();
  const { isLiked, handleLiked, isLoading } = useLikedProducts(product);

  const handleDelete = () => {
    dispatch(deleteFromWishList(idItem));
  };

  const calculateOriginalPrice = () =>
    (product.price + product.price * (product.discount / 100)).toFixed(0);

  const heartAnimation = {
    scale: isLiked ? [1.1, 1.8, 1.1] : 1.1,
  };

  return (
    <motion.div
      className="relative h-96 w-72"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <p className="absolute top-2 left-2 rounded-sm flex justify-center items-center z-10 bg-red-600 w-14 h-6">
        -{product.discount}%
      </p>

      {WasteBasket ? (
        <p
          className="absolute right-2 top-2 z-10 cursor-pointer"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </p>
      ) : (
        <motion.p
          animate={heartAnimation}
          transition={{ delay: 0, type: "tween", duration: 0.4 }}
          className="absolute right-2 top-2 z-10 cursor-pointer"
          onClick={handleLiked}
        >
          {!isLoading ? (
            <FontAwesomeIcon
              icon={faHeart}
              className={`${isLiked && "text-red-600"}`}
            />
          ) : (
            <Spinner size="small" />
          )}
        </motion.p>
      )}

      <Link
        to={`/${idItem}`}
        className="absolute right-2 top-8 z-10 cursor-pointer"
      >
        <FontAwesomeIcon icon={faEye} />
      </Link>

      <ImgEffects
        product={product}
        AddTo={AddTo}
        idItem={idItem}
        noButton={noButton}
      />

      <p className="font-bold">{product.title}</p>

      <div className="space-x-4 absolute right-2 bottom-2">
        <span className="text-red-600">${product.price}</span>
        <span className="text-zinc-500 relative">
          ${calculateOriginalPrice()}
          <p className="absolute right-0 bottom-1 text-slate-300">______</p>
        </span>
      </div>

      <div>
        <span className="absolute left-2 bottom-2">
          <Stars numStare={product.rating.rate} />
        </span>
        <span className="absolute left-0 bottom-8 text-sm text-slate-300">
          ({product.rating.count})
        </span>
      </div>
    </motion.div>
  );
}

export default BoxBroduct;
