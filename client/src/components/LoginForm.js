import React, { useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    
    password: ""
    
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
  };

  return (
    <div className="login_container">
      <div className="title">Login</div>
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
  );
}

export default LoginForm;
