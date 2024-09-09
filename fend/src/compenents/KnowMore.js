import React, { useContext, useEffect, useState } from 'react';
import Ct from './Ct';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Km = () => {
  let [rv, setRv] = useState({"desc": ""});
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  let navigate = useNavigate();

  let fun = (e) => {
    setRv({...rv, [e.target.name]: e.target.value});
  };

  let obj = useContext(Ct);
  let [item, setItem] = useState({"reviews": []});

  useEffect(() => {
    if (obj.usercon.token === "" || obj.usercon.prod === undefined) {
      navigate("/login");
    } else {
      setItem(obj.usercon.prod);
    }
  }, []);

  let addcart = (item) => {
    let prodobj={"pid":item._id,"uid":obj.usercon._id,"qty":1,"pimg":item.pimg,"name":item.name,"cat":item.cat,"dct":item.dct,"price":item.price}
    axios.post("http://localhost:5000/addcart",prodobj,{"headers":{"Authorization":obj.usercon.token}}).then(()=>{
        navigate("/cart")

    })
}
  let addrv = () => {
    axios.put("http://localhost:5000/addrv", {"name": obj.usercon.name, "pid": item._id, ...rv, "rating": value}, {"headers": {"Authorization": obj.usercon.token}}).then((res) => {
      setItem(res.data);
      setRv({"desc": ""});
      setValue(2);
    });
  };

  return (
    <div className="prod bg-white shadow-md rounded px-4 py-6">
      <div className="pimg mb-4">
        <img src={`http://localhost:5000/imgs/${item.pimg}`} className="w-full h-64 object-cover rounded"  alt='p'/>
      </div>
      <p className="text-lg font-bold">Name: {item.name}</p>
      <p className="text-gray-600">Cat: {item.cat}</p>
      <p className="text-gray-600">Price: {item.price}</p>
      <p className="text-gray-600">Discount: {item.dct}</p>
      <p className="text-gray-600">Desc: {item.desc}</p>
      <div className="flex justify-center mb-4">
        { obj.usercon.token !== "" && <button onClick={() => addcart(item)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button> }
      </div>

      <div className="reviews">
        {item.reviews.map((rvw) => {
          return (
            <div key={rvw._id} className="review mb-4 p-4 border-b border-gray-200">
              <p className="text-lg font-bold">Name: {rvw.name}</p>
              <p className="text-gray-600">Desc: {rvw.desc}</p>
              <Rating name="half-rating-read" defaultValue={rvw.rating} precision={0.5} readOnly />
            </div>
          );
        })}
      </div>

      { obj.usercon.token !== "" && obj.usercon.role === "user" && (
        <div className="add-review p-4 border-b border-gray-200">
          <input type='text' placeholder='Enter review' onChange={fun} value={rv.desc} name='desc' className="w-full p-2 pl-10 text-sm text-gray-700" />
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>
          <button onClick={addrv} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Review</button>
        </div>
      )}
    </div>
  );
};

export default Km;