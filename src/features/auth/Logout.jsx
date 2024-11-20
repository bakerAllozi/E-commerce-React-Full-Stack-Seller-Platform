import useLogout from "../../hooks/useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <button disabled={isLoading} onClick={logout}>
      logout
    </button>
  );
}

export default Logout;
