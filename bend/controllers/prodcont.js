let multer=require("multer")
const pm = require("../models/prodmodel")
let {v4:uuid}=require("uuid")
let fs=require("fs")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })
  let add=async(req,res)=>{
    try{
        if(['jpg','jpeg','png'].includes(req.file.mimetype.split("/")[1]))
        {
        let data=await pm({...req.body,"pimg":req.file.filename,"_id":uuid()})
        data.save()
        res.json({"msg":"prod added"})
        }
        else{
            fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
            res.json({"msg":"only jpg,jpeg or png files are allowed"})
        }
    }
    catch(err)
    {

    }

  }
  let getprod=async(req,res)=>{
    try
    {
       let data=await pm.find({})
       res.json(data)

    }
    catch(err)
    {

    }

  }
  let upddct=async(req,res)=>{
    try
    {
        await pm.findByIdAndUpdate({"_id":req.body._id},{"dct":req.body.dct})
        res.json({"msg":"dct updated"})
    }
    catch(err)
    {

    }

  }

  let deldct=async(req,res)=>{
    try
    {
        await pm.findByIdAndUpdate({"_id":req.body._id},{$unset:{"dct":""}})
        res.json({"msg":"dct deleted"})
    }
    catch(err)
    {

    }

  }
  let updprod=async(req,res)=>{
    try{
      let data={...req.body}
      delete data["_id"]
      await pm.findByIdAndUpdate({"_id":req.body._id},data)
      res.json({"msg":"update done"})

    }
    catch(err)
    {

    }
  }
  let updpimg=async(req,res)=>{
    try
    {
    let data=await pm.findById({"_id":req.body._id})
    fs.rm(`./prodimgs/${data.pimg}`,()=>{})
    await pm.findByIdAndUpdate({"_id":req.body._id},{"pimg":req.file.filename})
    res.json({"msg":"prod img updated"})
    }
    catch(err)
    {

    }
  }
  let addrv=async(req,res)=>{
    try{
      await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"reviews":req.body}})
let data=await pm.findById({"_id":req.body.pid})
      res.json(data)
    }
    catch(err)
    {

    }

  }


  const deleteProd=async(req,res)=>{
    try{
      const productId=req.params.id;
      const product=await pm.findByIdAndDelete(productId)
      if(!product){
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    }
    catch(err){
      console.error(err);
      res.status(500).json({ message: 'Error deleting product' });
    }
  }

  module.exports={upload,add,getprod,upddct,deldct,updprod,updpimg,addrv,deleteProd}
