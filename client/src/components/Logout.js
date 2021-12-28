import React,{useEffect} from 'react'
import {useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        fetch('/logout',{
            method: "GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
             history.push('/c/login')
        }).catch((err)=>{
            console.log(err); 
        })
    });

    return (
        <div>
            Logout
        </div>
    )
}

export default Logout
