import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../backend/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useLogin() {
  const queryClient = useQueryClient(); //
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred');
      }
    },
  });
  return { login, isLoading };
}

export default useLogin;
