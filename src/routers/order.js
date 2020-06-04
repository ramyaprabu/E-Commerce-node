const express=require('express')
const Order=require('../models/order')
const auth=require('../middleware/auth')
const neworder=require('../controller/order')
const router=new express.Router()
router.post=('/api/users/neworder',neworder)
module.exports=router
