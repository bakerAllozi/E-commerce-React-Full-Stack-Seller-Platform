/*eslint react/prop-types:0*/

function Button({
  children,
  bgColor = false,
  textColor,
  handelRemoveALLFromCart,
}) {
  return (
    <div
      onClick={handelRemoveALLFromCart}
      className={`w-[122px] h-[24px] rounded-md  flex justify-center  text-sm  hover:bg-red-600 hover:text-white
          cursor-pointer items-center py-5 px-1 ${
            bgColor ? "bg-red-600" : "border-[2px]"
          } ${textColor}`}
    >
      {children}
    </div>
  );
}

export default Button;
