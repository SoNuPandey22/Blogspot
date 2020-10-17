const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//const {SENDGRID_API,EMAIL} = require('../keys')

//**************************************************************


// ***************************************************************

router.post('/signup',(req,res)=>{
    const{name,email,password,pic} = req.body

    if(!name || !email || !password)
    {               
    	return res.status(422).json({error:"add all the field"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
    	if(savedUser)
    	{
    		return res.status(422).json({error:"Already existing"})
    	}

        //hashing pasword using bycypt 
        //the bigger no is the more secure pasword will be
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
                const user = new User({
                email,
                name,
                password:hashedPassword,
                pic

            })
            user.save()
            .then(user=>{
                res.json({message:"Account Created successfully"})
            })
            .catch(err=>{
                console.log(err)
            })

            })

    	
    })
    .catch(err=>{
    	console.log(err)
    })
    
})
//****************************************************************
router.post('/login',(req,res)=>{
    const {email,password} = req.body
    console.log(email)
    if(!email || !password)
    {
        return res.status(422).json({error:"Fill all the detail"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"Invalid User"})
        }
        //using bcrypt to compare the password 
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                //res.json({message:"successfully Logedin"})
                //give the user a token on signin successfully
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id, name, email,pic} = savedUser    
                res.json({"token" : token, user:{_id, name, email,pic}})
            }
            else
            {
                return res.status(422).json({error:"Invalid User"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router