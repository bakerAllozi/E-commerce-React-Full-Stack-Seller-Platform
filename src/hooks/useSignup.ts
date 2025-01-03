import { signup as signupApi } from "../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {},

    onError: (err) => alert((err as Error).message),
  });

  return { signup, isLoading };
}

export default useSignup;
