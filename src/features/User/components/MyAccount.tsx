import { useForm } from "react-hook-form";
import Input from "../../../ui/Input";
import Spinner from "../../../ui/Spinner";
import { useUpdateUser } from "../../../hooks/useUpdateUser";
import useUser from "../../../hooks/useUser";

function MyAccount() {
  const { register, handleSubmit, reset } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  async function onSubmit(newRow: {
    name: string;
    image: string;
    password: string | undefined;
  }) {
    updateUser({
      ...newRow,
      image: newRow.image[0],
      id: user.id as string,
      password: newRow.password || undefined,
    });
    reset();
  }

  return (
    <>
      {isUpdating ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-9 flex flex-col gap-12 p-6 bg-white rounded-lg shadow-lg"
        >
          <Input
            label={"Name"}
            register={register}
            type={"text"}
            name={"name"}
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

          <Input
            label={"Password"}
            register={register}
            type={"password"}
            name={"password"}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />

          <button
            disabled={isUpdating}
            className="p-2 mt-4 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            type="submit"
          >
            Update your information
          </button>
        </form>
      )}
    </>
  );
}

export default MyAccount;
