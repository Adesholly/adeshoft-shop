import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, listUsers } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useNavigate } from "react-router-dom"

function UserListScreen() {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate("/login")
    }
  }, [dispatch, userInfo, navigate, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are sure you want to delete?")) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <h2 className='mb-8 text-gray-700 text-xl'>Users List</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className='rounded-lg shadow-gray-200 overflow-auto'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-4 border-gray-200'>
              <tr>
                <th className='p-3 text-left tracking-wide text-sm'>ID</th>
                <th className='p-3 text-left tracking-wide text-sm'>NAME</th>
                <th className='p-3 text-left tracking-wide text-sm'>EMAIL</th>
                <th className='p-3 text-left tracking-wide text-sm'>AMDIN</th>
                <th className='p-3 text-left tracking-wide text-sm'></th>
              </tr>
            </thead>
            <tbody className='bg-gray-50 divide-y-2 divide-gray-100  text-sm'>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className='odd:bg-white hover:bg-gray-200 even:bg-gray-100'
                >
                  <td className='uppercase px-3 py-1 whitespace-nowrap'>
                    {user._id}
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>{user.name}</td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    <a href={`mailto:${user.email}`}> {user.email}</a>
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    {user.isAdmin ? (
                      <i className='fa-regular fa-circle-check'></i>
                    ) : (
                      <i className='fa-regular fa-circle-xmark'></i>
                    )}
                  </td>

                  <td className='px-3 py-2  whitespace-nowrap'>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button>
                        <i className='fas fa-edit'></i>
                      </button>
                    </Link>
                    <button
                      className='ml-4'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserListScreen
