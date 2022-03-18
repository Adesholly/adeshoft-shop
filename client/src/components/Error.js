import React from "react"

function Error({ children }) {
  return (
    <div>
      <div
        className='bg-gray-100  border-l-8 border-gray-500 m-10 lg:mx-40 md:mx-30 text-gray-700 p-4'
        role='alert'
      >
        <p className='font-bold'>Error!!!</p>
        {children}
      </div>
    </div>
  )
}

export default Error
