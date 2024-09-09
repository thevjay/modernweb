import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { RiFileAddFill } from "react-icons/ri";
import Ct from './Ct'

const Nav = () => {
  let obj = useContext(Ct)
  return (
    <nav className='flex justify-between items-center py-4 bg-gray-100'>
      <Link to="/" className='text-lg font-bold text-gray-800'>Products</Link>
      <ul className='flex items-center'>
        {obj.usercon.token === "" && (
          <li className='mr-4'>
            <Link to="/login" className='text-gray-600 hover:text-red-600'>Login</Link>
          </li>
        )}
        {obj.usercon.token === "" && (
          <li className='mr-4'>
            <Link to="/signup" className='text-gray-600 hover:text-red-600'>Signup</Link>
          </li>
        )}
        {obj.usercon.token !== "" && obj.usercon.role === "admin" && (
          <li className='mr-4'>
            <Link to="/addprod" className='text-gray-600 hover:text-gray-900'>
              <RiFileAddFill className='text-3xl' />
            </Link>
          </li>
        )}
        {obj.usercon.token !== "" && (
          <li className='mr-4'>
          <Link to="/cart" className='text-gray-600 hover:text-gray-900 flex justify-center items-center relative'>
            <FaShoppingCart className='text-3xl' />
            {
              obj.usercon.nofitems > 0 &&
              <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                {obj.usercon.nofitems}
              </span>
            }
          </Link>
        </li>
        )}
        {obj.usercon.token !== "" && (
          <li className='mr-4'>
            <Link to="/logout" className='text-gray-600 hover:text-gray-900'>Logout</Link>
          </li>
        )}
        {obj.usercon.token !== "" && (
          <li>
            <div className='text-gray-600 mr-4'>{obj.usercon.name}</div>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav