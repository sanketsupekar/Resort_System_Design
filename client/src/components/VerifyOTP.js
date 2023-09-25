import React, { useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyOTP() {
  const [formData, setFormData] = useState({
    otp: "",
    
   
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   // console.log(e);
    setFormData({ ...formData, [name]: value });
    

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    console.log(formData);
    setFormData({
      otp: "",
    });
  
    
    
  };

  const notify = (e) => {
    toast.success("OTP verified successfully");
  }

  return (
    <div className="login_container">
      <div className="title">Validate OTP </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            {/* OTP */}
            <div className="input-box">
              <span className="details">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button">
            <button onClick={notify}> Submit</button>
            
          </div> 
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VerifyOTP;
