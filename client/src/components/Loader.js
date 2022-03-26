import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"

function Loader() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      <div className='text-center m-auto'>
        <ClipLoader loading={loading} css='' size={30} />
      </div>
    </>
  )
}

export default Loader
