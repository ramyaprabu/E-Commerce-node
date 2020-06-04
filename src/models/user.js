const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const product=require('../models/product')
const Schema=mongoose.Schema
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        valiate(value){
            if(value<18){
                throw new Error('your age should be above 18 to sign up')
            }
        }
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    address:{
      street:{
          type:String,
          required:true
      },
      city:{
          type:String,
          required:true
      },
      pincode:{
          type:Number,
          required:true
      },
      landmark:{
          type:String
      }
    },
    mobilenumber:{
        type:Number,
        required:true,
        maxlength:10
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter a valid email')
            }
        }
    },
        password:{
            type:String,
            required:true,
            minlength:8,
            trim:true,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error('password cannot contain "password"')
                }
            }
        },
            cart:[{
                product_id:{
                    type:String
                },
                    Quantity:{
                        type:Number
                    },
                    price:{
                        type:Number
                    }
            }],
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
},
{
    timestamps:true

})
userschema.methods.toJSON=function(){
    const user=this
    const userobject=user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}
userschema.methods.generatetoken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'Someproduct')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
userschema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
})
userschema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to find user')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
const User = mongoose.model('User', userschema)
module.exports = User