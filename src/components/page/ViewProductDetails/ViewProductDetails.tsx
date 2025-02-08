import useRedux from '../../../hooks/useRedux';
import { useParams } from 'react-router-dom';
import Details from './components/Details';
import YouMayLike from './components/YouMayLike';
import ProductReviews from './components/ProductReviews';
import useReviews from '../../../hooks/useReviews';
import { MyProductType } from '@/types/product.type';

function ViewProductDetails() {
  const { appSelector } = useRedux();
  const { productId } = useParams();
  const productIdAsString = String(productId);
  const { data: Reviews } = useReviews(productIdAsString);
  const { Data } = appSelector((state) => state.product);
  const ProductDetails: MyProductType[] | any = Data.find(
    (e) => e.id === productId
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 sm:gap-10 justify-center items-center md:items-start md:h-[100vh] flex-col md:flex-row mb-4">
        <div className="h-[40vh] sm:h-[60vh] md:h-[80vh] w-[100%] md:w-[600px] lg:w-[700px] bg-black relative border-[30px]">
          <img
            src={ProductDetails.image}
            className="w-[100%] h-[100%] absolute top-0 left-0"
            alt="Product"
          />
        </div>
        <Details
          ProductDetails={ProductDetails}
          productId={productIdAsString}
        />
      </div>
      <ProductReviews reviews={Reviews || []} productId={productIdAsString} />

      <YouMayLike ProductDetails={ProductDetails} />
    </div>
  );
}

export default ViewProductDetails;
