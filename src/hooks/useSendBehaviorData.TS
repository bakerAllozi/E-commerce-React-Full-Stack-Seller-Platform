import { useMutation } from '@tanstack/react-query';
import { upsertProductFavorite } from '../backend/apiRecommenderSlice';

const useSendBehavior = () => {
  const mutation = useMutation({
    mutationFn: ({ user_id, category }) =>
      upsertProductFavorite({ userId: user_id, Category: category }),
  });

  return mutation.mutate; 
};

export default useSendBehavior;
