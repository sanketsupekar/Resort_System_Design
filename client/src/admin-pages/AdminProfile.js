import React, { Fragment } from "react";
import NavBar from "../admin-components/NavBar";
import AdminHeader from "../admin-components/AdminHeader";
import { useNavigate } from "react-router-dom";
const {adminLoggedOut}  = require("../components/UserFunctions");

export default function AdminProfile() {
  const navigate = useNavigate();
  const data = {
    title: "Keshav Suryawanshi",
    sub_title: "You have rights to do any thing",
    image: "admin_header.jpg",
    button_name : "log out",
  };
function handleLogOutClick(){
    // alert("Log out");
    adminLoggedOut();
    navigate("/admin/signin");

}
  return (
    <Fragment>
      <NavBar></NavBar>
      <AdminHeader data = {data} buttonClick = {handleLogOutClick}></AdminHeader>
      {/* <div>AdminProfile</div> */}
    </Fragment>
  );
}
