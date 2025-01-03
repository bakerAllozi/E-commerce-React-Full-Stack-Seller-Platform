import "../../index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/Loading";
import useReadChats from "../hooks/useReadChats";
import useUser from "../hooks/useUser";
import useRedux from "../hooks/useRedux";
import usePublicUser from "../hooks/usePublicUser";
import {
  fetchProductItem,
  gitBestSellingProducts,
  gitRandomProduct,
} from "../features/Homepage/HomepageSlice";
import {
  getDataChats,
  splitDataChat,
  setNewAvatarUser,
} from "../features/User/userSlice";
import { getProductToWishlist } from "../features/Wishlist/wishlistSlice";
import { getDataOfProduct } from "../services/apiDataOfProduct";

const Cart = lazy(() => import("../features/Cart/Cart"));
const MyAccount = lazy(() => import("../features/User/components/MyAccount"));
const CheckOut = lazy(() => import("../ui/CheckOut"));
const Gg = lazy(() => import("../features/User/components/Gg"));

const ChatPage = lazy(
  () => import("../features/User/components/cahtUser/ChatPage")
);

const MessageNotifications = lazy(
  () => import("../features/User/components/cahtUser/MessageNotifications")
);
const Login = lazy(() => import("../features/auth/Login"));
const SignUp = lazy(() => import("../features/auth/SignUp"));

const Homepage = lazy(() => import("../features/Homepage/Homepage"));
const ContactPage = lazy(() => import("./page/ContactPage"));

const About = lazy(() => import("./page/About"));
const Wishlist = lazy(() => import("../features/Wishlist/Wishlist"));
const LikePage = lazy(() => import("./page/LikePage"));
const UserPage = lazy(() => import("../features/User/UserPage"));
const Error = lazy(() => import("../ui/Error"));
const ViewByCategory = lazy(() => import("./page/ViewByCategory"));
const ViewProductDetails = lazy(
  () => import("./page/ViewProductDetails/ViewProductDetails")
);
const AddNewProduct = lazy(
  () => import("../features/User/components/AddNewProduct")
);
const Commentpage = lazy(
  () => import("../components/Navbar/components/Comment/Commentpage")
);
import AppLayout from "./AppLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { MyProductType } from "../types/product.type";

function App() {
  const { dispatch, appSelector } = useRedux();
  const { user } = useUser();
  const userId = user?.id;
  const { data } = useQuery<MyProductType[]>({
    queryKey: ["DataOfProduct"],
    queryFn: getDataOfProduct,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { Data } = appSelector((state) => state.product);

  const { data: chatData } = useReadChats(userId || "");

  const { data: ALLUserData } = usePublicUser();

  const updateData = useCallback(() => {
    if (data) {
      const updatedData = data.map((item: MyProductType) => ({
        ...item,
        quantity: 1,
      }));
      dispatch(fetchProductItem(updatedData));
    }
  }, [data, dispatch]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    if (Data && chatData && userId && ALLUserData) {
      dispatch(gitRandomProduct());
      dispatch(gitBestSellingProducts());
      dispatch(getProductToWishlist(Data));
      dispatch(getDataChats(chatData));
      dispatch(setNewAvatarUser(ALLUserData));
      dispatch(splitDataChat(userId));
    }
  }, [Data, chatData, dispatch, userId, ALLUserData]);

  const stripePromise: Promise<Stripe | null> = loadStripe(
    "pk_test_51QPYMAKxnNgqIQklhBT5FTH7UU1rPPpPP78wG0n7dsGfze107LYUk1WhLbMs5mzZj6DPfYOpRkLQD88UvgZdbD6P00dGYGvcBE"
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="Contact" element={<ContactPage />} />
            <Route path="About" element={<About />} />
            <Route path="Cart" element={<Cart />} />

            <Route
              path="CheckOut"
              element={
                <Elements stripe={stripePromise}>
                  <CheckOut />
                </Elements>
              }
            />
            <Route path="LikePage" element={<LikePage />} />
            <Route path="Wishlist" element={<Wishlist />} />
            <Route path="Messages" element={<MessageNotifications />} />
            <Route path="UserPage" element={<UserPage />} />
            <Route path="MyAccount" element={<MyAccount />} />
            <Route path="CategoryPage" element={<ViewByCategory />} />
            <Route path="AddNewProduct" element={<AddNewProduct />} />
            <Route path="ChatPage" element={<ChatPage />} />
            <Route path="Commentpage" element={<Commentpage />} />
            <Route path="Gg" element={<Gg />} />
            <Route path="/:productId" element={<ViewProductDetails />} />
            <Route path="*" element={<Error />} />
          </Route>

          <Route path="SignUp" element={<SignUp />} />
          <Route path="LogIn" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
