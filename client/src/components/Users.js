import React,{useEffect, useState, useContext} from 'react'
import { FcLikePlaceholder, FcComments } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import Userpost from './Userpost'
import {UserContext} from '../App'

const Users = () => {
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams();
    const [showfollow,setShowFollow] = useState(true)
    const [userprofile,setUserprofile] = useState([])
    const callReadPage = async () => {
        try{
            const res = await fetch(`/users/${userid}`,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                credentials:"include"
            });
            
            const data = await res.json();
            console.log(data);
            
            setUserprofile(data);
    
            if(! res.status === 200){ 
                const error = new Error(res.error);
                throw error;
            }
    
        }catch(err){
    console.log(err);

        }
    }
    
    useEffect(()=>{
    callReadPage();
    })

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}}) 
            localStorage.setItem("user",JSON.stringify(data))
            setUserprofile((prevState)=>{
                return{
                        ...prevState,
                    user:{
                         ...prevState.user,
                         followers:[...prevState.followers,data._id]
                        }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}}) 
            localStorage.setItem("user",JSON.stringify(data))
            setUserprofile((prevState)=>{
                return{
                        ...prevState,
                    
                }
            })
            setShowFollow(true)
        })
    }



    return (
        <div className="bg">
             <h3>User's Name : {userprofile.username}</h3>
             <h4>Followers : {userprofile.followers && userprofile.followers.length}</h4>
             <h4>Following : {userprofile.following && userprofile.following.length}</h4>
             {showfollow ? <a class="btn btn-light" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={()=>followUser()}>
    Follow
  </a>
  :
  <a class="btn btn-light" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={()=>unfollowUser()}>
    Unfollow
  </a>
  }
             
  
            <h2>Their Confessions</h2>
            <div >
<Userpost userid={userid}/>
            </div>
        </div>
    )
}

export default Users