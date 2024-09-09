import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let [prod,setProd]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/getprod").then((res) => {
            setProd(res.data)
        })
    })

    let addcart = (item) => {
        let prodobj={"pid":item._id,"uid":obj.usercon._id,"qty":1,"pimg":item.pimg,"name":item.name,"cat":item.cat,"dct":item.dct,"price":item.price}
        axios.post("http://localhost:5000/addcart",prodobj,{"headers":{"Authorization":obj.usercon.token}}).then(()=>{
            navigate("/cart")

        })
    }
    let km = (item) => {
        obj.updcon({"prod":item})
        navigate("/km")
    }

    let editProd = (item) => {
        navigate(`/editprod/${item._id}`)
    }
    let deleteProd = (item) => {
        axios.delete(`http://localhost:5000/deleteprod/${item._id}`,{headers:{Authorization:obj.usercon.token}}).then(()=>{
            setProd(prod.filter((p)=>p._id !== item._id))
        })
     }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Product Listing</h1>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
                {prod.map((item) => (
                    <div key={item.id} className="flex flex-col items-center justify-between w-full gap-3 p-4 rounded-xl border-2 border-[#00095] shadow-lg hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in">
                        <div>
                            <p className="text-[#1d783e] font-semibold text-lg text-left truncate w-40 mt-1">{item.name}</p>
                        </div>
                        <div>
                            <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{item.cat.split(" ").slice(0, 10).join(" ") + "..."}</p>
                        </div>

                        <div className="h-[180px]">
                            <img className="h-full w-full object-cover" src={`http://localhost:5000/imgs/${item.pimg}`} alt="p" />
                        </div>

                        <div className="flex flex-wrap justify-between items-center w-full mt-5">
                            <div className="w-full flex justify-between mb-2">
                                <p className="text-green-600 font-semibold">${item.price}</p>
                                <p className="text-green-600 font-semibold">${item.dct}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <button className="bg-gray-700 hover:bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-full" onClick={() => km(item)}>Know More</button>
                                    {obj.usercon.token !== "" && (
                                <button className="bg-gray-700 hover:bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-full" onClick={() => addcart(item)}>Cart</button>
                                )}
                                {obj.usercon.token !== "" && obj.usercon.role === "admin" && (
                                    <>
                                        <button className="bg-gray-700 hover:bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-full" onClick={() => editProd(item)}>Edit</button>
                                        <button className="bg-gray-700 hover:bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-full" onClick={() => deleteProd(item)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home