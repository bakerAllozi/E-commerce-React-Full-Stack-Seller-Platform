import { signup as signupApi } from "../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log("go to gmail" + user);
    },

    onError: (err) => alert(err.message),
  });
  // console.log(signupApi);

  return { signup, isLoading };
}

export default useSignup;
