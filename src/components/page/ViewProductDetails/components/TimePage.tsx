import { useEffect, useState } from "react";

const Time = () => {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  let startTime: number;

  useEffect(() => {
    startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeElapsed = Math.floor((Date.now() - startTime) / 1000); // تحويل للثواني
      setTimeSpent(timeElapsed);
      console.log(`لقد قضيت ${timeElapsed} ثانية هنا!`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">مرحبًا بك في هذه الصفحة</h2>
      <p>سيتم حساب الوقت الذي تقضيه هنا!</p>
    </div>
  );
};

export default Time;
