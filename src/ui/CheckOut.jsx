import { useState } from "react";
import useRedux from "../hooks/useRedux";
import { RemoveALLFromCart } from "../features/Cart/CartSlice";

export default function CheckOut() {
  const { dispatch } = useRedux();
  const [agreed, setAgreed] = useState(false);

  const handlePayPalCheckout = (e) => {
    e.preventDefault();
    if (agreed) {
      dispatch(RemoveALLFromCart());
      alert("Processing PayPal payment...");
    } else {
      alert("You must agree to the terms and conditions before proceeding.");
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          PayPal Checkout
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Complete your purchase securely with PayPal.
        </p>
      </div>
      <form
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handlePayPalCheckout}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2.5">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="paypal-account"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              PayPal Account
            </label>
            <div className="mt-2.5">
              <input
                id="paypal-account"
                name="paypal-account"
                type="email"
                autoComplete="email"
                placeholder="your-email@example.com"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="card-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Credit Card Number
            </label>
            <div className="mt-2.5">
              <input
                id="card-number"
                name="card-number"
                type="text"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="expiry-date"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Expiry Date
            </label>
            <div className="mt-2.5">
              <input
                id="expiry-date"
                name="expiry-date"
                type="text"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              CVV
            </label>
            <div className="mt-2.5">
              <input
                id="cvv"
                name="cvv"
                type="text"
                autoComplete="cc-csc"
                placeholder="123"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <input
            id="agreed"
            name="agreed"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
        <div className="mt-6">
          <button
            onClick={handlePayPalCheckout}
            className="w-full flex justify-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Pay with PayPal
          </button>
        </div>
      </form>
    </div>
  );
}
