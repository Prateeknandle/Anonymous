import React,{createContext,useReducer,useEffect,useContext} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from './components/Navbar';
import Open from './components/Open';
import Login from './components/Login';
import Signup from './components/Signup';
import Read from './components/Read';
import Write from './components/Write';
import Home from './components/Home'; 
import Errorpage from './components/Errorpage';
import Myproflie from './components/Myproflie';
import SinglePost from './components/SinglePost';
import Logout from './components/Logout';
import Users from './components/Users'
import Feed from './components/Feed'
import {reducer,initialState} from './reducers/userReducer';

export const UserContext = createContext()

const Routing=()=>{
   const history = useHistory()
   const {state,dispatch} = useContext(UserContext)
   //const user = state;
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      console.log(typeof(user))
      if(user){
         dispatch({type:"USER",payload:user})
         history.push('/c/post')
      }else{
         history.push('/c/login')
      }
   },[])
   return(
      <Switch>
      {/* <Route exact path = "/c">
         <Home/>
         </Route> */}
      <Route path = "/c/signup">
         <Signup/>
      </Route>

      <Route path = "/c/login">
      <Login/>
      </Route>
      <Route path = "/c/write">
      <Write/>
      </Route>
      <Route exact path = "/c/feed">
      <Feed/>
      </Route>
      <Route path = "/c/logout">
      <Logout/>
      </Route>
      <Route  path = "/c/myprofile">
       <Myproflie/>
      </Route>
      <Route exact path = "/c/post">
      <Read/>
      </Route>
      <Route path = "/c/post/:postid">
      <SinglePost/>
      </Route>
      <Route path = "/c/users/:userid">
      <Users/>
      </Route>
      <Route>
         <Errorpage/>
      </Route>
      </Switch>
   )
}


function App() {
   const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Open/>
      <Navbar/>
      <Routing/>
      </BrowserRouter>
   
    </UserContext.Provider>
  );
}

export default App;