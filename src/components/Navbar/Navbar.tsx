import { Link, NavLink } from 'react-router-dom';
import Like from './ui/Like';
import Basket from './ui/Basket';
import CartIcon from './ui/CartIcon';
import UserIcon from '@/APP/features/User/components/UserIcon';
import MessagesIcon from '@/APP/features/User/components/cahtUser/MessagesIcon';

const Navbar = () => {
  return (
    <div className="   h-14  flex   justify-around items-center  fixed top-0 left-0 w-full bg-white shadow  z-[100] ">
      <p className=" sm:text-xl  font-bold   sm:block  hidden">Exclusive</p>
      <Link
        to="/AddNewProduct"
        className="text-white text-center bg-red-600 p-2 rounded-md text-sm text-nowrap md:text-xl lg:text-2xl transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        Add Product+
      </Link>

      <nav className="   gap-5     hidden   sm:flex md:visible ">
        <NavLink
          to="/"
          className="border-current border-zinc-300  p-2 p-b-4 hover:border-b-2 h-10  "
        >
          Home
        </NavLink>
        <NavLink
          to="Contact"
          className="border-current border-zinc-300 p-2 p-b-4 hover:border-b-2 h-10 "
        >
          Contact
        </NavLink>

        <NavLink
          to="About"
          className="border-current border-zinc-300 p-2 p-b-4 hover:border-b-2 h-10 "
        >
          About
        </NavLink>
        <NavLink
          to="SignUp"
          className="   border-current border-zinc-300 p-2 p-b-4 hover:border-b-2 h-10  hidden md:block   "
        >
          Sign Up
        </NavLink>
      </nav>

      <div className=" flex  gap-10  items-center justify-center flex-row-reverse  ">
        <UserIcon />

        <div className="   flex lg:visible justify-center items-center gap-5 sm:gap-7  ">
          <CartIcon />
          <Like />
          <Basket />
          <MessagesIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
