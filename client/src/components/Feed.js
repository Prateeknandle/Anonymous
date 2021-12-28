import React,{useEffect,useState,useContext} from 'react'
import {Link} from "react-router-dom";
import { FcComments } from "react-icons/fc";
import {AiTwotoneDislike, AiFillLike} from "react-icons/ai";
import {UserContext} from '../App'


     const Feed =() => {
     const {state,dispatch} = useContext(UserContext)
     const [data,setdata] = useState([])

      const callReadPage = async () => {
     try{
        const res = await fetch('/feed',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            credentials:"include"
        });

            const data = await res.json();
        setdata(data);
        // console.log(typeof(data))
        // console.log(state)
        

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
      },[])
    

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

    return (
        <div className="bg">
            <h2>Read Confessions of People you Follow</h2>
                {
                    data.map(posts=>{
                       return(
                            <div className="confession">
                                
                                <div className="title">
                                <Link to={`/c/post/${posts._id}`} style={{ textDecoration: 'none', color:'chocolate'}} >
                    <h3>{posts.heading}</h3>
                    </Link>
                                </div>

                <div className="body">
                <Link to={`/c/post/${posts._id}`} style={{ textDecoration: 'none', color:'whitesmoke'}} >
                 <p>{posts.confess} </p>
                 </Link>
                
                </ div >
                 <div className="likes">
                
                     {posts.likes.includes(state._id)?(
                   <AiTwotoneDislike size="2em" onClick={()=>{unlikePost(posts._id)}}/>
                   ):(
                   <AiFillLike size="2em" onClick={()=>{likePost(posts._id)}}/>
                   )
                    }  
                    <h6>{posts.likes.length}</h6>
                <FcComments style={{position:'relative',left:'0px'}}size="2em"/>
                
                <h6>{posts.comments.length}</h6>
                 <p>Posted by :<Link to={`/c/users/${posts.postedBy._id}`}style={{ textDecoration: 'none', color:'teal'}}> {posts.postedBy.username}</Link></p>
                
                </div>
                
                </div>
                   
                       )
                    })
                 }
           
        </div>
    )
                    
}
export default Feed