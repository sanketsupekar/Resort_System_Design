import React, { useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed

function GenerateOTP(props) {
  const [formData, setFormData] = useState({
    email: props.userEmail,
  });
  const [disabledButton, setButtonState] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    props.onClickGenerateOTP(e);
    // console.log(formData);
    // setFormData({
    //   email: "",
    // })
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
                disabled
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button">
            <button disabled={disabledButton}>Get OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenerateOTP;
