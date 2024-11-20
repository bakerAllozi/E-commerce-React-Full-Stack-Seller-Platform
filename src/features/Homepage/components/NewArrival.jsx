import ShowProduct from "../ui/ShowProduct";
function NewArrival() {
  return (
    <ShowProduct title="New Arrival" viewBecause="Featured">
      <div className="     w-[200vh] h-[100vh] relative ">
        <img
          src="Frame2.png"
          alt="Frame"
          className="  w-full h-full absolute"
        />
      </div>
    </ShowProduct>
  );
}

export default NewArrival;
