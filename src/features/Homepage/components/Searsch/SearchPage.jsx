/*eslint react/prop-types:0*/

import { useNavigate } from "react-router-dom";

function SearchPage({ setSearchWorld, searchedProduct }) {
  const navigate = useNavigate();

  function handelSetProductDetails(product) {
    navigate(`/${product.id}`);
    setSearchWorld("");
  }
  return (
    <div className=" w-full   h-fit   max-h-96   bg-white  border-[1px] absolute overflow-y-scroll right-0 top-10 z-50  ">
      <p className="  font-bold ml-3 mb-4">products</p>
      {searchedProduct.map((product) => (
        <div
          key={product.id}
          className=" mr-3 flex  justify-end items-center p-1  border-y-[1px]  gap-6 cursor-pointer hover:bg-slate-200"
          onClick={() => handelSetProductDetails(product)}
        >
          <p>{product.title}</p>
          <img src={product.image} className=" w-10 h-10" alt="" />
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
