import React, { useState } from "react"
import {
  UserIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid"
import { Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions.js"

function Navbar() {
  const [openNavbar, setOpenNavbar] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <nav className='bg-gray-600 shadow-lg mb-4'>
        <div className='sm:flex sm:justify-between items-center px-16 lg:px-32 py-2'>
          <div className='flex justify-between items-center'>
            <div>
              <Link to='/'>
                <img
                  src='/images/logo.svg'
                  alt='Logo'
                  className='h-12 md:h-14'
                />
              </Link>
            </div>

            <div className='sm:hidden'>
              <button
                className='cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none'
                type='button'
                onClick={() => setOpenNavbar(!openNavbar)}
              >
                {!openNavbar ? (
                  <MenuIcon className='h-8 w-8 text-white' />
                ) : (
                  <XIcon className='h-8 w-8 text-white' />
                )}
              </button>
            </div>
          </div>

          <div className={`${openNavbar ? "block" : "hidden"}  sm:flex`}>
            <ul className='px-4 py-2 sm:flex'>
              <Link to='cart'>
                <li className='nav-item flex text-white hover:bg-gray-500 px-4 sm:px-2 rounded py-1 font-semibold leading-snug'>
                  <h2>Cart</h2>
                  <ShoppingCartIcon className='h-6 w-6 text-white' />
                </li>
              </Link>
              {userInfo ? (
                <div className='flex'>
                  <div className='relative inline-block text-left'>
                    <Menu>
                      {({ open }) => (
                        <>
                          <span className='rounded-md shadow-sm'>
                            <Menu.Button
                              className='inline-flex justify-center w-full text-white transition duration-150 ease-in-out
                             bg-gray-600 border-none border-gray-300 hover:bg-gray-500 px-4 sm:px-2 rounded py-1 font-semibold leading-snug  focus:outline-none focus:border-blue-300 focus:shadow-outline-blue '
                            >
                              <span>
                                {userInfo.name.split(" ")[0].toUpperCase()}
                              </span>
                              <svg
                                className='w-5 h-5 ml-2 -mr-1'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </Menu.Button>
                          </span>

                          <Transition
                            show={open}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              static
                              className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                            >
                              <div className='px-4 py-3'>
                                <p className='text-sm leading-5'>
                                  Signed in as
                                </p>
                                <p className='text-sm font-medium leading-5 text-gray-900 truncate'>
                                  {userInfo.email}
                                </p>
                              </div>

                              <div className='py-1'>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='/profile'
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                    >
                                      <span>Account settings</span>
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='#'
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                    >
                                      Support
                                    </Link>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='#'
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                    >
                                      License
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>

                              <div className='py-1'>
                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      onClick={logoutHandler}
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                    >
                                      Sign out
                                    </span>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              ) : (
                <Link to='login'>
                  <li className='nav-item flex text-white hover:bg-gray-500 px-4 py-1 rounded font-bold leading-snug'>
                    <h2>Signin</h2>
                    <UserIcon className='h-5 w-5 text-white' />
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
