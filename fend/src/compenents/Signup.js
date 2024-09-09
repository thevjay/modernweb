import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let navigate = useNavigate()
  let [msg, setMsg] = useState("")
  let [data, setdata] = useState({ "_id": "", "name": "", "place": "", "phno": "", "pwd": "", "role": "" })
  let fun = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  let reg = () => {
    axios.post("http://localhost:5000/adduser", data).then((res) => {
      if (res.data.msg == "reg done") {
        navigate("/login")
        setMsg("")
      }
      else {
        setMsg(res.data.msg)
      }

    })
  }
  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='bg-white rounded-lg shadow-md p-6 w-1/2'>
        <div className='text-center mb-4'>
          <h2 className='text-2xl font-bold'>Signup</h2>
        </div>
        <div className='text-red-500 text-sm mb-4'>{msg}</div>
        <div className='mb-4'>
          <input type='text' placeholder='Enter Email' value={data._id} onChange={fun} name="_id" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <div className='mb-4'>
          <input type='text' placeholder='Enter Name' value={data.name} onChange={fun} name="name" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <div className='mb-4'>
          <input type='text' placeholder='Enter Place' value={data.place} onChange={fun} name="place" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <div className='mb-4'>
          <input type='text' placeholder='Enter Phone Number' value={data.phno} onChange={fun} name="phno" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <div className='mb-4'>
          <select value={data.role} onChange={fun} name="role" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='mb-4'>
          <input type='password' placeholder='Enter Password' value={data.pwd} onChange={fun} name="pwd" className='w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
        </div>
        <button onClick={reg} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Signup</button>
      </div>
    </div>
  )
}

export default Signup;