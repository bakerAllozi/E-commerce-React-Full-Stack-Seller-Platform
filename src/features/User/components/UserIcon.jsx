import {
  faCircleUser,
  faCreditCard,
  faRightFromBracket,
  faStar,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import useLogout from "../../../hooks/useLogout";

function UserIcon() {
  const { logout } = useLogout();
  const { user } = useUser();
  const [opine, setOpine] = useState(true);
  return (
    <div className="relative ">
      {opine && (
        <div className="absolute top-8 right-0 w-[225px] h-auto text-white bg-gradient-to-br from-gray-800 to-black/80 backdrop-blur-lg rounded-lg p-4 space-y-3 shadow-lg">
          <Link
            to="MyAccount"
            className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
            <span className="font-medium">Manage My Account</span>
          </Link>
          <Link
            to="/Cart"
            className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faCreditCard} className="w-6 h-6" />
            <span className="font-medium">My Order</span>
          </Link>
          <Link
            to="UserPage"
            className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faStore} className="w-6 h-6" />
            <span className="font-medium">My Store</span>
          </Link>
          <Link
            to="Commentpage"
            className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="w-6 h-6" />
            <span className="font-medium">Reviews Of Website</span>
          </Link>
          <p
            className="flex items-center space-x-3 cursor-pointer hover:text-red-400 transition-colors duration-300"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </p>
        </div>
      )}
      <div
        className="w-12 h-12 cursor-pointer relative rounded-full overflow-hidden flex justify-center items-center border-[3px] border-gradient-to-r  to-red-500 shadow-lg hover:shadow-2xl transition-all duration-300"
        onClick={() => setOpine((e) => !e)}
      >
        {user?.user_metadata?.avatar ? (
          <img
            src={user?.user_metadata?.avatar}
            alt="User Avatar"
            className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-red-600 w-10 h-10"
          />
        )}
      </div>
    </div>
  );
}

export default UserIcon;
