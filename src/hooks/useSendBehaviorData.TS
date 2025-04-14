import { upsertProductFavorite } from '../backend/apiRecommenderSlice';

import { useQuery } from '@tanstack/react-query';

const useSendBehavior = (news) => {
  const { data, isLoading } = useQuery({
    queryKey: ['Reviews'],
    queryFn: () => upsertProductFavorite({userId: news.user_id  , Category: news.category}),
    // refetchInterval: 5000,
  });
  return { data, isLoading };
};
export default useSendBehavior;
