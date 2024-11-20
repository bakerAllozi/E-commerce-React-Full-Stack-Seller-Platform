import { getProductsILiked } from "../features/Homepage/HomepageSlice";
import useRedux from "./useRedux";
import useUpdateProduct from "./useUpdateProduct";
import useUser from "./useUser";
const useLikedProducts = (product) => {
  const { dispatch } = useRedux();
  const { updateProductById, isLoading } = useUpdateProduct();
  const { user } = useUser();

  const isLiked = product.product_like?.includes(user?.id) || false;

  const handleLiked = () => {
    const productLikes = Array.isArray(product.product_like)
      ? product.product_like
      : [];

    const updatedProductLikes = isLiked
      ? productLikes.filter((e) => e !== user?.id)
      : [...productLikes, user?.id];

    const EditRow = {
      product_like: updatedProductLikes,
    };

    updateProductById({ id: product?.id, EditRow });

    dispatch(getProductsILiked(product.id));
  };

  return { isLiked, handleLiked, isLoading };
};

export default useLikedProducts;
