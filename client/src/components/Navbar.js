import React,{useContext,useRef,useEffect,useState} from 'react'
import ReactNavbar from "react-responsive-animate-navbar"
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'


const Navbar = ()=>{
   useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])

   const  searchModal = useRef(null)
   const [search,setSearch] = useState('')
   const [userDetails,setUserDetails] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });

    

    const renderList = ()=>{
       if(state){
          return [
            <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li key="2"><Link to="/profile"><i className="material-icons">account_circle</i></Link></li>,
            <li key="3"><Link to="/createPost"><i className="material-icons">add_a_photo</i></Link></li>,
            <li key="5">
             <button className="btn #c62828 red darken-3" onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/login')
            }}
            >Logout
            </button>
            </li>
          ]
       }
       else{
           return[
            <li key="6"><Link to="/login">Signin</Link></li>,
            <li key="7"><Link to="/signup">do not have account ?</Link></li>
           ]
       }
    }

    //***************************************/
    const renderListnav = ()=>{
       if(state){
          return [
            <li key="1"><i  data-target="modal1" className="material-icons modal-trigger" style={{color:"black"}}>search</i>search</li>,
            <li key="2"><Link to="/profile"><i className="material-icons">account_circle</i></Link></li>,
            <li key="3"><Link to="/createPost"><i className="material-icons">add_a_photo</i></Link></li>,
            <li key="5">
             <button className="btn #c62828 red darken-3" onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/login')
            }}
            >Logout
            </button>
            </li>
          ]
       }
       else{
           return[
            <li key="6"><Link to="/login">Signin</Link></li>,
            <li key="7"><Link to="/signup">Register</Link></li>
           ]
       }
    }
//********************************************** */
    const fetchUsers = (query)=>{
      setSearch(query)
      fetch('/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        setUserDetails(results.user)
      })
   }

   //************************ */

	return (
  <div>
   <nav >
     <div className="nav-wrapper white">
     <Link to={state?"/":"/signin"} className="brand-logo center btn-floating pulse">BlogSpot</Link>
      
         <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
       <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}    
          
       </ul>
       

       
     </div>
     <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
  </nav>
        <ul style={{width:"200px"}} id="mobile-demo" className="sidenav #e1bee7 purple lighten-4">
          
          {renderListnav()}    
          
       </ul>
  </div>

  
        
		)
}

export default Navbar