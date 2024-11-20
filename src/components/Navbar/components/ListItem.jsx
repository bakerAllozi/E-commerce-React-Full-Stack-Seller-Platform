import { NavLink } from "react-router-dom";
import Basket from "../ui/Basket";
import CartIcon from "../ui/CartIcon";
import Like from "../ui/Like";
import Comments from "./Comment/components/Comments";
import Sidebar from "../../../features/Homepage/components/Sidebar";

function ListItem() {
  return (
    <div className="  bg-white  shadow-md w-[300px] text-sm sm:text-lg sm:w-[400px] md:w-[500px]   h-[100vh] border-[1px]  z-[1000] flex flex-col gap-4 items-center   ">
      <label className=" font-extrabold text-lg   ">the category</label>
      <Sidebar noHidden={true} n1={false} />
    </div>
  );
}

export default ListItem;
