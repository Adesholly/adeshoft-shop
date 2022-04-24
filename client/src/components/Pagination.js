import React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

function Pagination({ pages, page, counts, isAdmin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <>
        <div className='flex-1 flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing <span className='font-medium'>{page}</span> to{" "}
              <span className='font-medium'>{10 * page}</span> of{" "}
              <span className='font-medium'>{counts}</span> results
            </p>
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <Link
                to='#'
                className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </Link>

              {[...Array(pages).keys()].map((x) => (
                <>
                  <Link
                    key={x + 1}
                    to={
                      !isAdmin
                        ? keyword
                          ? `/search/${keyword}/page/${x + 1}`
                          : `/page/${x + 1}`
                        : `/admin/productlist/${x + 1}`
                    }
                    aria-current='page'
                    className='z-10 bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  >
                    {x + 1}
                  </Link>
                </>
              ))}

              <Link
                to='#'
                className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </Link>
            </nav>
          </div>
        </div>
      </>
    )
  )
}

export default Pagination
