/*eslint react/prop-types:0*/

import { useEffect, useRef, useState } from "react";

function Time({
  setDay = 3,
  setHour = 2,
  setMinute = 3,
  setSecond = 5,
  timer2On = false,
}) {
  const targetTime = new Date();
  targetTime.setDate(targetTime.getDate() + setDay);
  targetTime.setHours(targetTime.getHours() + setHour);
  targetTime.setMinutes(targetTime.getMinutes() + setMinute);
  targetTime.setSeconds(targetTime.getSeconds() + setSecond);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let intervalRef = useRef();

  const calculateRemainingTime = () => {
    const now = new Date();
    const remainingTime = targetTime - now;

    setDays(Math.floor(remainingTime / (1000 * 60 * 60 * 24)));
    setHours(
      Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    setMinutes(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((remainingTime % (1000 * 60)) / 1000));
  };

  useEffect(() => {
    intervalRef.current = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {timer2On ? (
        <div className=" flex gap-4  sm:gap-4 ">
          <Timer2 timeIn="days" num={days} />

          <Timer2 timeIn="hours" num={hours} />

          <Timer2 timeIn="minutes" num={minutes} />

          <Timer2 timeIn="seconds" num={seconds} />
        </div>
      ) : (
        <div className="flex  gap-5  sm:gap-5 items-center justify-center ">
          <Timer timeIn="days" num={days} />
          <span className=" text-[15px] sm:text-[30px] text-red-700 ">:</span>
          <Timer timeIn="hours" num={hours} />
          <span className=" text-[15px] sm:text-[30px] text-red-700 ">:</span>
          <Timer timeIn="minutes" num={minutes} />
          <span className=" text-[15px] sm:text-[30px] text-red-700 ">:</span>
          <Timer timeIn="seconds" num={seconds} />
        </div>
      )}
    </>
  );
}
const Timer = ({ timeIn, num }) => {
  return (
    <div>
      <span className=" flex flex-col gap-3 justify-center items-center text-[15px] sm:text-[20px] lg:text-[25px] sm:w-[30px] md:w-[40px] lg:w-[60px]">
        <p>{timeIn}</p>
        <p className="  font-bold ">{num}</p>
      </span>
    </div>
  );
};
const Timer2 = ({ timeIn, num }) => {
  return (
    <p className="  z-30    text-sm  sm:text-lg flex-col p-6  sm:p-10 bg-white  flex items-center justify-center  rounded-full w-[8px] h-[8px]  sm:w-16 sm:h-16 text-black ">
      <span className=" font-bold">{num}</span>
      <span className="text-[10px]">{timeIn}</span>
    </p>
  );
};
export default Time;
