const umodel = require("../models/usermodel")
let cm=require("../models/cartmodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const { memoryStorage } = require("multer")
let adduser=async(req,res)=>{
    try{
       let data= await umodel.findById({"_id":req.body._id})
       if(data)
       {
        res.json({"msg":"given email exists"})
       }
       else{
        let hash=await bcrypt.hash(req.body.pwd,10)
        let user=new umodel({...req.body,"pwd":hash})
        await user.save()
        res.json({"msg":"reg done"})
       }


    }
    catch(err)
    {

    }
    
}
let login=async(req,res)=>{
    try{
    let data=await umodel.findById({"_id":req.body._id})
    if(data)
    {
        let f=await bcrypt.compare(req.body.pwd,data.pwd)
        if(f)
        {
            let x=await cm.aggregate([{$match:{"uid":req.body._id}},{$count:"nofitems"}])
            res.json({"token":jwt.sign({"_id":data._id},"fsd4"),"_id":data._id,"name":data.name,"role":data.role,"nofitems":x[0]?.nofitems ?? 0})
        }
        else{
            res.json({"msg":"check pwd"})
        }
    }
    else{
        res.json({"msg":"check email"})
    }
    }
    catch(err)
    {
console.log(err)
    }
}
let resetpwd=async(req,res)=>{
    try{
        let data=await umodel.findById({"_id":req.body._id})
        if(data)
        {
            let hash=await bcrypt.hash(req.body.pwd,10)
            await umodel.findByIdAndUpdate({"_id":req.body._id},{"pwd":hash}) 
            res.json({"msg":"pwd updated"})
            
        }
        else{
            res.json({"msg":"check email"})
        }
        }
        catch(err)
        {
    console.log(err)
        }

}
let islogin=(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"fsd4")
        next()

    }
    catch(err)
    {
        res.json({"msg":"login to get det"})
    }
}
let isadmin=async(req,res,next)=>{
    try{
       let x= await umodel.findById({"_id":req.headers.uid})
        if(x&&x.role=="admin")
        {
            next()
        }
        else
        {
            res.json({"msg":"you are not admin"})
        }
    }
    catch(err)
    {

    }

}
module.exports={adduser,login,resetpwd,islogin,isadmin}
