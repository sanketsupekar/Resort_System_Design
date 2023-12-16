import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const {adminLoggedOut} = require("../components/UserFunctions");

export default function AdminSignOut() {
  const navigate = useNavigate();
  useEffect(()=>{
    adminLoggedOut();
      navigate('/admin/signin');
  },[])

  return (
    <div>AdminSignOut</div>
  )
}
