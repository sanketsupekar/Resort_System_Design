import React, { useState, useEffect } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed

function VerifyOTP(props) {
  const [formData, setFormData] = useState({
    otp: "",
  });

  const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClickSubmitOTP(formData);
    setFormData({otp :""})
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
    else
    {
      props.otpSubmitTimeExpair();
    }
  }, [timer]);

  return (
    <div className="login_container">
      <div className="title">Validate OTP</div>
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

          <div className="timer">Time left: {timer} seconds</div>

          <div className="button">
            <button disabled={timer <= 0}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
