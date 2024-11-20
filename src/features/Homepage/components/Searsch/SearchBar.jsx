import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchPage from "./SearchPage";

function SearchBar() {
  const { Data } = useSelector((state) => state.product);
  const [searchWorld, setSearchWorld] = useState("");
  const searchedProduct =
    searchWorld.length > 0
      ? Data.filter((data) =>
          `${data.title}  `.toLowerCase().includes(searchWorld.toLowerCase())
        )
      : [];
  const handelSearchChange = (e) => {
    setSearchWorld(e.target.value);
  };

  return (
    <div className="  w-full relative ">
      {searchWorld.length > 0 && (
        <SearchPage
          searchedProduct={searchedProduct}
          setSearchWorld={setSearchWorld}
        />
      )}
      <input
        className="  text-[10px]  active:text-stone-950  focus:outline-none  sm:text-sm   w-full  h-9  px-2 pr-14  border-[2px] border-black  rounded-md"
        type="text"
        placeholder="What are you looking for?"
        value={searchWorld}
        onChange={(e) => handelSearchChange(e)}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className=" absolute z-10 right-4 top-3"
      />
    </div>
  );
}

export default SearchBar;
