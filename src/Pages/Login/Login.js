import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

import { baseUrl } from "Helper/UrlHelper/UrlHelper"; // Importing base URL for API requests
import { userLogin } from "Helper/UrlHelper/UserUrlHelper.js"; // Importing user-related API endpoint URLs

import { postData } from "Utils/HttpClient"; // Importing HTTP client utility functions

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //  login function
  const loginHandler = async () => {
    try {
      let userData = {
        email: userEmail,
        password: userPassword,
      };

      const endPoint = baseUrl + userLogin; // API endpoint for getting all users
      const response = await postData(endPoint, userData); // Making HTTP GET request

      console.log(response);
      if (response.status) {
        // assigning the loggedin user's id,token,all data to the browser's local storage.
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form">
        <h1>Todo Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />

        <button type="button" className="login_btn" onClick={loginHandler}>
          Login
        </button>
        <p className="register_link">
          Do not have account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
