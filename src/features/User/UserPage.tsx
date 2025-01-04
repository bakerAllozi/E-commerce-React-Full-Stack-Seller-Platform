import useRedux from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import AddNew from "./components/AddNew";
import SalesChart from "../../ui/RouteName";
import { Link } from "react-router-dom";
import useProductData from "../../hooks/useUpdateData";
import { useEffect } from "react";

function UserPage() {
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);
  const { user } = useUser();
  console.log(user?.id);

  const userProduct = Data.filter((arr) => arr.userId === user?.id);
  const { updateData } = useProductData();
  useEffect(() => {
    updateData();
  }, [updateData]);
  const userName = user?.name;
  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-gray-800">
          My Store
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Welcome! <span className="text-red-600">{userName}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-3 font-semibold text-lg text-gray-700">
          Inventory Statistics
        </p>
        <SalesChart userProduct={userProduct} />
      </div>

      <Link
        to="/AddNewProduct"
        className="inline-flex items-center justify-center px-5 py-3 mt-5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-md focus:ring-2 focus:ring-red-500"
      >
        <span className="mr-2">➕</span> Add New Product
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {userProduct.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-center text-center"
          >
            <AddNew product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
