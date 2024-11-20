import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertNewReview } from "../services/apiReviews";

const useInsertNewReview = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (row) => insertNewReview(row),
    onSuccess: () => {
      queryClient.invalidateQueries(["Reviews"]);
    },
    onError: (err) => alert(err.message),
  });

  return { isLoading, mutate };
};

export default useInsertNewReview;
