import React from "react";
import logo from "../../../Images/IKS_logo.png";
import "./Login.css";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="signup_mainContainer">
        <div className="signup_subContainer">
          <div className="signup_logoContainer">
            <img className="signup_logo" src={logo} alt="" />
          </div>
          <h1 className="signup_heading">
            Welcome to The Indore Keraleeya Samajam
          </h1>
          <h4 className="signup_subhead">
            Thank you for being a part of our growing community
          </h4>

          {/* Input Fileds */}

          <div className="signup_inputContainer">
            <div className="signup_field">
              <label className="signup_inputName">
                Email address{" "}
                <span style={{ color: "red" }} className="required">
                  *
                </span>
              </label>
              <input
                required
                className="signup_input"
                type="text"
                placeholder="you@gmail.com"
              />
            </div>
            <div className="signup_field">
              <label className="signup_inputName">
                Password{" "}
                <span style={{ color: "red" }} className="required">
                  *
                </span>
              </label>
              <input
                required
                className="signup_input"
                type="password"
                placeholder="Create a stong password"
              />
            </div>

            <div
              style={{ marginTop: "20px" }}
              className="signup_button_container"
            >
              <div className="signup_button">Login In</div>
            </div>
            <h4 style={{ marginTop: "20px" }} className="signup_subhead">
              Want to join us?{" "}
              <NavLink to="/membership" className="signup_login_button">
                Click here
              </NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
