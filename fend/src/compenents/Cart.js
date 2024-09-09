import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import {MdDeleteSweep} from "react-icons/md"

const Cart = () => {
  let obj = useContext(Ct)
  let [cart, setCart] = useState([])
  let [f, setF] = useState(true)
  let [ctotal, settotal] = useState(0)
  let navigate = useNavigate()

  useEffect(() => {
    if (obj.usercon.token == "") {
      navigate("/login")
    } else {
      axios.get(`http://localhost:5000/getcart/${obj.usercon._id}`, { "headers": { "Authorization": obj.usercon.token } }).then((res) => {
        setCart(res.data)
        obj.updcon({ "nofitems": res.data.length })
        let t = 0
        for (let item of res.data) {
          t = t + (item.price * (100 - item.dct) / 100) * item.qty
        }
        settotal(t)
      })
    }
  }, [f])

  let dec = (id, qty) => {
    if (qty > 1) {
      axios.put("http://localhost:5000/dec", { "_id": id }, { "headers": { "Authorization": obj.usercon.token } }).then(() => {
        setF((f) => !f)
      })
    } else {
      del(id)
    }
  }
  let del = (id) => {
    axios.delete(`http://localhost:5000/delcart/${id}`, { "headers": { "Authorization": obj.usercon.token } }).then(() => {
      setF(!f)
    })
  }
  let inc = (id) => {
    axios.put("http://localhost:5000/inc", { "_id": id }, { "headers": { "Authorization": obj.usercon.token } }).then(() => {
      setF(!f)
    })
  }

  return (
    <div className="container mx-auto p-4">
      {cart.length == 0 && <div className="text-lg text-center text-gray-500 p-4">Your cart is empty</div>}
      {cart.length > 0 && (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-center mb-4">
                  <img src={`http://localhost:5000/imgs/${item.pimg}`} alt={item.name} className="w-48 h-48 object-cover" />
                </div>
                <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                <p className="text-gray-500 mb-2">Category: {item.cat}</p>
                <p className="text-gray-500 mb-2">Price: {item.price}</p>
                <p className="text-gray-500 mb-2">Discount: {item.dct}%</p>
                <div className="flex justify-normal mb-2">
                  <div
                    onClick={() => dec(item._id, item.qty)}
                    className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
                     hover:bg-red-400 group transition-all">
                    <AiOutlineMinus fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
                </div>

                  <span className="text-xl justify-center">{item.qty}</span>
                  <div
                    onClick={() => inc(item._id)}
                    className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
                     hover:bg-red-400 group transition-all">
                    <AiOutlinePlus fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
                </div>
                </div>
                <p className="text-lg font-bold mb-2">Discount Price: {(item.price * (100 - item.dct) / 100) * item.qty}</p>
                {/* <button onClick={} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button> */}
                <div
                  onClick={() => del(item._id)}
                    className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
                     hover:bg-red-400 group transition-all">
                    <MdDeleteSweep fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
                </div>
              </div>
            ))}
          </div>
          <div className="text-lg font-bold mt-4">Total: {ctotal}</div>
        </div>
      )}
    </div>
  )
}

export default Cart