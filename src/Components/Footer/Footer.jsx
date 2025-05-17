import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            {/* <img src={logo} alt="IKS Logo" className="footer-logo-img" /> */}
            <span> The Indore Keraleeya Samajam</span>
          </div>
          <p className="footer-description">
            Preserving and celebrating the rich cultural heritage of Kerala in Indore.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Programs</h3>
          <ul>
            <li>
              {/* <NavLink to="/cultural-events">Cultural Events</NavLink> */}
              Cultural Events
            </li>
            <li>
              {/* <NavLink to="/malayalam-classes">Community engagemnet activities</NavLink> */}
              Community engagemnet activities
            </li>
            <li>
              {/* <NavLink to="/youth-activities">Youth Activities</NavLink> */}
              Youth Activities
            </li>
            <li>
              {/* <NavLink to="/community-support">Community Support</NavLink> */}
              Community Support
            </li>
          </ul>
        </div>

     
      </div>

      <div className="footer-bottom">
        © 2025 The Indore Keraleeya Samajam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;