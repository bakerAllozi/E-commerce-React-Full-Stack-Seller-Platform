import useRedux from '../../hooks/useRedux';
import BoxBroduct from '@/APP/features/Homepage/ui/BoxBroduct';
import { useParams } from 'react-router-dom';

function ViewByCategory() {
  const { categoryName } = useParams();
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);

  // تأكد من أن Data ليست undefined قبل الفلترة
  const categoryProduct = Data ? Data.filter((e) => e.category === categoryName) : [];

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold">{categoryName}</h1>

      {/* عرض المنتجات داخل BoxBroduct
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {categoryProduct.length > 0 ? (
          categoryProduct.map((product) => <BoxBroduct key={product.id} product={product} />)
        ) : (
          <p className="text-gray-500">لا توجد منتجات لهذه الفئة.</p>
        )}
      </div> */}
    </div>
  );
}

export default ViewByCategory;
