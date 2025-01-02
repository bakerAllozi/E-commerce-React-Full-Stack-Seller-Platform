import MyProductType from "@/types/product.type";
import useCartActions from "../../../hooks/useCartActions";

function BoxItem() {
  return (
    <div className=" text-sm  sm:text-lg">
      <TitleRow />
      <Purchases />
    </div>
  );
}
const TitleRow = () => {
  return (
    <div className=" h-[72px]  shadow-md flex justify-around  gap-[10px]    items-center  ">
      <span className="w-[100px] flex justify-center items-center gap-3 sm:w-[250px]  ">
        Product
      </span>
      <span className="w-[60px]">Price</span>
      <span className="w-[100px]">Quantity</span>
      <span className="w-[60px]  flex justify-center items-center gap-3">
        Subtotal
      </span>
    </div>
  );
};

const Purchases = () => {
  const { cartData, handelIncrease, handelDecrease } = useCartActions();

  return (
    <div className=" w-[100%]">
      {cartData.map((data: MyProductType) => (
        <div
          key={data.id}
          className=" h-[72px] flex  justify-around      items-center  shadow-md  "
        >
          <span className="flex justify-around  items-center gap-3 w-[100px] sm:w-[250px]">
            <img src={data.image} className=" w-10 h-10" />
            <p className=" text-[] ">
              {data.title.split(" ").slice(0, 3).join(" ")}
            </p>
          </span>
          <span className=" w-[60px] ">
            <span>$</span>
            {data.price}
          </span>
          <span className="w-[100px] ">
            <div className=" w-14   border-2  rounded-sm   flex  justify-around items-center   ">
              <p>{data.quantity}</p>
              <div className=" flex flex-col  gap-3 items-center p-1">
                <p
                  className=" w-4 h-4   p1 flex  items-center justify-center cursor-pointer   "
                  onClick={() => handelIncrease(data.id)}
                >
                  +
                </p>
                <p
                  className="w-4 h-4 p1 flex  items-center justify-center  cursor-pointer "
                  onClick={() => data.quantity === 1 || handelDecrease(data.id)}
                >
                  -
                </p>
              </div>
            </div>
          </span>

          <span className="  w-[60px] flex justify-center items-center gap-3">
            <span>$</span> {data.price2 || data.price}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BoxItem;
