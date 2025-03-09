import { MyProductType } from '@/types/product.type';
import useRedux from './useRedux';
import useUpdateProduct from './useUpdateProduct';
import useUser from './useUser';
import { getProductsILiked } from '@/APP/store/features/Homepage/HomepageSlice';
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



  const handleLiked = () => {
    const productLikes: string[] = Array.isArray(product.product_like)
      ? product.product_like
      : [];


    dispatch(getProductsILiked(product.id));
  };

  return { isLiked, handleLiked, isLoading };
};

export default useLikedProducts;
