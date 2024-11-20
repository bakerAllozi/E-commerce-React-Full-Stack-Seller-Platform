import PropTypes from "prop-types";

const Input = ({
  register,
  type = "text",
  name,
  label,
  placeholder = "",
  min = 1,
  max = 5,
  step = 1,
  required = true,
  additionalClasses = "",
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-gray-700 font-medium text-sm sm:text-base"
        >
          {label}
        </label>
      )}

      {type !== "number" ? (
        <input
          id={name}
          type={type}
          accept={type === "file" ? "image/*" : undefined}
          placeholder={placeholder}
          className={`w-full  px-3  py-3   rounded-md border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-shadow duration-300 ease-in-out ${additionalClasses}`}
          {...register(name)}
          required={required}
        />
      ) : (
        <input
          id={name}
          type="number"
          placeholder={placeholder}
          className={`w-full h-10 px-3 rounded-md border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-shadow duration-300 ease-in-out ${additionalClasses}`}
          {...register(name)}
          min={min}
          max={max}
          step={step}
          required={required}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  required: PropTypes.bool,
  additionalClasses: PropTypes.string,
};

export default Input;
