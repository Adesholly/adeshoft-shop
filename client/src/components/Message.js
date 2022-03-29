import React from "react"

function Message({ children }) {
  return (
    <div>
      <div
        className='bg-gray-100 w-full items-center border-l-8 border-gray-500 text-gray-700 p-4 mb-4'
        role='alert'
      >
        {children}
      </div>
    </div>
  )
}

export default Message
