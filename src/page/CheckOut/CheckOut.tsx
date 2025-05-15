import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useRedux from '@/hooks/useRedux';
import useUpdateProducts from '@/hooks/useUpdateProducts';
import { RemoveALLFromCart } from '@/store/features/Cart/CartSlice';

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { dispatch, appSelector } = useRedux();
  const [status, setStatus] = useState('');
  const { cartData } = appSelector((state) => state.cartItem);
  const navigate = useNavigate();
  const { updateMultipleProducts, isLoading } = useUpdateProducts();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setStatus('خطأ: لم يتم العثور على عنصر البطاقة');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setStatus(`خطأ: ${error.message}`);
    } else {
      setStatus('تم الدفع بنجاح!');
      const productsToUpdate = cartData.map((item) => ({
        id: item.id,
        updateData: {
          ...item,
          piecesRemaining: Number(item.piecesRemaining - item.quantity),
        },
      }));

      productsToUpdate.forEach(
        (product: { updateData: { quantity?: number; price2?: number } }) => {
          delete product.updateData.quantity;
          delete product.updateData.price2;
        }
      );

      updateMultipleProducts(productsToUpdate);
      dispatch(RemoveALLFromCart());
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        إتمام الدفع
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="card-element" className="block text-gray-600 mb-2">
            أدخل تفاصيل بطاقة الائتمان
          </label>
          <div className="border p-4 rounded-lg">
            <CardElement id="card-element" className="focus:outline-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'جارٍ التحديث...' : 'دفع'}
        </button>

        {status && (
          <p className="text-center mt-4 text-lg text-green-600 font-semibold">
            {status}
          </p>
        )}

        {cartData?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">محتويات السلة:</h3>
            <ul>
              {cartData.map((item) => (
                <li key={item.id} className="text-gray-600">
                  {item.name} - {item.price2} دينار - كمية: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOut;
