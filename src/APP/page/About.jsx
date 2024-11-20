/*eslint react/prop-types:0*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowProduct from "../../features/Homepage/ui/ShowProduct";
import {
  faLuggageCart,
  faMoneyBill,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons/faMoneyBillAlt";
import Information from "../../features/Homepage/components/Information";

function About() {
  return (
    <div className="flex justify-center items-center flex-col gap-[150px]  mt-12 container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  ">
        <span className=" max-w-96 ">
          <h1 className=" text-[30px] ">Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region. Exclusive has more than 1 Million products to
            offer, growing at a very fast. Exclusive offers a diverse assotment
            in categories ranging from consumer.
          </p>
        </span>
        <img
          className=" w-[5006px]"
          src="../../public/black-friday-elements-assortment_23-2149074075.avif"
        />
      </div>
      <ShowProduct
        title="Browse By Category"
        viewBecause="Categories"
        noTextAbout={false}
        NoWScreen={false}
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm ">
          <BoxCategory name="Mopnthly Produduct Sale" icons={faMoneyBill} />
          <BoxCategory
            name="Customer active in our site"
            icons={faLuggageCart}
          />
          <BoxCategory
            name="Anual gross sale in our site"
            icons={faMoneyBillAlt}
          />
          <BoxCategory name="Sallers active our site" icons={faStore} />
        </div>
      </ShowProduct>
      <Information />
    </div>
  );
}
const BoxCategory = ({ name, icons }) => {
  return (
    <div className="  cursor-pointer border-2 w-44 h-44  flex justify-center items-center  flex-col gap-5  hover:bg-red-600  hover:text-white">
      <FontAwesomeIcon icon={icons} className="w-[30px] h-[30px]" />
      <p>{name}</p>
    </div>
  );
};

export default About;
