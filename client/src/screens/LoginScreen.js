import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const loginFormHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div>
      <div className='overflow-auto flex flex-col'>
        <div className='container max-w-sm mx-auto flex-1 items-center justify-center px-1'>
          <div className='bg-white mt-16 px-8 py-8 rounded shadow-lg text-black w-full border border-gray-100'>
            <h1 className='mb-8 text-gray-700 text-3xl text-center'>Login</h1>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            <form>
              <input
                type='email'
                required
                className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                autoComplete='email'
                name='email'
                value={email}
                placeholder='Email'
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
                value={password}
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />

              <button
                type='submit'
                className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                onClick={loginFormHandler}
              >
                Login
              </button>

              <div className='text-center text-sm text-grey-dark mt-4'>
                <div className='text-grey-dark mt-4'>
                  New Customer?
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    <span className='font-bold text-gray-900 hover:text-gray-700 ml-1'>
                      Register
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
