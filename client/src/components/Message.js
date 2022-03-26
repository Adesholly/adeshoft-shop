import React from "react"

function Message({ children }) {
  return (
    <div>
      <div
        className='bg-gray-100  border-l-8 border-gray-500 m-10 text-gray-700 p-4'
        role='alert'
      >
        {children}
      </div>
    </div>
  )
}

export default Message
