import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { listMyOrder } from "../actions/orderAction"
import { getUserDetail, updateUserDetail } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

function ProfileScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const myOrder = useSelector((state) => state.myOrder)
  const { loading: loadingMyOrder, myorder, error: errorMyOrder } = myOrder

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetail("profile"))
        dispatch(listMyOrder())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, navigate, user, dispatch])

  const updateUserProfileHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("The password doesn't match")
    } else {
      dispatch(updateUserDetail({ id: user._id, name, email, password }))
    }
  }

  return (
    <>
      <div className='grid grid-flow-row sm:grid-cols-2 gap-4 px-16 lg:px-32 py-2 mt-4 overflow-auto'>
        <div className=''>
          <h2 className='mb-8 text-gray-700 text-3xl'>Edit your Profile</h2>
          {loading && <Loader />}
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {success && <Message>Profile Update!!!</Message>}

          <form className=''>
            <input
              type='text'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='name'
              autoComplete='username'
              placeholder='Full Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

            <input
              type='text'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='email'
              autoComplete='email'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />

            <input
              type='password'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='password'
              autoComplete='current-password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            <input
              type='password'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              name='password'
              autoComplete='current-password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              required
            />

            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
              onClick={updateUserProfileHandler}
            >
              Update
            </button>
          </form>
        </div>
        <div className=''>
          <h2 className='mb-8 text-gray-700 text-3xl'>My Orders</h2>
          <div className='rounded-lg shadow-gray-50'>
            {loadingMyOrder && <Loader />}{" "}
            {errorMyOrder && <Message>{errorMyOrder}</Message>}
            {myorder && (
              <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                  <tr>
                    <th className='p-3 text-left tracking-wide text-sm'>ID</th>
                    <th className='w-28 p-3 text-left tracking-wide text-sm'>
                      DATE
                    </th>
                    <th className='p-3 text-left tracking-wide text-sm'>
                      PRICE
                    </th>
                    <th className='p-3 text-left tracking-wide text-sm'>
                      PAYMENT
                    </th>
                    <th className='p-3 text-left tracking-wide text-sm'>
                      DELIVERY
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-gray-50/50 divide-y divide-gray-100 text-sm'>
                  {myorder.map((order) => (
                    <tr key={order._id}>
                      <td className='uppercase px-3 py-1 whitespace-nowrap'>
                        {order._id}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
