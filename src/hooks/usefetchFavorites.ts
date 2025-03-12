import { useQuery } from '@tanstack/react-query';
import { selectProductFavorite } from '@/backend/apiProductFavorite';

const usefetchFavorites = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ProductFavorite'],
    queryFn: () => selectProductFavorite({userId}),
  });

  return { data, isLoading };
};

export default usefetchFavorites;
