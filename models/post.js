const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type : String,
        required : true
    },
    photo :{
        type: String,
        required : true
        
    },
    likes:[{type:ObjectId,ref:"User"}],

    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

    postedBy:{
        type:ObjectId, //this will be the id of the user who is going to post
        ref:"User"     // this is the user itself
    }
},{timestamps:true})

mongoose.model("Post",postSchema)