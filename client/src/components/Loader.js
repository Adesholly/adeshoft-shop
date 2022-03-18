import React from "react"
import ClipLoader from "react-spinners/ClipLoader"

function Loader() {
  return (
    <>
      <div className='text-center m-auto'>
        <ClipLoader />
      </div>
    </>
  )
}

export default Loader
