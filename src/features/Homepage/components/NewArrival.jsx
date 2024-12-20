import ShowProduct from "../ui/ShowProduct";
import Image from "../../../assets/Frame2.png";

function NewArrival() {
  return (
    <ShowProduct title="New Arrival" viewBecause="Featured">
      <div className="     w-[200vh] h-[100vh] relative ">
        <img src={Image} alt="Frame" className="  w-full h-full absolute" />
      </div>
    </ShowProduct>
  );
}

export default NewArrival;
