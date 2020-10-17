import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'


const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.mypost)
        })
     },[])
    return(
        <div style = {{maxWidth:"550px", margin:"0px auto"}}>
            <div style = {{display :"flex",
                            justifyContent:"space-around",
                            margin:"18px 0px",
                            borderBottom:"1px solid gray"
                        }}>
                <div>
                    <img style = {{width:"160px",justifyContent:"space-between", height:"160px", borderRadius:"80px"}}
                    src={state?state.pic:"loading"}
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                    <h6>{mypics.length} Posts</h6>
                        <h6>Likes will display soon</h6>
                        
                      
                    </div>
                </div>
            </div>
            <div className="galary">
            {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

            </div>
        </div>
      
    );
}

export default Profile