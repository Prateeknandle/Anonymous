import React,{useEffect, useState,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,Link} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {UserContext} from '../App'

const Navbar = () => {
  const {state,dispatch} = useContext(UserContext)
  const [data,setdata] = useState([])
  const [cookies, setCookie,removeCookie ] = useCookies(['jwtoken']);
  const handleLogout = (e)=>{
    localStorage.clear()
    removeCookie('jwtoken',{ path: '/' });
    dispatch({type:"CLEAR"})
  }
  useEffect(()=>{
    fetch('/tags',{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
    })
    .then(res=>res.json())
    .then(data=>{
        
        setdata(data)
    })
},[])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light  ">
  <NavLink className="navbar-brand" to="#">Anonymous</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent" >
    <ul className="navbar-nav ml-auto">
      {/* <li className="nav-item active">
        <NavLink className="nav-link" to="/c/">Home</NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/signup">Signup</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/feed">My Feed</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/myprofile">My Profile</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/post">All Posts</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/write">Write</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/c/logout"onClick={handleLogout} >Logout</NavLink>
      </li>
    </ul>
</div>
</nav>




    <div className="bg-1">

<nav className="navbar navbar-expand-lg navbar-dark">
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>

 <div className="collapse navbar-collapse " id="navbarSupportedContent" >
   <ul className="navbar-nav ml-auto">
   {data.map(tags=>{
     return(  

     <li className="nav-item cats">

       <NavLink className="nav-link" Link to={`/c/?tags=${tags._id}`} >{tags._id}</NavLink>
      
     </li> 
     
     )
     
   })
  }
   
   </ul>
</div>
</nav> 
</div>
  


        </>
    )
}

export default Navbar