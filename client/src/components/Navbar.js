import React, { useState } from "react"

function Navbar() {

  const [openNavbar,  setOpenNavbar] = useState(false)

  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify px-2 py-3 bg-blue-400 shadow-lg mb-4">
        <div className="container px-4 mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full relative flex justify-between lg:w-auto lg-static lg:block lg:justify">
            <a href="" className=" font-bold leading-relaxed inline-block mr-4 py-2 px-14 ">

              <img src="" alt="" />
              <span className="whitespace-nowrap uppercase text-white text-lg">Adeshoft Shop</span>
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outlinnone focus:outline-none"
              type="button" onClick={() => setOpenNavbar(!openNavbar)}
             
            >
              <div className="p-2 space-y-1.5 ">
                <span className="block w-6 h-0.5 bg-gray-100"></span>
                <span className="block w-8 h-0.5 bg-gray-100"></span>
                <span className="block w-6 h-0.5 bg-gray-100 "></span>
              </div>
            </button>

          </div>
          <div className={"lg:flex flex-grow items-center " + (openNavbar ? "flex" : "hidden")} id="myNavbar">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item text-white">
                <a className="lg:px-3 px-14 py-2 flex items-center font-bold leading-snug hover:opacity-75" href="register">
                  Cart
                </a>
              </li>
              <li className="nav-item text-white">
                <a className="lg:px-3 px-14 py-2 flex items-center font-bold leading-snug hover:opacity-75" href="login">
                  Signin
                </a>
              </li>
            </ul>
          </div>

        </div>

      </nav>
    </div>
  )
}

export default Navbar
