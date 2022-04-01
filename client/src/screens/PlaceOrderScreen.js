import React from "react"
import { useSelector } from "react-redux"
import CheckoutStep from "../components/CheckoutStep"

function PlaceOrderScreen({ step1, step2, step3, step4 }) {
  const cart = useSelector((state) => state.cart)
  const { cartItems, shipping, payment } = cart

  function format2Decimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = format2Decimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = format2Decimal(cart.itemsPrice > 100 ? 10 : 0)

  cart.taxPrice = format2Decimal(cart.itemsPrice * 0.1)

  cart.totalPrice = format2Decimal(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )

  const saveOrderhandler = () => {
    console.log("order now")
  }
  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <div className='bg-white mt-5 px-8 py-8 rounded shadow-lg text-gray-700 w-full border border-gray-100 '>
        <CheckoutStep step1 step2 step3 step4 />

        <h2 className='mb-8 text-gray-700 text-2xl text-center'>Order</h2>

        <div className='grid md:grid-cols-3 md:gap-12 lg:gap-32 place-content-center '>
          <div className='md:col-span-2'>
            <div className='mb-4'>
              <h2 className='font-semibold'>Shipping Address</h2>
              <p className='text-sm'>
                {shipping.address}, {shipping.city} {shipping.postCode},{" "}
                {shipping.country}
              </p>
            </div>

            <div className='mb-4'>
              <h2 className='font-semibold'>Payment Method</h2>
              <p className='text-sm'>{payment}</p>
            </div>

            <div className='mb-4'>
              <h2 className='font-semibold mb-2'>My orders</h2>

              <ul className='divide-y-2 divide-gray-100 space-y-4 flex flex-col'>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className='flex justify-between items-center text-sm'
                  >
                    <img
                      className='w-18 h-10 rounded'
                      src={item.image}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                    <span>
                      {item.qty} X {item.price} = {item.qty * item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='md:col-span-1 w-full bg-white rounded'>
            <ul className='px-28 divide-y-2 divide-gray-100 md:px-2'>
              <li className='p-2'>
                <h2 className='text-xl text-center'>Order Summary</h2>
              </li>
              <li className='flex justify-between py-2 px-4'>
                <p>Items Price</p>
                <span>${cart.itemsPrice}</span>
              </li>
              <li className='flex justify-between py-2 px-4'>
                <p>Shipping</p>
                <span>${cart.shippingPrice}</span>
              </li>
              <li className='flex justify-between py-2 px-4'>
                <p>Tax</p>
                <span>${cart.taxPrice}</span>
              </li>
              <li className='flex justify-between py-2 px-4'>
                <p className='font-semibold'>Total</p>
                <span>${cart.totalPrice}</span>
              </li>
              <li className='p-2'>
                <button
                  disabled={cart.cartItems.length === 0}
                  type='submit'
                  className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                  onClick={saveOrderhandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen
