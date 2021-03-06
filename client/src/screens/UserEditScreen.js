import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowCircleLeftIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router"

import { editUser, getUserDetail } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { USER_UPDATE_RESET } from "../constants/userConstants"

function UserEditScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userEdit = useSelector((state) => state.userEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit

  useEffect(() => {
    if (successEdit) {
      dispatch({
        type: USER_UPDATE_RESET,
      })
      navigate("/admin/userlist")
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetail(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, id, navigate, successEdit])

  const userEditHandler = (e) => {
    e.preventDefault()
    dispatch(
      editUser({
        _id: id,
        name,
        email,
        isAdmin,
      })
    )
  }

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'>
        <Link to='/admin/userlist'>
          <ArrowCircleLeftIcon className='h-6 w-6 mb-2' />
        </Link>
        <div className='flex flex-col items-center'>
          <h2 className='mb-8 text-gray-700 text-xl'>Edit User</h2>
          {loadingEdit && <Loader />}
          {errorEdit && <Message>{errorEdit}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <form className='flex flex-col'>
              <input
                type='text'
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='name'
                autoComplete='username'
                placeholder='Fullname'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />

              <input
                type='text'
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='email'
                autoComplete='email'
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <div className='flex items-center mb-4'>
                <input
                  type='checkbox'
                  className='form-checkbox text-gray-500 focus:ring-gray-600 mx-2'
                  id='isAdmin'
                  checked={isAdmin}
                  onChange={(e) => {
                    setIsAdmin(e.target.checked)
                  }}
                />
                <label htmlFor=''> Make this user an Admin?</label>
              </div>

              <button
                type='submit'
                className='w-[300px] text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                onClick={userEditHandler}
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default UserEditScreen
