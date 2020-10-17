const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        reuired: true
    },
    pic:{
        type:String,
        default:"https://cdn2.vectorstock.com/i/1000x1000/17/61/male-avatar-profile-picture-vector-10211761.jpg"
       },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
    
})

mongoose.model("User",userSchema)