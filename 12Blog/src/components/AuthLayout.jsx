import { useState,useEffect } from "react";
import React  from "react";
import { useSelector } from "react-redux";
import {Link,useNavigate}  from 'react-router-dom'

export default function Protected({children,authentication = true}){
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector((state)=>state.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication ){
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader?<h1>Loading.........</h1>:<div className="text-white">{children}</div>


}