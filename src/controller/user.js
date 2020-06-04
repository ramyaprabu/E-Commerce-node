const express=require('express')
const mongoose=require('mongoose')
const User=require('../models/user')
const Product=require('../models/product')
const createnewuser=async (req,res)=>{
    const user=new User(req.body)
try{
    await user.save()
    const token=await user.generatetoken()
    res.status(201).send({token})
}catch(e){
    res.status(400).send(e)
}
}
const loginuser=async (req,res)=>{   
     try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generatetoken()
    res.status(200).send({token})
} catch (e) {
    res.status(400).send()
}
}
const logoutuser=async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
}
const editprofile=async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedupdates=['name','age','address','email','password']
    const isvalidoperation=updates.every((update)=>{
        return allowedupdates.includes(update)
    })
    if(!isvalidoperation){
        return res.status(400).send('invalid update')
    }
    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.status(200).send(req,user)
    }catch(e){
        res.status(400).send(e)
    }
}
const logoutalldevices=async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
}
const getuser=async(req,res)=>{
    try{
        console.log(req.user)
        const display=req.user
        res.status(200).send(display)
    }catch(e){
        res.status(400).send('Unable to fetch user')
    }
} 
const addcart=async(req,res)=>{
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
const deleteuser=async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
}
module.exports={
    createnewuser,
    loginuser,
    editprofile,
    logoutuser,
    logoutalldevices,
    getuser,
    addcart,
    deleteuser
}
