import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

// object is CreatePost and the path is createPost 

const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
         fetch("/createpost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 body,
                 pic:url
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Blog Posted Successfully",classes:"#424242 grey darken-3"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])


    //************************************************************* */
    const PostDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","blogspoint")
        data.append("cloud_name","sarosure")
        fetch("https://api.cloudinary.com/v1_1/sarosure/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    //********************************************************************* */

  

     return (
        <div className="card input-filed"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <h2 className="brand-logo">CreateBlog</h2>
            <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <textarea
            type="text"
            placeholder="what are you thinking you can type here"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #01579b light-blue darken-4">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostDetails()}
            
            >
                Submit post
            </button>

        </div>
     )


}

export default CreatePost