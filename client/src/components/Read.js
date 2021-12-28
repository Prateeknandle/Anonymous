import React,{useEffect,useState,useContext} from 'react'
import {useHistory,Link,useParams} from "react-router-dom";
import { FcComments } from "react-icons/fc";
import {AiTwotoneDislike, AiFillLike, AiFillDelete} from "react-icons/ai";
import {UserContext} from '../App'


     const Read = () => {
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory();
     const [data,setdata] = useState([])
     const {id} = useParams();

      const callReadPage = async () => {
     try{
        const res = await fetch('/post',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            credentials:"include"
        });

            const data = await res.json();
        setdata(data);

        if(! res.status === 200){ 
            const error = new Error(res.error);
            throw error;
        }

     }catch(err){
      console.log(err);
      history.push('/login');
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
            <h2>Welcome to Confessions</h2>
            <h2>Here you can read all the Confessions</h2>
                {
                    data.map(posts=>{
                       return(
                            <div className="confession">
                                
                                <div className="title">
                                <Link to={`/c/post/${posts._id}`} style={{ textDecoration: 'none', color:'chocolate'}} >
                    <h3>{posts.heading}</h3>
                    </Link>
                    {posts.postedBy._id===state._id
                    && <AiFillDelete style={{float:'right', color:'white'}}
                    onClick={()=>{deletePost(posts._id)}}/>}
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
export default Read