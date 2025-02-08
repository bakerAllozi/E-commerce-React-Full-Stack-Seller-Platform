import '../../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../ui/Loading';
import useReadChats from '../hooks/useReadChats';
import useUser from '../hooks/useUser';
import useRedux from '../hooks/useRedux';
import usePublicUser from '../hooks/usePublicUser';
import { getDataOfProduct } from '../backend/apiDataOfProduct';

const Cart = lazy(() => import('@/components/features/Cart/Cart'));
const MyAccount = lazy(
  () => import('@/components/features/User/components/MyAccount')
);
const CheckOut = lazy(() => import('@/components/features/CheckOut/CheckOut'));
const EditProducts = lazy(
  () => import('@/components/features/User/components/EditProducts')
);
const ChatPage = lazy(
  () => import('@/components/features/User/components/cahtUser/ChatPage')
);

const MessageNotifications = lazy(
  () =>
    import(
      '@/components/features/User/components/cahtUser/MessageNotifications'
    )
);
const Login = lazy(() => import('@/components/features/auth/Login'));
const SignUp = lazy(() => import('@/components/features/auth/SignUp'));

const Homepage = lazy(() => import('@/components/features/Homepage/Homepage'));
const AddNewProduct = lazy(
  () => import('@/components/features/User/components/AddNewProduct')
);
const Wishlist = lazy(() => import('@/components/features/Wishlist/Wishlist'));
const UserPage = lazy(() => import('@/components/features/User/UserPage'));

const ContactPage = lazy(() => import('@/components/page/ContactPage'));
const About = lazy(() => import('@/components/page/About'));
const LikePage = lazy(() => import('@/components/page/LikePage'));
const ViewByCategory = lazy(() => import('@/components/page/ViewByCategory'));
const ViewProductDetails = lazy(
  () => import('@/components/page/ViewProductDetails/ViewProductDetails')
);

const Error = lazy(() => import('@/ui/Error/Error'));

const Commentpage = lazy(
  () => import('../components/Navbar/components/Comment/Commentpage')
);
import AppLayout from './AppLayout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { MyProductType } from '../types/product.type';
import ProtectedRoute from '@/APP/ProtectedRoute';
import {
  fetchProductItem,
  gitBestSellingProducts,
  gitRandomProduct,
} from '@/components/features/Homepage/HomepageSlice';
import {
  getDataChats,
  splitDataChat,
  setNewAvatarUser,
} from '@/components/features/User/userSlice';
import { getProductToWishlist } from '@/components/features/Wishlist/wishlistSlice';

function App() {
  const { dispatch, appSelector } = useRedux();
  const { user } = useUser();
  const userId = user?.id;
  const { data } = useQuery<MyProductType[]>({
    queryKey: ['DataOfProduct'],
    queryFn: getDataOfProduct,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { Data } = appSelector((state) => state.product);

  const { data: chatData } = useReadChats(userId || '');

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
    'pk_test_51QPYMAKxnNgqIQklhBT5FTH7UU1rPPpPP78wG0n7dsGfze107LYUk1WhLbMs5mzZj6DPfYOpRkLQD88UvgZdbD6P00dGYGvcBE'
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
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
            <Route path="Gg" element={<EditProducts />} />
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
