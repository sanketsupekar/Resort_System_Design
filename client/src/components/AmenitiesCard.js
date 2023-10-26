import React, { Fragment } from "react";
import "../styles/components/amenitiesCard.css"
import {delux_room} from "../image/index"
import {amenitiesImage} from "../components/UserFunctions"
export default function AmenitiesCard(props) {
  const image = amenitiesImage(props.name)
  return (
    <Fragment>
      <div className="amenities_card">
        <div className="container">
         <img className="amenity amenity_img" src={`/img/amenities/${image}`}>

         </img>
         <h5 className="amenity amenity_name">{String(props.name).toUpperCase()}</h5>
        </div>
      </div>
    </Fragment>
  );
}
