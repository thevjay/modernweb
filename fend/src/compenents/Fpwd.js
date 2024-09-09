import { useState } from 'react';
import axios from 'axios';

const Fpwd = () => {
  let [data, setData] = useState({"_id": "", "pwd": ""});
  let [msg, setMsg] = useState("");


  let fun = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  let login = () => {
    axios.post("http://localhost:5000/restpwd", data).then((res) => {
      setMsg(res.data.msg);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="text-lg font-bold text-gray-700 mb-4">Reset Password</div>
            <div className="msg text-lg font-bold text-green-600">{msg}</div>
            <input type='text' placeholder='Enter Email' name="_id" onChange={fun} value={data._id} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            <input type='password' placeholder='Enter New Password' name="pwd" onChange={fun} value={data.pwd} className="w-full mt-4 p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            <button onClick={login} className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-4 py-2 px-4 rounded-lg">Reset</button>
        </div>
    </div>
  );
};

export default Fpwd;