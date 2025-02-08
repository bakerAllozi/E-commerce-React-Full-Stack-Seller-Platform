import { useEffect } from 'react';
import useRedux from '../../hooks/useRedux';
import { setCategoryName } from '@/APP/features/Homepage/HomepageSlice';
import BoxBroduct from '@/APP/features/Homepage/ui/BoxBroduct';

function ViewByCategory() {
  const { appSelector, dispatch } = useRedux();
  const { categoryName } = appSelector((state) => state.product);
  useEffect(() => {
    dispatch(setCategoryName(categoryName[0]?.category));
  }, []);
  return (
    <div className="flex    flex-row  flex-wrap  gap-16 justify-evenly">
      {categoryName.map((arr) => (
        <div key={arr.id}>
          <BoxBroduct product={arr} idItem={arr.id} />
        </div>
      ))}
    </div>
  );
}

export default ViewByCategory;
