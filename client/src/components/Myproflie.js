import React,{useEffect, useState,useContext} from 'react'
import {Link} from "react-router-dom";
import { FcComments } from "react-icons/fc";
import {AiTwotoneDislike, AiFillLike, AiFillDelete} from "react-icons/ai";
import {UserContext} from '../App'

const Myproflie = () => {
    const {state,dispatch} = useContext(UserContext)
    const [data,setdata] = useState([])
    const callReadPage = async () => {
        try{
            const res = await fetch('/myprofile',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                credentials:"include"
            });
            
            const data = await res.json();
            console.log(data);
            console.log("data")
            setdata(data.mypost);
    
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

    const likePost = (id)=>{
            fetch('/post/like',{
                method:"put",
                headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
                body:JSON.stringify({
                    postId:id
                })
            }).then(res=>res.json())
            .then(result=>{
                //console.log(result)
                const newData = data.map(post=>{
                    if(post._id===result._id){
                        return result
                    }else{
                        return post
                    }
                })
                setdata(newData)
            }).catch(err=>{
                console.log(err)
            })
        }

        const unlikePost = (id)=>{
            fetch('/post/unlike',{
                method:"put",
                headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
                body:JSON.stringify({
                    postId:id
                })
            }).then(res=>res.json())
            .then(result=>{
               // console.log(result)
               const newData = data.map(post=>{
                   if(post._id===result._id){
                       return result
                   }else{
                       return post
                   }
               })
               setdata(newData)
            }).catch(err=>{
                console.log(err)
            })
        }

        const deletePost = (id)=>{
            fetch(`/deletepost/${id}`,{
             method:"delete",
             headers:{
                Accept:"application/json",
            }
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                const newData = data.filter(post=>{
                    return post._id !== result._id
                })
                setdata(newData)
            })
        }

    return (
        <div className="bg">
             <h2>My Profile</h2>
            <h2>My Confessions</h2>
            <div>
                {
                    data.map(mypost=>{
                        return(
                            <div className="confession">

                            <div className="title">
                            <Link to={`/c/post/${mypost._id}`} style={{ textDecoration: 'none', color:'chocolate'}} >
                                <h3>{mypost.heading}</h3>
                            </Link>
                            {mypost.postedBy._id===state._id
                    && <AiFillDelete style={{float:'right', color:'white'}}
                    onClick={()=>{deletePost(mypost._id)}}/>}
                            </div>
                            <div className="body">
                            <Link to={`/c/post/${mypost._id}`} style={{ textDecoration: 'none', color:'white'}} >
                             <p>{mypost.confess}</p>
                            </Link>
                            </div>
                            
                            <div className="likes">
                
                     {mypost.likes.includes(state._id)?(
                   <AiTwotoneDislike size="2em" onClick={()=>{unlikePost(mypost._id)}}/>
                   ):(
                   <AiFillLike size="2em" onClick={()=>{likePost(mypost._id)}}/>
                   )
                    }  
                    <h6>{mypost.likes.length}</h6>
                <FcComments style={{position:'relative',left:'0px'}}size="2em"/>
                <h6>{mypost.comments.length}</h6>
                 <p>Posted by :<Link to={`/c/users/${mypost.postedBy._id}`}style={{ textDecoration: 'none', color:'teal'}}> {mypost.postedBy.username}</Link></p>
                
                </div>
                            </div>
                        )
                    })

}
            </div>
        </div>
    )
}

export default Myproflie