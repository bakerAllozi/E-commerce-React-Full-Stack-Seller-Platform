import { useCallback } from 'react';
import { getDataOfProduct } from '../backend/apiDataOfProduct';
import useRedux from './useRedux';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';
import useReadChats from './useReadChats';
import { fetchProductItem } from '@/APP/features/Homepage/HomepageSlice';
import { getDataChats } from '@/APP/features/User/userSlice';

interface ProductData {
  id: string;
  name: string;
}

interface ChatData {
  id: string;
  message: string;
}

interface UseProductDataReturn {
  data: ProductData[] | undefined;
  isLoading: boolean;
  updateData: () => void;
}

const useProductData = (): UseProductDataReturn => {
  const { dispatch } = useRedux();
  const { user } = useUser();

  const { data: chatData } = useReadChats(user?.id || '');

  const { data, isLoading } = useQuery<ProductData[]>({
    queryKey: ['DataOfProduct'],
    queryFn: getDataOfProduct,
  });

  const updateData = useCallback(() => {
    if (!user || !chatData || !data) return;
    dispatch(fetchProductItem(data));
    dispatch(getDataChats(chatData));
  }, [dispatch, data, chatData, user]);

  return { data, isLoading, updateData };
};

export default useProductData;
