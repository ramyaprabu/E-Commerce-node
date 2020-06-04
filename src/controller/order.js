const express=require('express')
const mongoose=require('mongoose')
const User=require('../models/user')
const Product=require('../models/product')
const Order=require('../models/order')
const neworder= async(req,res)=>{
    const order=new Order()
    orders.userid=req.user._id
    for(i=0;i<=req.body.cart.length;i++){
        const _id=mongoose.Types.ObjectId(req.body.cart.id)
        const quantity=req.body.cart.quantity
        await Product.findById({_id},(err,product)=>{
            if(err){
                return res.status(404).send('unable to find')
            }
            if(!product){
                return res.status(404).send('no product found')
            }
            if(quantity>product.stock){
                return res.status(404).send('Out of stock')
            }
            req.user.cart.push({
                product_id:product_id,
                quantity:quantity,
                price:product.price
            });
        })
        try{
            await req.user.save()
            res.status(200).send(req.user.cart)
        }catch(e){
            res.status(400).send()
        }
    }
    req.order.push({
        product_id:product_id,
        quantiy:cart.quantity,
        price:product.price
    })
}
    try{
        await order.save()
        res.status(201).send(order)
    }catch(e){
        res.status(400).send(e)
    }
module.exports=neworder