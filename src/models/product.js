const mongoose=require('mongoose')
const Schema=mongoose.Schema
const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})
const Product = mongoose.model('Product', productSchema)
module.exports=Product