const express=require('express')
const app=express()
const route=require("./routes/route")
const mongoose=require('mongoose')
const cors=require('cors')



app.use(express.json())
app.use(cors())
app.use("/imgs",express.static("./prodimgs"))
mongoose.connect("mongodb://localhost:27017/ecom").then(()=>{
    console.log("ok")
})


app.use("/",route)

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})