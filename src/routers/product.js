const express=require('express')
const Product=require('../models/product')
const {
    newproduct,
    getproduct} =require('../controller/product')
    const router=new express.Router()
    router.post('/api/product/addproduct',newproduct)
    router.post('/api/product/getproduct/:id',getproduct)
    module.exports=router