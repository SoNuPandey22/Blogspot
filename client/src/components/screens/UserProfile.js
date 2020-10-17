import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'


const Profile = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
     },[])
     
    return(
        <> {userProfile ?
        <div style = {{maxWidth:"550px", margin:"0px auto"}}>
            <div style = {{display :"flex",
                            justifyContent:"space-around",
                            margin:"18px 0px",
                            borderBottom:"1px solid gray"
                        }}>
                <div>
                    <img style = {{width:"160px",justifyContent:"space-between", height:"160px", borderRadius:"80px"}}
                    src={userProfile.user.pic}
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{userProfile.posts.length} Blogs</h6>
                        <h6>Likes</h6>
                      
                    </div>
                </div>
            </div>
            <div className="galary">
            {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

            </div>
        </div>
        : <h2>Loading...</h2>
            }
            </>
      
    );
}

export default Profile