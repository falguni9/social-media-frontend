import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

function Auth() {
    const navigate = useNavigate()
    const baseURL = 'http://localhost:3000'
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registrationError, setRegistrationError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(registerData)
      const response = await axios.post(`${baseURL}/api/user/register`, registerData);
      console.log('Registration successful:', response.data);
      // You can redirect the user to the login page or perform other actions here
      setRegistrationError(response.data.message);
      window.alert("Registration successful , Please LOGIN");
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setRegistrationError(error.response.data.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/user/login`, loginData);
      console.log('Login successful:', response.data);
      navigate("/profile")
      // You can redirect the user to the dashboard or perform other actions here
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error('Login error:', error.response.data);
      setLoginError(error.response.data.message);
    }
  };

  return (
    <div className="container m-7 bg-light">
      <h2>User Authentication</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Register</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group ">
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            {registrationError && (
              <div className="alert alert-danger">{registrationError}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
