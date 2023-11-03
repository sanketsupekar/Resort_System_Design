import React from 'react'
import NavBar from '../admin-components/NavBar'
import AdminHeader from '../admin-components/AdminHeader';

export default function AdminEnquire() {
    const data = {
        title: "Enquiries From Customer",
        sub_title:
          "Any Questions?? Glad to hear you! ",
          image : "admin_enquire_header.jpg"
      };
  return (

    <>
    <NavBar></NavBar>
    <AdminHeader data={data}></AdminHeader>
    </>
  )
}
