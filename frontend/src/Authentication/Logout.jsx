import { useAuth0 } from "@auth0/auth0-react";

const LogOut = () => {
  const { logout } = useAuth0();

  return (
    <button className='logout-btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <img src="frontend\src\assets\icons\logout.svg" alt="logout" />
    </button>
  );
};

export default LogOut;