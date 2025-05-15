import useRedux from "@/hooks/useRedux";
import { getDataToRecommend } from "@/store/features/RecommenderSystems/RecommenderSlice";
import { MyProductType } from "@/types/product.type";
import { useEffect, useState } from "react";

const TimePage = ({
  dataItime,
  UserId,
  productsLiked
}: {
  dataItime: MyProductType;
  UserId: string;
  productsLiked: string[];
}) => {
  const { dispatch } = useRedux();

  const [timeSpent, setTimeSpent] = useState<number>(0);
  let startTime: number;

  useEffect(() => {
    startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeElapsed = Math.floor((Date.now() - startTime) / 1000); 
      setTimeSpent(timeElapsed);
      console.log(`لقد قضيت ${timeElapsed} ثانية هنا!`);
      if (timeElapsed < 1) return;
      dispatch(getDataToRecommend({
        timeSpent: timeElapsed,
        productId: dataItime.id,
        Category: dataItime.category,
        productsLiked
      }));  
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

export default TimePage;
