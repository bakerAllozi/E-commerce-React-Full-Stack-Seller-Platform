import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormRegister } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Input from "../../../ui/Input";
import { insertNewProduct } from "../../../services/apiDataOfProduct";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import useProductData from "../../../hooks/useUpdateData";
import Alert from "../../../ui/Alert";
import { MyProductType } from "@/types/product.type";

function AddNewProduct() {
  const [sortBy, setSortBy] = useState("From the latest");
  const [showAlert, setShowAlert] = useState(false);
  interface FromType {
    register: UseFormRegister<MyProductType>;
  }
  const { register, handleSubmit, reset } = useForm<FromType>();

  const uniqueId = uuidv4();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { updateData } = useProductData();
  const { isLoading, mutate } = useMutation({
    mutationFn: (row: { image: File }) => insertNewProduct(row),
    onSuccess: () => {
      setShowAlert(true);
      updateData();

      queryClient.invalidateQueries(["DataOfProduct"]);
      reset();
      setTimeout(() => setShowAlert(false), 3000);
    },
    onError: (err: any) => alert((err as Error).message),
  });

  async function onSubmit(newRow: MyProductType) {
    if (!user) return;
    const newRowWithId = {
      ...newRow,
      id: uniqueId,
      userId: user.identities[0].id,
      price: Number(newRow.price),
      color: {
        color1: newRow.color1,
        color2: newRow.color2,
      },
      avatar: user.avatar,
      seller_name: user.name,
      rating: {
        rate: 4.5,
        count: 89,
      },
      piecesRemaining: Number(newRow.piecesRemaining),
      image: newRow.image[0],
    };
    delete newRowWithId.color1;
    delete newRowWithId.color2;

    mutate(newRowWithId);
  }

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Black",
    "Yellow",
    "Pink",
    "Purple",
    "Orange",
    "Brown",
    "Gray",
    "Cyan",
    "Magenta",
    "Lime",
    "Maroon",
    "Navy",
    "Olive",
    "Teal",
    "Violet",
    "Gold",
    "Silver",
    "Beige",
  ];

  return (
    <>
      <p className="text-center font-bold text-6xl">Add Product</p>

      <div className="fixed top-24">
        <Alert showAlert={showAlert} text="update" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 flex flex-col gap-12 p-6 bg-white rounded-lg shadow-lg"
      >
        <select
          className="block p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          {...register("category")}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Woman’s Fashion</option>
          <option>Men’s Fashion</option>
          <option>Electronics</option>
          <option>Home & Lifestyle</option>
          <option>Medicine</option>
          <option>Sports & Outdoor</option>
          <option>Baby’s & Toys</option>
          <option>Groceries & Pets</option>
          <option>Health & Beauty</option>
        </select>

        <Input
          label={"Description"}
          register={register}
          type={"text"}
          name={"description"}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
        <Input
          label={"Price"}
          register={register}
          type={"number"}
          name={"price"}
          min={0}
          max={99999}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
        <Input
          label={"Title"}
          register={register}
          type={"text"}
          name={"title"}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
        <label>Color 1</label>
        <select
          {...register("color1")}
          className="block p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {colors.map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>
        <label>Color 2</label>
        <select
          {...register("color2")}
          className="block p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {colors.map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>
        <Input
          label={"Pieces Remaining"}
          register={register}
          type={"number"}
          name={"piecesRemaining"}
          min={0}
          max={99999}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
        <Input
          label={"Image"}
          register={register}
          type={"file"}
          name={"image"}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />

        <button
          disabled={isLoading}
          className="p-2 mt-4 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          type="submit"
        >
          Post New Product
        </button>
      </form>
    </>
  );
}

export default AddNewProduct;
