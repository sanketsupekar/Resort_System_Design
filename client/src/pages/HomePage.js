import React from 'react';
import Navbar from '../components/NavBar'; // Import the Navbar component
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
function HomePage() {
  return (
    <>
    <Navbar/>
    <RegistrationForm/>
    {/* <LoginForm/> */}
    
    </>
  );
}

export default HomePage;
