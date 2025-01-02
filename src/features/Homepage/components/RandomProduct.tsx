import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useRedux from "../../../hooks/useRedux";
import Spinner from "../../../ui/Spinner";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../../index.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import MyProductType from "../../../types/product.type";

function RandomProduct() {
  const { appSelector } = useRedux();

  const { randomProduct } = appSelector((state) => state.product);

  const progressCircle = useRef<HTMLDivElement | null>(null);
  const progressContent = useRef<HTMLDivElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      {!randomProduct.length ? (
        <Spinner />
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {randomProduct?.map((data: MyProductType) => (
            <SwiperSlide
              className="w-full h-full relative bg-white gap-14"
              key={data.id}
            >
              <div className="flex justify-around border-[1px] border-gray-300 p-1">
                <div className="flex justify-center flex-col w-48 gap-12 p-4 overflow-x-hidden">
                  <p className="h-6 overflow-y-hidden sm:text-md font-bold">
                    {data.title}
                  </p>
                  <h1 className="font-bold text-md sm:text-2xl">
                    Up to {data.discount}% off Voucher
                  </h1>
                  <Link
                    to={`/${data.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <p className="border-b-black border-b-2">Buy Now</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
                <div className="relative w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
                  <img
                    src={data.image}
                    alt={data.id}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default RandomProduct;
