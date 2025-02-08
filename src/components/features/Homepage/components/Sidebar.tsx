import { useNavigate } from 'react-router-dom';
import { setCategoryName } from '../HomepageSlice';
import useRedux from '@/hooks/useRedux';

function Sidebar() {
  return (
    <>
      <div
        className={`  
         bg-black text-white font-bold hidden sm:text-[1vw] w-full  p-4  sm:flex  items-center flex-row justify-around gap-2  cursor-pointer  `}
      >
        <CreateNaveLink categoryName="Woman’s Fashion" />
        <CreateNaveLink categoryName="Men’s Fashion" />
        <CreateNaveLink categoryName="Electronics" />
        <CreateNaveLink categoryName="Home & Lifestyle" />
        <CreateNaveLink categoryName="Medicine" />
        <CreateNaveLink categoryName="Sports & Outdoor" />
        <CreateNaveLink categoryName="Baby’s & Toys" />
        <CreateNaveLink categoryName="Groceries & Pets" />
        <CreateNaveLink categoryName="Health & Beauty" />
      </div>
    </>
  );
}

const CreateNaveLink = ({ categoryName }: { categoryName: string }) => {
  const navigate = useNavigate();
  const { dispatch } = useRedux();

  const handleBaker = () => {
    navigate('/CategoryPage');
    dispatch(setCategoryName(categoryName));
  };
  return (
    <div className="" onClick={() => handleBaker()}>
      {categoryName}
    </div>
  );
};

export default Sidebar;
