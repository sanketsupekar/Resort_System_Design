import React, { useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed

function GenerateOTP() {
  const [formData, setFormData] = useState({
    email: "",
    
   
    
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
      email: "",
    })
  };

  return (
    <div className="login_container">
      {/* <div className="title">Get OTP </div> */}
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

            

            </div>

            <div className="button">
            <button> Get OTP</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenerateOTP;
