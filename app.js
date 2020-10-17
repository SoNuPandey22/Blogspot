//entry file 
const express = require('express')
const app = express()
const PORT = process.env || 5000
const mongoose = require('mongoose')
//password = 8csJPAUkXnRoUa8X
const {MONGOURI} = require('./config/key')

//connet app to the mongo uri
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
mongoose.connection.on('connected',()=>{
    console.log("connected to the database")
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting ",err)
})
//******************************connection part is done here we can proceed with the code from here

//we are not storing it because we are not exporting it from the outsisde
require('./models/user')
require('./models/post')

//to parse the incoming request into the json message
app.use(express.json())


app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// for the server end if the production is found then apply this state
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
//app.use(customMiddleware) => this will make tke the use of middleware to all the app


app.listen(PORT,()=>{
    console.log("server running on ",PORT)
})