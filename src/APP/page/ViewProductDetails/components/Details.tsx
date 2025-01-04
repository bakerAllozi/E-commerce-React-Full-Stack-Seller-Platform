import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useLikedProducts from "../../../../hooks/useLikedProducts";
import { gitCartItem } from "../../../../features/Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import useWishlistAndCart from "../../../../hooks/useWishlistAndCart";
import useCartActions from "../../../../hooks/useCartActions";
import "swiper/css";
import { showChatUser } from "../../../../features/User/userSlice";
import useUser from "../../../../hooks/useUser";
import Stars from "../../../../features/Homepage/ui/Stars";
import useRedux from "../../../../hooks/useRedux";
import { MyProductType } from "@/types/product.type";
const Details = ({
  ProductDetails,
  productId,
}: {
  ProductDetails: MyProductType;
  productId: string;
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isLiked, handleLiked } = useLikedProducts(ProductDetails);

  const { dispatch, appSelector } = useRedux();
  const { cartData, handelIncrease, handelDecrease } = useCartActions();
  const updateQuantity = cartData?.find((e) => e.id === productId);

  const { checkIfItIsInCart, itemStatus } = useWishlistAndCart(ProductDetails);

  const handelViewProduct = () => {
    checkIfItIsInCart
      ? navigate("/Cart")
      : dispatch(
          gitCartItem([{ ...ProductDetails, price2: ProductDetails.price }])
        );
    navigate("/Cart");
  };

  const { forHowYouChat } = appSelector((state) => state.UserData);
  const { name, avatar } = forHowYouChat as {
    name: string;
    avatar: string;
  };

  const handelOpenChatPage = () => {
    if (!user) {
      navigate("/Login");
      return;
    }
    dispatch(
      showChatUser({
        receiverId: ProductDetails.userId,
        userId: user.id,
        seller_name: name,
        avatar,
      })
    );
    navigate(`/ChatPage`);
  };

  return (
    <div className=" flex flex-col  gap-5  sm:px-4 w-[350px] sm:w-[400px]  h-[100vh]">
      <h1 className="font-bold text-lg">{ProductDetails.title}</h1>
      <p
        onClick={() => handelOpenChatPage()}
        className="flex items-center gap-2 text-blue-600 font-bold text-lg cursor-pointer"
      >
        <span>Contact the seller</span>
        <span className="text-gray-500 text-base font-normal">
          (Contact Seller)
        </span>
      </p>
      <div className=" flex gap-5 ">
        <Stars numStare={ProductDetails.rating.rate} />
        <p className="text-[#aaa]">
          ({ProductDetails.rating.count.toFixed(0)} Reviews)
        </p>
        |<p className="text-green-500 text-sm  "> it {itemStatus}</p>
      </div>
      <h2 className=" font-bold">${ProductDetails.price}</h2>
      <p>{ProductDetails.description}</p>

      <hr />

      <div className=" flex gap-3  items-center ">
        <label>Colors:</label>
        <div className="flex gap-1 ">
          <p
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: ProductDetails.color.color1,
              cursor: "pointer",
            }}
          ></p>
          <p
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: ProductDetails.color.color2,
              cursor: "pointer",
            }}
          ></p>
        </div>
      </div>
      <div className=" flex gap-3  items-center ">
        <label>Size:</label>
        <div className="flex gap-1 ">
          <p className=" w-[20px] h-[20px] rounded-md flex text-sm p-2 justify-center items-center hover:bg-[red] hover:text-white border-[1px] border-black cursor-pointer">
            XS
          </p>
          <p className=" w-[20px] h-[20px] rounded-md flex text-sm p-2 justify-center items-center hover:bg-[red] hover:text-white border-[1px] border-black cursor-pointer">
            S
          </p>
          <p className=" w-[20px] h-[20px] rounded-md flex text-sm p-2 justify-center items-center hover:bg-[red] hover:text-white border-[1px] border-black cursor-pointer">
            M
          </p>
          <p className=" w-[20px] h-[20px] rounded-md flex text-sm p-2 justify-center items-center hover:bg-[red] hover:text-white border-[1px] border-black cursor-pointer">
            L
          </p>
          <p className=" w-[20px] h-[20px] rounded-md flex text-sm p-2 justify-center items-center hover:bg-[red] hover:text-white border-[1px] border-black cursor-pointer">
            M
          </p>
        </div>
      </div>
      <div className="flex gap-6">
        {itemStatus === "Out Of Stock" ? (
          <p className="  font-bold"> Out Of Stock</p>
        ) : (
          <>
            {checkIfItIsInCart && (
              <div className="flex gap-4 justify-between  border-[1px] rounded-sm  w-20 h-8">
                <p
                  className="bg-red-600 text-white  p-2  border-[1px] flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    updateQuantity.quantity === 1 ||
                    handelDecrease(updateQuantity.id)
                  }
                >
                  -
                </p>
                <p>{updateQuantity.quantity}</p>
                <p
                  className="bg-red-600 text-white  p-2  border-[1px] flex justify-center items-center cursor-pointer"
                  onClick={() => handelIncrease(ProductDetails.id)}
                >
                  +
                </p>
              </div>
            )}

            <button
              className=" p-1 px-8 rounded-sm bg-red-600 text-white "
              onClick={() => handelViewProduct()}
            >
              Buy Now
            </button>
          </>
        )}

        <p
          className=" border-[1px] border-black flex justify-center items-center w-fit px-[5px]  cursor-pointer"
          onClick={handleLiked}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${isLiked && "text-red-600"}`}
          />
        </p>
      </div>
      <div className=" border-black flex flex-col items-center mt-10  ">
        <h1 className=" border-[1px] border-black p-4 w-[100%] h-24 ">
          <p className="font-bold">Free Delivery</p>
          <p>Enter your postal code for Delivery Availability</p>
        </h1>
        <h1 className="border-[1px] border-black p-4 w-[100%] h-24   ">
          <p className="font-bold">Return Delivery</p>
          <p>Free 30 Days Delivery Returns. Details</p>
        </h1>
      </div>
    </div>
  );
};

export default Details;
