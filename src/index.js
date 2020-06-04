const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const userrouter=require('./routers/user')
const Product=require('./models/product')
const productrouter=require('./routers/product')
const app=express()
const port=3000;
app.use(express.json())
app.use(userrouter)
app.use(productrouter)
app.listen(port,()=>{
    console.log('App is listening on '+ port)
})