let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "cat":String,
    "desc":String,
    "price":Number,
    "pimg":String,
    "dct":Number,
    "reviews":[]

})
let pm=new mongoose.model("prod",prodsch)
module.exports=pm
