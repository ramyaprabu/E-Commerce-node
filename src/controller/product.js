const express=require('express')
const Product=require('../models/product')
const newproduct=async(req,res)=>{
    const product=new Product(req.body)
    console.log(product)
    try{
        await product.save()
        res.status(201).send(product)
    }
        catch(e){
        res.status(400).send(e)
    }
}
const getproduct=async(req,res)=>{
    const _id=req.params._id
    Product.findById(_id).then((product)=>{
        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    }).catch((e)=>{
        res.status(500).send()
    })
}
module.exports={
    newproduct,
    getproduct    
}