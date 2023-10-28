import React, { Fragment } from "react";
import "../styles/components/dining.css";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import {dining_main,dining_sub,dining_staff} from "../image/index";
import Footer from "../components/Footer";


export default function Dining() {
    const headerData = {
        title: "Restaurant",
        sub_title:
          "Experience the limitless diversity of our cuisine",
        image: "dining_header.jpg",
      };
  return (
    <Fragment>
        <Navbar></Navbar>
        <Header data = {headerData}></Header>
      {/* <div>Dining</div> */}
      <div className="dining-page">
        <div className="containers">

       
      <div className="container_one">
        <h1 className="title">Flavors United</h1>
        <p className="sub-title">
          We invite you to take a worldwide culinary adventure. Our menu
          features a diverse range of international dishes, blending flavors
          from across the globe to please every palate. Join us, explore the
          world through your taste buds, and experience the limitless diversity
          of our cuisine.
        </p>
      </div>

  
        <div className="container_two">
          <div className="split-pane left-pane">
            <img className="img" src={dining_sub} alt="dining_pic" />
          </div>
          <div className="split-pane right-pane">
            <img className="img" src={dining_staff} alt="dining_pic" />
            <h2 className="title">Best Culinary Team</h2>
            <p className="paragraph">
              Be captivated delight in the world-famous fusion of great taste.
              With stunning views of iconic Table Mountain, dining restaurant
              comes alive with innovative dishes sparkling conversation and
              chilled-out tunes.
            </p>
          </div>
        </div>

      <div className="container_three">
            <div className="container-item img-container">
              <img className="img" src={dining_main} />
            </div>
            <div className="container-item info-container">
              <h1 className="title">Dine in Paradise</h1>
              <p className="sub-title">
              
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora alias placeat deleniti voluptates debitis quibusdam
                quidem inventore distinctio. Nostrum itaque soluta recusandae
                repudiandae? Cum facere, dolores vel aliquam libero
                perspiciatis?<br></br>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                reiciendis quisquam in et asperiores omnis repellat vitae
                placeat id doloribus? Sed rerum repellendus voluptates molestias
                cumque illo nisi consequatur assumenda.
              </p>
            
            </div>
          </div>
    </div>
    </div>
    <Footer></Footer>
    </Fragment>
  );
}


