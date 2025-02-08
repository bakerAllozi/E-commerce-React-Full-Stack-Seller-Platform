import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../backend/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries(['user']);
    },
    onError: (err) => console.log(err),
  });

  return { updateUser, isUpdating };
}
