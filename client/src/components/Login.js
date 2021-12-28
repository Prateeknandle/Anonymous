import React,{useState,useContext} from 'react'
import {useHistory} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {UserContext} from '../App'

const Login = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['jwtoken']);
   
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login",{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,password
      })
    }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              console.log("error");
              window.alert("Invalid credentials");
           }
           else{
              setCookie('jwtoken', data.token,{ path: '/' });
              console.log(data.user)
               localStorage.setItem('user',JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
                console.log(state)
                window.alert("Successful");
               history.push('/c/post')
           }
        }).catch(err=>{
            console.log(err)
        })
  }

    return (
        <div > 
             <div className="form-full">
            <form method="POST" >
  <div className="form-group">
    <label for="email">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="email"
    value = {email}
    onChange = {(e) => setEmail(e.target.value)}
    placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label for="password">Password</label>
    <input type="password" className="form-control" id="password"
    value = {password}
    onChange = {(e) => setPassword(e.target.value)}
    placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick = {loginUser}>Log in</button>
</form>
            </div>
        </div>
    )
}

export default Login;
