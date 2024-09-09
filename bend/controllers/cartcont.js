let {v4:uuid}=require("uuid")
const cm = require("../models/cartmodel")
let addcart=async(req,res)=>{
    try{
        let obj=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(obj.length==0)
        {
        let data=new cm({...req.body,"_id":uuid()})
        await data.save()
       
        }
        else{
            await cm.findByIdAndUpdate({"_id":obj[0]._id},{$inc:{"qty":1}})
        }
        res.json({"msg":"prod added to cart"})

    }
    catch(err)
    {
console.log(err)
    }

}
let delcart=async(req,res)=>{
    try{
        await cm.findByIdAndDelete({"_id":req.params.id})
        res.json({"msg":"prod del from cart"})

    }
    catch(err)
    {

    }

}
let incqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
        res.json({"msg":"done"})
    }
    catch(err)
    {

    }

}

let decqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":-1}})
        res.json({"msg":"done"})

    }
    catch(err)
    {

    }

}
let getcart=async(req,res)=>{
    try{
        let data=await cm.find({"uid":req.params.uid})
        res.json(data)

    }
    catch(err)
    {

    }

}

module.exports={addcart,decqty,incqty,delcart,getcart}

