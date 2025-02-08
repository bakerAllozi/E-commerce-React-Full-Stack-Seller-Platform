import { getReviews } from '../backend/apiReviews';

import { useQuery } from '@tanstack/react-query';

const useReviews = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['Reviews'],
    queryFn: () => getReviews(id),
    refetchInterval: 5000,
  });

  return { data, isLoading };
};
export default useReviews;
