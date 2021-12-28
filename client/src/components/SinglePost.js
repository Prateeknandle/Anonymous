import React,{useEffect, useState,useContext} from 'react'
import { FcComments } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {AiTwotoneDislike, AiFillLike} from "react-icons/ai";
import {UserContext} from '../App'

const SinglePost = () => {
    const {state,dispatch} = useContext(UserContext)
    const [data,setdata] = useState([])
    const history = useHistory();
const {postid} = useParams();

            useEffect(()=>{
                fetch(`/post/${postid}`,{
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json",
                    },
                    
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    setdata(result)
                })
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

         const makeComment = (text,postId)=>{
             fetch('/post/comment',{
                 method:"put",
                 headers:{
                     Accept:"application/json",
                "Content-Type":"application/json",
                 },
                 body:JSON.stringify({
                     postId:postId,
                     text:text
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



    return (
            <div className="bg">
            <h2>Confession</h2>
            <h5>Read Secrets</h5>
            <div>
            <div className = "confession">
                <div className="post">
                      <h3>{data.heading}</h3>
                            </div>
                            <div className="body-2">
                                <p>{data.confess}</p>
                            </div>
                            <div className="likes">
                
                     { (data.likes || []).includes(state._id)?(
                   <AiTwotoneDislike size="2em" onClick={()=>{unlikePost(data._id)}}/>
                   ):(
                   <AiFillLike size="2em" onClick={()=>{likePost(data._id)}}/>
                   )
                    }  
                    
                <FcComments style={{position:'relative',left:'20px'}}size="2em"/>
                <h6>{(data.likes || []).length}</h6>
                 
                
                </div>
                        <hr/>
                        
                        <div className="writecomment">
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                console.log(e.target)
                                makeComment(e.target[0].value,data._id)
   }}>
    <input  type="text"
     placeholder="Write Comment" 
    />
                    </form>
    </div>
    <p>Once you hit enter, comment will be stored</p> 
    
    
  
                        <p>
  <a class="btn btn-light" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Read Comments
  </a>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
  {
      (data.comments || []).map(record=>{
return(
    <div className="comments">
    <h6 key={record._id}>{record.text}</h6>
    <p>posted by : Anonymous</p>
    </div>
)
      })
  }
   
  </div>
  </div>
                        </div>
                        </div>
                        </div>
            )
}

export default SinglePost