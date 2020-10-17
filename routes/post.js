const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

//*******************************
router.get('/allpost',(req,res)=>{
    Post.find()  //find() will find all the post at once 
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
//********************* */

 router.post('/createpost',requireLogin,(req,res)=>{
     const{title, body, pic} = req.body
     if(!title || !body || !pic)
     {
         return res.status(422).json({error:"You can't leave any field Empty"})
     }
     //if the title and body is present 
     //console.log(req.user) => cheking the user on the terminal 

     const post = new Post({
         title,
         body,
         photo:pic,
         postedBy:req.user
     })
     post.save()
     .then(result=>{
         res.json({post: result})
     })
     .catch(err=>{
         console.log(err)
     })
    
 })

 //********************************Post created by me  */
 router.get("/mypost",requireLogin,(req,res)=>{
     Post.find({postedBy:req.user._id})
     .populate("postedBy","_id name")        //to get the data mentioned in the populate column
     .then(mypost =>{
         res.json({mypost})
     })
     .catch(err=>{
         console.log(err)
     })
 })

 //*********************************************************** */

 router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true  //for  mongoDB to return the new post
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
 })
 router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


 //**************************************************** */

 router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
//******************************************************************* */
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({message :"error occured or the post is not found"})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
//******************************************************** */
router.delete('/deletecomment/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !comment){
            return res.status(422).json({message :"error occured or the post is not found"})
        }
        if(comment.postedBy._id.toString() === req.user._id.toString()){
              comment.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

 module.exports = router