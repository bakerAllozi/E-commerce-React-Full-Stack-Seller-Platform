import { useEffect } from 'react';
import BoxBroduct from '../../features/Homepage/ui/BoxBroduct';
import useRedux from '../../hooks/useRedux';
import { setCategoryName } from '../../features/Homepage/HomepageSlice';

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
