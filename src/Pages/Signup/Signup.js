import { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import { baseUrl } from "Helper/UrlHelper/UrlHelper"; // Importing base URL for API requests
import { userSignUp } from "Helper/UrlHelper/UserUrlHelper.js"; // Importing user-related API endpoint URLs

import { postData } from "Utils/HttpClient"; // Importing HTTP client utility functions

const Signup = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //sign up function
  const signUpHandler = async () => {
    try {
      let userData = {
        name,
        surname,
        email: userEmail,
        password: userPassword,
      };

      const endPoint = baseUrl + userSignUp; // API endpoint for getting all users
      const response = await postData(endPoint, userData); // Making HTTP GET request

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
    <div className="signup_container">
      <div className="signup_form">
        <h1>Todo Sign up</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter Surname"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />

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

        <button type="button" className="signup_btn" onClick={signUpHandler}>
          Sign up
        </button>
        <p className="login_link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
