/*eslint react/prop-types:0*/

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination } from "swiper/modules";
import BoxBroduct from "../../../../features/Homepage/ui/BoxBroduct";
import useRedux from "../../../../hooks/useRedux";
import ShowProduct from "../../../../features/Homepage/ui/ShowProduct";

import { Swiper, SwiperSlide } from "swiper/react";

const YouMayLike = ({ ProductDetails }) => {
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);
  const dataMayLike = Data.filter(
    (arr) => arr.category === ProductDetails.category
  );
  return (
    <div className=" w-[100%] relative">
      <h1 className=" text-[5vw] sm:text-[10vw]   font-bold text-red-600 mx-3">
        You May Like
      </h1>
      <ShowProduct
        noTime={false}
        noSwiper={false}
        noButton={false}
        buttonText="View All Products"
        noTextAbout={false}
      >
        <Swiper
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {dataMayLike?.map((product) => (
            <SwiperSlide key={product.id}>
              <BoxBroduct product={product} idItem={product.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowProduct>
    </div>
  );
};
export default YouMayLike;
