const express=require('express')
const multer=require('multer')
const User=require('../models/user')
const auth=require('../middleware/auth')
const {createnewuser,
    loginuser,
    editprofile,
    logoutuser,
    logoutalldevices,
    getuser,
    addcart,
    deleteuser
}=require('../controller/user')
const router=new express.Router()
router.post('/api/users/signupnewuser',createnewuser) 
router.post('/api/users/login',loginuser)
router.patch('/api/users/editprofile',auth,editprofile)
router.post('/api/users/logout',auth,logoutuser)
router.post('/api/users/logoutall',auth,logoutalldevices)
router.get('/api/users/getuser',auth,getuser)
router.patch('/api/users/addcart',auth,addcart)
router.delete('/api/users/deleteuser',auth,deleteuser)
module.exports=router