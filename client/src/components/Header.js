import React from "react";
import "../styles/components/header.css";
export default function Header(props) {
  return (
    <div className="header">
      <div
        className="header_container"
        style={{
          background: `no-repeat center/cover linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url("/img/header/${props.data.image}")`,
        }}
      >
        <div className=" header_content">
          <h1 className="header_title">{props.data.title}</h1>
          <p className="header_sub_title"> {props.data.sub_title}</p>
         { props.data.button_name !== undefined && <button className="header_button">Log Out</button>}
        </div>
      </div>
    </div>
  );
}
