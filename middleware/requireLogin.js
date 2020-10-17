const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const mongoose = require ('mongoose') // for usng the user nodel use mongoose
const User = mongoose.model("User")

//middleware function
module.exports = (req,res,next) => {
	const {authorization} = req.headers //401 is unathorised code 
	if(!authorization)
    {
    	return res.status(401).json({error :"You must be Logged in"})
    }
   const token = authorization.replace("Bearer ","")
   jwt.verify(token, JWT_SECRET,(err,payload)=>{
   		if(err)
   			
   		{
   			return res.status(422).json({error : "You Must Logged in"})
   		}
   		const {_id} = payload
   		User.findById(_id).then(userdata=>{
			   req.user = userdata
			   next()
   		})
   		//to continue the code use 
   })
  
}