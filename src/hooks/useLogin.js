import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useLogin() {
  const queryClient = useQueryClient(); //
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (err) => alert(err.message),
  });
  return { login, isLoading };
}

export default useLogin;
