/*eslint react/prop-types:0*/

import { insertNewComment } from "../../../../../services/apiComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Input from "../../../../../ui/Input";
import { useForm } from "react-hook-form";

function Form({ setShowForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const uniqueId = uuidv4();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row) => insertNewComment(row),
    onSuccess: () => {
      alert("Comment posted successfully");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      reset();
    },
    onError: (err) => alert(err.message),
  });

  async function onSubmit(newRow) {
    const newRowWithId = {
      ...newRow,
      id: uniqueId,
      yourRating: Number(newRow.yourRating),
    };

    mutate(newRowWithId);
    setShowForm(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:border-2 border-gray-300 rounded-md min-w-[300px] h-[400px] flex flex-col gap-5 p-6 shadow-lg bg-white"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Post a Comment
      </h2>

      <Input
        label={"Your Name"}
        register={register}
        type={"text"}
        name={"yourName"}
        errors={errors}
      />

      <Input
        label={"Comment"}
        register={register}
        type={"text"}
        name={"comment"}
      />

      <Input
        label={"Your Rating"}
        register={register}
        type={"number"}
        name={"yourRating"}
        min={1}
        max={5}
      />

      <button
        disabled={isLoading}
        className="p-2  mt-8 rounded-sm bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300 disabled:bg-gray-400"
        type="submit"
      >
        {isLoading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default Form;
