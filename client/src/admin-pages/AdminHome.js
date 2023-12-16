import React, { useEffect, useState } from "react";
import NavBar from "../admin-components/NavBar";
import { isAdminLoggedIn } from "../components/UserFunctions";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin-components/AdminHeader";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/admin-styles/adminHome.css";

export default function AdminHome() {
  const [loggedIn, setLogin] = useState(isAdminLoggedIn());
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const bookings = [
    {
      start: new Date(),
      end: new Date(new Date().setDate(4)),
      title: `Ola Stay (Human:)`,
      color: "red",
    },
    {
      start: new Date(),
      end: new Date(new Date().setDate(2)),
      title: `Sanket Supekar`,
      color: "blue",
    },
    {
      start: new Date(),
      end: new Date(new Date().setDate(6)),
      title: `Sanket Supekar`,
      color: "yellow",
    },
  ];
  const data = {
    title: "Admin",
    sub_title: "You have rights to do any thing",
    image: "admin_header.jpg",
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/admin/signin");
    }
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <AdminHeader data={data}></AdminHeader>
      <div>AdminHome</div>
      <div className="admin-home">
        <div className="admin-home-container">
          {/* <div className="calender-container">
            <Calendar
              onSelectEvent={(e) => {
                console.log(e);
              }}
              onSelecting={() => alert(312321)}
              localizer={localizer}
              events={bookings}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700 }}
              eventPropGetter={(event) => {
                const backgroundColor = event.color;
                return { style: { backgroundColor } };
              }}
            />
          </div> */}
          <div className="booking-container"></div>
        </div>
      </div>
    </>
  );
}
