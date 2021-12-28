import React,{useState} from 'react'
import {useHistory} from "react-router-dom";

const Write = () => {
    const history = useHistory();
  const[post,setPost] = useState({
    heading:"",confess:"",categories:"",
  });  
let name,value;
  const handleInputs = (e)=>{
     console.log(e); 
     name = e.target.name;
     value = e.target.value;
     setPost({...post,[name]:value});
  }

  const PostData = async(e)=>{
e.preventDefault();

const {heading, confess,categories} = post;
const res = await fetch("/write",{
  method:"POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify({
    heading,confess,categories
  })
});

const data = await res.status;
if(data.status === 422 || !data){
  window.alert("Invalid Post");
  console.log("Invalid Post");
}
else{
  window.alert("Post saved");
  console.log("Post saved");

  history.push("/c/post");
}
  }
    return (
        <div>
            <div className ="bg">
            <h2>Write your Confession</h2>
            <h5>All the fields are neccessary to fill</h5>
            <div className = "confession">
                <div className="title">
                    <input  type="text"
                    name="heading"
                    value={post.heading}
                    onChange={handleInputs}
                    placeholder="Title" className="writeInput" autoFocus={true} />
                </div><hr></hr>
                <div className="body-3">
                <textarea  type="text" 
                name="confess"
                value={post.confess}
                onChange={handleInputs}
                placeholder="Write your confession...."className="writeInput writeText" />
                </div><hr></hr>
                <div className="title">
                <input type="text"
                    name="categories"
                    value={post.categories}
                    onChange={handleInputs}
                    placeholder="Write category it belong to. Use ',' to write multiple categories" className="writeInput" autoFocus={true} />
                    </div><hr></hr>
                <button onClick={PostData}>Publish</button>
                </div>
                </div>
        </div>
    )
}

export default Write;