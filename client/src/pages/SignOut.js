import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const {loggedOut} = require('../components/UserFunctions');

export const SignOut = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        loggedOut();
        navigate('/signin');
    },[])
  return (
    <div>SignOut</div>
  )
}
