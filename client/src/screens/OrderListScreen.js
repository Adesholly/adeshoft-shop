import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Message from "../components/Message"
import { listOrders } from "../actions/orderAction"
import Loader from "../components/Loader"

function OrderListScreen() {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate("/login")
    }
  }, [userInfo, dispatch, navigate])

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'>
        <h2 className='mb-8 text-gray-700 text-xl'>Order List</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <div className='rounded-lg shadow-gray-200 overflow-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100 border-b-4 border-gray-200'>
                <tr>
                  <th className='p-3 text-left tracking-wide text-sm'>ID</th>
                  <th className='p-3 text-left tracking-wide text-sm'>USER</th>
                  <th className='p-3 text-left tracking-wide text-sm'>DATE</th>
                  <th className='p-3 text-left tracking-wide text-sm'>TOTAL</th>
                  <th className='p-3 text-left tracking-wide text-sm'>PAID</th>
                  <th className='p-3 text-left tracking-wide text-sm'>
                    DELIVERED
                  </th>
                  <th className='p-3 text-left tracking-wide text-sm'></th>
                </tr>
              </thead>
              <tbody className='bg-gray-50 divide-y-2 divide-gray-100  text-sm'>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className='uppercase px-3 py-1 whitespace-nowrap'>
                      {order._id}
                    </td>
                    <td className='px-3 py-2  whitespace-nowrap'>
                      {order.user.name}
                    </td>
                    <td className='px-3 py-2  whitespace-nowrap'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='px-3 py-2  whitespace-nowrap'>
                      ${order.totalPrice}
                    </td>
                    <td className='px-3 py-2  whitespace-nowrap'>
                      {order.isPaid ? (
                        <span>
                          Paid<i className='fa-regular fa-circle-check'></i>
                        </span>
                      ) : (
                        <span>
                          Not Paid{" "}
                          <i className='fa-regular fa-circle-xmark'></i>
                        </span>
                      )}
                    </td>

                    <td className='px-3 py-2  whitespace-nowrap'>
                      {order.isDelivered ? (
                        <span>
                          Delivered
                          <i className='fa-regular fa-circle-check'></i>
                        </span>
                      ) : (
                        <span>
                          Delivery
                          <i className='fa-regular fa-circle-xmark'></i>
                        </span>
                      )}
                    </td>
                    <td className='px-3 py-2  whitespace-nowrap'>
                      <Link to={`/order/${order._id}`}>
                        <button
                          type='button'
                          className='bg-gray-100 text-gray-400 hover:bg-gray-200 p-2 shadow-sm rounded'
                        >
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderListScreen
