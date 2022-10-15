import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { useCookies } from 'react-cookie';
export default function Person() {
const [islogin,setlogin] = useState(false);
const [cookie]=useCookies();
useEffect(()=>{
    if(cookie.JWT){
        setlogin(true);
    }
},[])
const navigate=useNavigate();
function changetoPerson(){
    if(cookie.JWT){
        navigate("/personPage")
    }
    else{
        navigate("/loginPage")
    }
    
}
return (
    <div>
        
            <div onClick={()=>changetoPerson()}>    
                {
                    islogin?
                    <Avatar>
                        <h1>已经登录</h1>
                    </Avatar>:
                    <Avatar icon={<UserOutlined/>}/>
                }
            </div>
        
    </div>
)
}
