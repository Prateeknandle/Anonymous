import React,{useEffect, useState} from 'react'
import {useHistory,Link} from "react-router-dom";
import { useLocation } from 'react-router';
import axios from "axios"


const Home = () => {
    const history = useHistory();
    const [data,setdata] = useState([])
    const {search} = useLocation()
const callReadPageH = async () => {
    try{
     const res = await axios.get("/c"+search);
     setdata(res.data);
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
callReadPageH();
},[search])

    return (
        <div className="bg">
            <h2>Welcome to Confessions</h2>
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
                  </div>
            
                        )
                    })
            }
           
        </div>
    )
}

export default Home