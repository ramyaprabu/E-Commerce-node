const mongoose=require('mongoose')
const Schema=mongoose.Schema
const orderschema=new mongoose.Schema({
    userid:{
        type:ObjectId,
        required:true
    },
     productname:{
         type:String,
         required:true
     },
     quantity:{
        type:String,
        required:true
     },
     price:{
         type:Number,
         required:true
     }
})
const Order= mongoose.model('Order',orderschema)
module.exports=Order