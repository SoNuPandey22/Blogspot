import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import M from 'materialize-css'
import Collapsible from 'react-collapsible'

//functional component
const Home = ()=>{
     
    const [data,setData] = useState([]) //initially an empty array
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])
//****************************************************************************8 */
const likePost = (id)=>{
    fetch('/like',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
             //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

//*******************8*** */
const unlikePost = (id)=>{
    fetch('/unlike',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
      //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
  })
}

//****************************************************************************** */

const makeComment = (text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

//************************************************************** */
const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}

/*{
    <div className="card-image">
    <img src ={item.photo}/>
    <h3>{item.title}</h3>
 </div>
}>*/
//*********************************************************** */

    
    return(

        <div  className ="home">
         {
             data.map(item=>{
                // console.log(item)
                 return (
                
                      <div  className="card home-card " key={item._id}>
                          <h5 className="#e8eaf6 indigo lighten-5" style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            <Collapsible trigger= {
                                <div className="card-image">
                                  <img  style={{height:"250px"}} src ={item.photo} />
                                  <h3 style={{width: "100%"}}className="card-title #1e88e5 blue darken-1 ">{item.title} <h6 className="#0d47a1 blue darken-4">*click here read</h6></h3> 
                               </div>
                            }>
                                 <blockquote className="#e0e0e0 grey lighten-2 flow-text"> {item.body}</blockquote>
                            </Collapsible>
                            
                        
                        <div className="card-content">
                        
                                {item.likes.includes(state._id)
                                    ? 
                                    <i className="material-icons"
                                            onClick={()=>{unlikePost(item._id)}}
                                    >thumb_down</i>
                                    : 
                                    <i className="material-icons btn-floating pulse"
                                    onClick={()=>{likePost(item._id)}}
                                    >thumb_up</i>
                                    }
                                    
                                <h6>{item.likes.length} likes</h6>
                               
                                <h6>Reader's opinion</h6>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="Add a Commnet" />  
                                </form>

                               

                            


                            
                        </div>
                </div>
                 )
             })
         }



            


        </div>
    );

}


export default Home