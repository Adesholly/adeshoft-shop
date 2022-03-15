import React, { useState } from "react"
import {
  UserIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid"
import { Link } from "react-router-dom"

function Navbar() {
  const [openNavbar, setOpenNavbar] = useState(false)

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

          <div className={openNavbar ? "block" : "hidden " + "sm:flex"}>
            <ul className='px-4 py-2 sm:flex'>
              <li className='nav-item flex text-white hover:bg-gray-500 px-4 sm:px-2 rounded py-1 font-semibold leading-snug'>
                <Link to='cart'>Cart</Link>
                <ShoppingCartIcon className='h-6 w-6 text-white' />
              </li>

              <li className='nav-item flex text-white hover:bg-gray-500 px-4 py-1 rounded font-bold leading-snug'>
                <Link to='register'>Signin</Link>
                <UserIcon className='h-5 w-5 text-white' />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
