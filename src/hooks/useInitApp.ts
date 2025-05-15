import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useRedux from './useRedux';
import useUser from './useUser';
import useReadChats from './useReadChats';
import usePublicUser from './usePublicUser';
import { getDataOfProduct } from '@/backend/apiDataOfProduct';

import { MyProductType } from '@/types/product.type';
import { fetchProductItem, getBestSellingProducts, getRandomProduct } from '@/store/features/Homepage/HomepageSlice';
import { fetchDataRecommender, getUserId } from '@/store/features/RecommenderSystems/RecommenderSlice';
import { getProductToWishlist } from '@/store/features/Wishlist/wishlistSlice';
import { getDataChats, setNewAvatarUser, splitDataChat } from '@/store/features/User/userSlice';

export default function useInitApp() {
  const { dispatch, appSelector } = useRedux();
  const { user } = useUser();
  const userId = user?.id;
  const { data } = useQuery<MyProductType[]>({
    queryKey: ['DataOfProduct'],
    queryFn: getDataOfProduct,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { Data } = appSelector((state) => state.product);

  const { data: chatData } = useReadChats(userId || '');

  const { data: ALLUserData } = usePublicUser();

  const updateData = useCallback(() => {
    if (data) {
      const updatedData = data.map((item: MyProductType) => ({
        ...item,
        quantity: 1,
      }));
      dispatch(fetchProductItem(updatedData));
      dispatch(fetchDataRecommender(updatedData));

    }
  }, [data, dispatch]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    if (Data && chatData && userId && ALLUserData) {
      dispatch(getRandomProduct());
      dispatch(getBestSellingProducts());
      dispatch(getProductToWishlist(Data));
      dispatch(getDataChats(chatData));
      dispatch(setNewAvatarUser(ALLUserData));
      dispatch(splitDataChat(userId));      
      dispatch(getUserId(userId));      
    }
  }, [Data, chatData, dispatch, userId, ALLUserData]);

  const { BehaviorData } = appSelector((state) => state.RecommendData);



// useEffect(() => {
//   const interval = setInterval(() => {
//     if (BehaviorData.user_id && BehaviorData.category) {
//       upsertProductFavorite({
//         userId: BehaviorData.user_id,
//         Category: BehaviorData.category,
//       });
//     }
//   }, 30000);

//   return () => clearInterval(interval);
// }, [BehaviorData]);


}
