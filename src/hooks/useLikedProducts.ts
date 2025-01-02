import { MyProductType } from "@/types/product.type";
import { getProductsILiked } from "../features/Homepage/HomepageSlice";
import useRedux from "./useRedux";
import useUpdateProduct from "./useUpdateProduct";
import useUser from "./useUser";
interface UseLikedProductsReturn {
  isLiked: boolean;
  handleLiked: () => void;
  isLoading: boolean;
}

const useLikedProducts = (product: MyProductType): UseLikedProductsReturn => {
  const { dispatch } = useRedux();
  const { updateProductById, isLoading } = useUpdateProduct();
  const { user } = useUser();

  if (!user) {
    return { isLiked: false, handleLiked: () => {}, isLoading: false };
  }

  const isLiked = product.product_like?.includes(user.id) || false;

  const handleLiked = () => {
    const productLikes: string[] = Array.isArray(product.product_like)
      ? product.product_like
      : [];

    const updatedProductLikes = isLiked
      ? productLikes.filter((id) => id !== user.id)
      : [...productLikes, user.id];

    const EditRow = { product_like: updatedProductLikes };

    updateProductById({ id: product.id, EditRow });
    dispatch(getProductsILiked(product.id));
  };

  return { isLiked, handleLiked, isLoading };
};

export default useLikedProducts;
