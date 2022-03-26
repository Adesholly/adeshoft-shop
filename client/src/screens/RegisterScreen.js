import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate, useLocation } from "react-router"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"

function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const distpach = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const registerUserHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("The password doesn't match")
    } else {
      distpach(register(name, email, password))
    }
  }
  return (
    <>
      <div>
        <div className='overflow-auto flex flex-col'>
          <div className='container max-w-sm mx-auto flex-1 items-center justify-center px-1'>
            <div className='bg-white mt-16 px-8 py-8 rounded shadow-lg text-black w-full border border-gray-100'>
              <h1 className='mb-8 text-gray-700 text-3xl text-center'>
                Register
              </h1>
              {loading && <Loader />}
              {message && <Message>{message}</Message>}
              {error && <Message>{error}</Message>}
              <form>
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
                  onSubmit={registerUserHandler}
                >
                  Create Account
                </button>

                <div className='text-center text-sm text-grey-dark mt-4'>
                  <div className='text-grey-dark mt-4'>
                    Already have an account?
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      className='font-bold text-gray-900 hover:text-gray-700 ml-1'
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen
