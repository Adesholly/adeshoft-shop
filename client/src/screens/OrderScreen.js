import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getOrderDetail, getOrderPay } from "../actions/orderAction"
import Message from "../components/Message"
import Loader from "../components/Loader"
import axios from "axios"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

import { ORDER_PAY_RESET } from "../constants/OrderConstants"

function PlaceOrderScreen() {
  const orderDetail = useSelector((state) => state.orderDetail)
  const { loading, error, order } = orderDetail

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const { id } = useParams()
  const dispatch = useDispatch()
  const initailOption = {
    "client-id":
      "AZncpkArhzCsckSsASbWAPtEQERHQqd1_qaHP0NeDjZ9eyxiwX15P9GWWxtetnkp8vE6T8d4AVQ0MYIT",
    currency: "USD",
    intent: "capture",
  }

  useEffect(() => {
    dispatch({
      type: ORDER_PAY_RESET,
    })
    if (!order.isPaid || successPay) {
      dispatch(getOrderDetail(id))
    }
  }, [dispatch, id])

  const orderPayHandler = (paymentResult) => {
    dispatch(getOrderPay(id, paymentResult))
    console.log(paymentResult)
  }
  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <div className='bg-white mt-5 px-8 py-8 rounded shadow-lg text-gray-700 w-full border border-gray-100 '>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <h1 className='mb-8 text-gray-700 text-2xl uppercase text-center'>
              Order ID: {id}
            </h1>
            <div className='grid md:grid-cols-3 md:gap-12 lg:gap-32 place-content-center '>
              <div className='md:col-span-2'>
                <div className='mb-4'>
                  <h2 className='font-semibold text-lg'>User Details</h2>
                  <p className='text-sm px-4'>
                    <span className='text-gray-900'>Name:</span>
                    <span className='ml-8'>{order.user.name}</span>
                  </p>
                  <p className='text-sm px-4'>
                    <span className='text-gray-900'>Email:</span>
                    <a className='ml-8' href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>

                  <p className='text-sm px-4 mb-3'>
                    <span className='text-gray-900'>Address:</span>
                    <span className='ml-4'>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postCode},{" "}
                      {order.shippingAddress.country}
                    </span>
                  </p>
                  <div className='text-sm px-4'>
                    {order.isDelivered ? (
                      <Message>Delivered on {order.deliveredAt}</Message>
                    ) : (
                      <Message>Not Delivered</Message>
                    )}
                  </div>
                </div>

                <div className='mb-4'>
                  <h2 className='font-semibold'>Payment Method</h2>
                  <p className='text-sm mb-3 px-4'>{order.paymentMethod}</p>
                  <div className='text-sm px-4'>
                    {order.isPaid ? (
                      <Message>Paid on {order.paidAt}</Message>
                    ) : (
                      <Message>Not Paid</Message>
                    )}
                  </div>
                </div>

                <div className='mb-4'>
                  <h2 className='font-semibold mb-2'>My orders</h2>

                  <ul className='divide-y-2 divide-gray-100 space-y-4 flex flex-col'>
                    {order.orderItems.map((item, index) => (
                      <li
                        key={index}
                        className='flex justify-between items-center text-sm px-4'
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
                    <span>${order.itemsPrice}</span>
                  </li>
                  <li className='flex justify-between py-2 px-4'>
                    <p>Shipping</p>
                    <span>${order.shippingPrice}</span>
                  </li>
                  <li className='flex justify-between py-2 px-4'>
                    <p>Tax</p>
                    <span>${order.taxPrice}</span>
                  </li>
                  <li className='flex justify-between py-2 px-4'>
                    <p className='font-semibold'>Total</p>
                    <span>${order.totalPrice}</span>
                  </li>
                  <li className='p-2'>
                    {!order.isPaid && (
                      <PayPalScriptProvider options={initailOption}>
                        <PayPalButtons
                          amount={order.totalPrice}
                          onClick={orderPayHandler}
                        />
                      </PayPalScriptProvider>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PlaceOrderScreen
