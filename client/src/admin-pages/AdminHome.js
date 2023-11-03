import React, { useEffect,useState } from "react";
import NavBar from "../admin-components/NavBar";
import { isAdminLoggedIn } from "../components/UserFunctions";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin-components/AdminHeader";
export default function AdminHome() {
  const [loggedIn,setLogin] = useState(isAdminLoggedIn());
  const navigate = useNavigate();
  const data = {
    title: "Admin",
    sub_title:
      "You have rights to do any thing",
      image : "admin_header.jpg"
  };

  useEffect(()=>{
    if(!loggedIn)
    {
      navigate("/admin/signin");
    }
  },[])
  return (
    <>
    <NavBar></NavBar>
    <AdminHeader data = {data}></AdminHeader>
      <div>AdminHome</div>
    </>
  );
}
