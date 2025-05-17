import React from "react";
import "./Signup.css";
import logo from "../../../Images/IKS_logo.png";
import { NavLink } from "react-router-dom";

const Signup = () => {
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
          <h4 className="signup_subhead">Be a part of our growing community</h4>

          {/* Input Fileds */}

          <div className="signup_inputContainer">
            <div className="signup_field">
              <label className="signup_inputName">
                Full Name{" "}
                <span style={{ color: "red" }} className="required">
                  *
                </span>
              </label>
              <input
                required
                className="signup_input"
                type="text"
                placeholder="Enter your full name"
              />
            </div>
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
            <div className="signup_field">
              <label className="signup_inputName">Occupation</label>
              <input
                required
                className="signup_input"
                type="text"
                placeholder="What do you do?"
              />
            </div>

            <div className="signup_field">
              <label className="signup_inputName">Living in Indore since</label>
              <input
                required
                className="signup_input"
                type="date"
                placeholder="What do you do?"
              />
            </div>

            <div className="signup_checkbox_field">
              <label
                style={{ marginBottom: "10px" }}
                className="signup_inputName"
              >
                Interests
              </label>
              <div className="signup_checkbox_group">
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Community Service
                  </label>
                </div>
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Cultural Events
                  </label>
                </div>
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Education
                  </label>
                </div>
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Sports
                  </label>
                </div>
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Arts & crafts
                  </label>
                </div>
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label className="signup_inputName" htmlFor="checkbox">
                    Business
                  </label>
                </div>
              </div>
            </div>

            <div className="signup_field">
              <label className="signup_inputName">About you </label>
              <textarea
                className="signup_input signup_textarea"
                type="description"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="signup_button_container">
              <div className="signup_button">Join Community</div>
            </div>
            <h4 style={{ marginTop: "20px" }} className="signup_subhead">
              Already a member?{" "}
              <NavLink to="/login" className="signup_login_button">
                Login
              </NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
