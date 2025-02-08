import { MyProductType } from '@/types/product.type';
import useRedux from './useRedux';
import useUpdateProduct from './useUpdateProduct';
import useUser from './useUser';
import { getProductsILiked } from '@/APP/features/Homepage/HomepageSlice';
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

  const isLiked =
    Array.isArray(product.product_like) &&
    product.product_like.find((like) => like === user.id)
      ? true
      : false;

  const handleLiked = () => {
    const productLikes: string[] = Array.isArray(product.product_like)
      ? product.product_like
      : [];

    const updatedProductLikes = isLiked
      ? productLikes.filter((id) => id !== user.id)
      : [...productLikes, user.id];

    const { quantity, ...rest } = product;
    const EditRow = { ...rest, product_like: updatedProductLikes };

    updateProductById({ id: product.id, EditRow });
    dispatch(getProductsILiked(product.id));
  };

  return { isLiked, handleLiked, isLoading };
};

export default useLikedProducts;
