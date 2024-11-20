/*eslint react/prop-types:0*/

import Time from "../ui/Time";

function MusicBox() {
  return (
    <div className="  text-white  w-screen  h-[500px]    relative     flex  flex-col-reverse lg:flex-row  lg:gap-4 items-center  justify-around bg-black p-2 md:p-10">
      <div className="  flex flex-col gap-5 lg:gap-10 justify-center items-center  ">
        <p className="  text-[#00FF66]  "> Categories</p>
        <h1 className=" text-[15px]  sm:text-[20px]  font-bold">
          Enhance Your Music Experience
        </h1>
        <Time
          setSecond={3}
          setMinute={33}
          setHour={4}
          setDay={5}
          timer2On={true}
        />
        <button className=" bg-[#00FF66] text-white w-[130px] h-[40px]  md:w-[171px] md:h-[57px] p-1 ">
          Buy Now!
        </button>
      </div>
      <div className=" relative  w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]  lg:w-[300px] lg:h-[300px]        ">
        <img
          src="Frame 694.png"
          alt="Frame"
          className="  absolute w-[100%] h-[100%]   top-0 left-0 "
        />
      </div>
    </div>
  );
}

export default MusicBox;
