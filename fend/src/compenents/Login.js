import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  let [data, setData] = useState({ "_id": "", "pwd": "" })
  let [msg, setMsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()
  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  let login = () => {
    axios.post("http://localhost:5000/login", data).then((res) => {
      if (res.data.token == undefined) {
        setMsg(res.data.msg)
      }
      else {
        obj.updcon(res.data)
        navigate("/")
      }
    })
  }
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='bg-white rounded-lg shadow-md p-6 w-1/2'>
        <div className='text-center mb-4'>
          <h2 className='text-2xl font-bold'>Login</h2>
        </div>
        <div className='text-red-500 text-sm mb-4'>{msg}</div>
        <div className='mb-4'>
          <input type='text' placeholder='Enter Email' name="_id" onChange={fun} value={data._id} className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <div className='mb-4'>
          <input type='password' placeholder='Enter Password' name="pwd" onChange={fun} value={data.pwd} className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <button onClick={login} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Login</button>
        <div className='text-sm text-gray-500 mt-4'>
          <Link to="/fpwd" className='text-blue-500 hover:text-blue-700'>Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login