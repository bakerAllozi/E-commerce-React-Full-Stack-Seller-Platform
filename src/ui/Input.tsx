interface InputProps {
  register: (name: string) => {
    onChange: () => void;
    onBlur: () => void;
    ref: (instance: HTMLInputElement | null) => void;
  };
  type?: "text" | "number" | "email" | "password" | "file";
  name: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  additionalClasses?: string;
}

const Input = ({
  register,
  type = "text",
  name,
  label,
  placeholder = "",
  min,
  max,
  step = 1,
  required = true,
  additionalClasses = "",
}: InputProps) => {
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
          className={`w-full px-3 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-shadow duration-300 ease-in-out ${additionalClasses}`}
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

export default Input;
