import { UseLogout } from "@/hooks";

function Logout() {
  const { logout, isLoading } = UseLogout();

  return (
    <button disabled={isLoading} onClick={() => logout()}>
      logout
    </button>
  );
}

export default Logout;
