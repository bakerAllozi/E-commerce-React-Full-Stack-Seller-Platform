import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faHeadphones,
  faTruckFast,
  faVault,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Information() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 s  ">
      <ReuseableItem
        text1="FREE AND FAST DELIVERY"
        text2="  Free delivery for all orders over $140"
        icon={faTruckFast}
      />
      <ReuseableItem
        text1="MONEY BACK GUARANTEE"
        text2="We reurn money within 30 days"
        icon={faVault}
      />
      <ReuseableItem
        text1="24/7 CUSTOMER SERVICE"
        text2="  Friendly 24/7 customer support"
        icon={faHeadphones}
      />
    </div>
  );
}
const ReuseableItem = ({
  icon,
  text1,
  text2,
}: {
  icon: IconProp;
  text1: string;
  text2: string;
}) => {
  return (
    <div className=" flex  flex-col gap-3 items-center justify-center">
      <h1 className=" w-12 h-12 p-2 rounded-full bg-black text-white flex justify-center items-center border-8  border-[#aaa] ">
        <FontAwesomeIcon icon={icon} />
      </h1>
      <h1 className=" font-bold text-lg"> {text1}</h1>
      <p className="  text-[#aaa] text-sm">{text2}</p>
    </div>
  );
};

export default Information;
