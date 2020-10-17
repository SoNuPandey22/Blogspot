import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createPost'
import {reducer, initialState} from './reducer/userReducer'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import UserProfile from './components/screens/UserProfile'

export const UserContext = createContext()

const Routing = ()=>{
	const history = useHistory()
	const {state,dispatch} = useContext(UserContext)
	useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
	   dispatch({type:"USER",payload:user})
    }else{
       if(!history.location.pathname.startsWith('/reset'))
           history.push('/login')
    }
  },[])
	return (
		<Switch>
         <Route exact path="/">
		    <Home/>
	      </Route>
	     <Route path="/signup">
			  <Signup/>
		  </Route>
		  <Route path="/login">
			  <Login/>
		  </Route>
		  <Route exact path="/profile">
			  <Profile/>
		  </Route>
		  <Route path="/profile/:userid">
			  <UserProfile/>
		  </Route>
		  <Route path="/createPost">
			  <CreatePost/>
		  </Route>
	       <Route exact path="/reset">
                 <Reset/>
          </Route>
         <Route path="/reset/:token">
            <NewPassword />
         </Route>
		</Switch>
		

	)
}

function App() {
    const [state,dispatch] = useReducer(reducer,initialState)

	return (
		<UserContext.Provider value={{state,dispatch}}>
		<BrowserRouter>
		  <Navbar/>
		 <Routing/>


		</BrowserRouter>

		</UserContext.Provider>
		

		);
}
   

export default App;
