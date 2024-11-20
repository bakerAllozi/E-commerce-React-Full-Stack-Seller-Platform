/*eslint react/prop-types:0*/

const Input = ({
  register,
  type = "text",
  name,
  label,
  min = 1,
  max = 5,
  step = "0.01",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-3">
      {type !== "number" ? (
        <input
          accept={type === "file" ? "image/*" : undefined}
          type={type}
          className="rounded-md h-10 px-3 border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow duration-300 ease-in-out"
          {...register(name)}
          required
          placeholder={label || placeholder}
        />
      ) : (
        <input
          type="number"
          className="rounded-md h-10 px-3 border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow duration-300 ease-in-out"
          {...register(name)}
          max={max}
          min={min}
          step={step}
          required
          placeholder={label || placeholder}
        />
      )}
    </div>
  );
};

export default Input;
