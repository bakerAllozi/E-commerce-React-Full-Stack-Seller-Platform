import { upsertProductFavorite } from '../backend/apiRecommenderSlice';

import { useQuery } from '@tanstack/react-query';

const useSendBehavior = (id: string, category :string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['Reviews'],
    queryFn: () => upsertProductFavorite({userId: id  , Category: 'Reviews'}),
    // refetchInterval: 5000,
  });
  return { data, isLoading };
};
export default useSendBehavior;
