import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMassage } from "../services/apiChat";

const useInsertMassage = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row) => insertMassage(row),
    onSuccess: () => {
      queryClient.invalidateQueries(["Chats"]);
    },
    onError: (err) => alert(err.message),
  });

  return { isLoading, mutate };
};

export default useInsertMassage;
