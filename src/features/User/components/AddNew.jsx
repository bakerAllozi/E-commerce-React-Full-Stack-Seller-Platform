/*eslint react/prop-types:0*/
import { Link, useNavigate } from "react-router-dom";
import useDeleteProduct from "../../../hooks/useDeleteProduct";
import Spinner from "../../../ui/Spinner";
import useRedux from "../../../hooks/useRedux";
import { setProductToEdit } from "../userSlice";

function AddNew({ product }) {
  const { dispatch } = useRedux();
  const navigate = useNavigate();

  const handelEditProduct = () => {
    dispatch(setProductToEdit(product));
    navigate("/Gg");
  };
  const { deleteProductById, isLoading } = useDeleteProduct();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={product.image}
              alt="Product"
            />
          </div>

          <div className="w-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col justify-between">
            <div>
              <div className="font-bold text-xl mb-2 text-gray-800">
                {product.title}
              </div>

              <p className="text-gray-600 text-sm sm:text-base">
                {product.description}
              </p>

              <div className="mt-3 space-y-1 text-gray-600">
                <p className="text-sm">
                  <strong>Price:</strong> ${product.price}
                </p>
                <p className="text-sm">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-sm">
                  <strong>Stock:</strong> {product.stock} items
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {product.created_at.slice(0, 10)}
              </p>
            </div>

            <div className="pt-4 pb-2 flex gap-2 sm:gap-3 flex-wrap">
              <span
                onClick={() => deleteProductById(product.id)}
                className="cursor-pointer bg-red-600 text-white rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-red-700"
              >
                Delete
              </span>
              <button
                onClick={handelEditProduct}
                className="cursor-pointer bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-blue-700"
              >
                Edit
              </button>
              <Link
                to={`/${product.id}`}
                className="cursor-pointer bg-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-gray-400"
              >
                View
              </Link>
            </div>

            <p className=" bottom-2 right-2 text-xs text-gray-500">
              👍: {product.product_like?.length || "No Like"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNew;
