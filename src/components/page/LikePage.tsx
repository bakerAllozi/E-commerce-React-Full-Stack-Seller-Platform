import { Link } from 'react-router-dom';
import useRedux from '../../hooks/useRedux';
import useUser from '../../hooks/useUser';
import BoxBroduct from '@/APP/features/Homepage/ui/BoxrPoduct';
function LikePage() {
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);
  const { user } = useUser();
  if (!user) return;

  const productsILiked = Data.filter((e) => e.product_like?.includes(user.id));

  return (
    <>
      {productsILiked.length > 0 ? (
        <div className=" mt-[100px]  bg-slate-800/20 backdrop-blur-sm  " >
          <h1 className="  text-center mb-12 text-red-700   font-bold text-[30px] ">
            Product Liked
          </h1>
          <div className="flex    flex-row  flex-wrap  gap-16 justify-evenly ">
            {productsILiked.map((data) => (
              <div key={data.id} data-testid="like-product">
                <BoxBroduct product={data} idItem={data.id} noButton={true} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Link
          to="/"
          className=" flex justify-center  items-center  bg-red-700 text-white p-2 rounded-sm"
        >
          You haven`t Liked product press to Back Home
        </Link>
      )}
    </>
  );
}

export default LikePage;
