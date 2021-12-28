import React,{useState} from 'react'
import {useHistory} from "react-router-dom";

const Signup = () => {
   const history = useHistory();
  const[user,setUser] = useState({
    username:"",email:"",password:"",cpassword:""
  });  
let name,value;
  const handleInputs = (e)=>{
     console.log(e); 
     name = e.target.name;
     value = e.target.value;
     setUser({...user,[name]:value});
  }

  const PostData = async(e)=>{
e.preventDefault();

const {username, email, password, cpassword} = user;
// const res = await fetch("/signup",{
//   method:"POST",
//   headers: {
//     "Content-Type":"application/json"
//   },
//   body: JSON.stringify({
//     username, email, password, cpassword
//   })
// });

// const data = await res.json();
// console.log(data);
// if(data.status === 422){
//   window.alert("Invalid Registration");
//   console.log("Invalid Registration");
// }
// else{
//   window.alert("Registration");
//   console.log("Registration");

//   history.push("/login");
// }
fetch('/signup', {
   method:"POST",
   headers: {
    "Content-Type":"application/json"
   },
   body: JSON.stringify({
    username, email, password, cpassword
   })
})
.then(function(response) {
    console.log(response.status); // Will show you the status
    if (response.status === 422) {
      window.alert("Invalid Registration");
       // throw new Error("HTTP status " + response.status);
    }
    else{
      window.alert("Registration");
    }
    return response.json();
})

  }
    return (
        <div>
            <div className="form-full">
            <form method='POST'>
            <div className="form-group">
    <label htmlFor="username">username</label>
    <input type="username" name="username" className="form-control" id="username" 
    value={user.username}
    onChange={handleInputs}
    placeholder="enter user-name"/>
  </div>
  <div className="form-group">
    <label htmlFor="email">email</label>
    <input type="email"name="email" className="form-control" id="email" aria-describedby="emailHelp"
    value={user.email}
    onChange={handleInputs}
    placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">password</label>
    <input type="password"name="password" className="form-control" id="password" 
    value={user.password}
    onChange={handleInputs}
    placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">cpassword</label>
    <input type="cpassword"name="cpassword" className="form-control" id="cpassword" 
    value={user.cpassword}
    onChange={handleInputs}
    placeholder="Re-write Password"/>
  </div>
  <button type="submit" className="btn btn-primary" value="signup" onClick={PostData}>Submit</button>
</form>
            </div>
            </div>
        
    )
}

export default Signup
