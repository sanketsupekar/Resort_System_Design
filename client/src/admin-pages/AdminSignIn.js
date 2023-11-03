import React, { Fragment, useEffect, useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed
import NavBar from "../admin-components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import {useStateValue} from '../Context/StateProvider';
import {actionTypes} from '../Context/reducer';

const { displaySuccess, displayError } = require("../components/NotifyToast");
const { fetchAPI, isAdminLoggedIn } = require("../components/UserFunctions");
const {API_ADMIN_adminLogin} = require('../api/index');


function AdminSignIn() {
  const [{CustomerUser}, dispatchUser] = useStateValue();
  const [loggedIn,setLogin] = useState(isAdminLoggedIn());
  const [loadingVisible, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function userValidation(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_ADMIN_adminLogin, "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 400) {
      displayError(json.message);

      setFormData({
        email: "",
        password: "",
      });
    } else if (respones.status == 200) {
      displaySuccess(json.message);
      dispatchUser({
        type: actionTypes.SET_ADMIN,
        adminToken: json.token,
      });
      console.log("success");
      navigate("/admin");
      
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    userValidation(formData);
  };

  useEffect(()=>{
    if(loggedIn)
    {
      navigate("/admin");
    }
  },[])
  return (
    <>
      <NavBar />
      {loadingVisible ? <LoadingSpinner /> : <Fragment />}
      <div className="login_container">
        <div className="title">Admin Login</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              {/* Email */}
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
            </div>

            <div className="button">
              <button> Login</button>
            </div>
            
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminSignIn;
