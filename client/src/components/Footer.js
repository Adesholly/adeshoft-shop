import React from "react"

function Footer() {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <>
      <footer>
        <div className='flex items-center justify-center my-10'>
          Copyright &copy;{year} Adeshoft Shop
        </div>
      </footer>
    </>
  )
}

export default Footer
