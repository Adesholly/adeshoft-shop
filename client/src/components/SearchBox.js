import React, { useState } from "react"
import { useNavigate } from "react-router"

function SearchBox() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate("/")
    }
  }
  return (
    <div>
      <form className='relative mx-auto' onSubmit={searchHandler}>
        <div className='bg-white rounded-full'>
          <input
            type='search'
            className='bg-transparent peer z-10 cursor-pointer relative h-10 w-10  pl-12 outline-none focus:w-full focus:cursor-text focus:border-gray-300 focus:pl-16 focus:pr-4'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute  cursor-pointer inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-gray-300 peer-focus:stroke-gray-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
