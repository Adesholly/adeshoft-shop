import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
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

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetail("profile"))
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
      <div className='grid grid-flow-row sm:grid-cols-2 px-16 lg:px-32 py-2 mt-4 '>
        <div className=''>
          <h2 className='mb-8 text-gray-700 text-3xl'>Upadate your Profile</h2>
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
          <h2 className='mb-8 text-gray-700 text-3xl text-center'>My Order</h2>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
