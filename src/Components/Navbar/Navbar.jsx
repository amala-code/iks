import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";
import logo from "../../Images/IKSlogo.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref for the navbar
  const navigate = useNavigate(); // Hook for navigation

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
      }
    };

    // Add event listener when the menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]); // Re-run effect when menuOpen changes

  // Handle Join Us button click
  const handleJoinUsClick = () => {
    navigate("/membership"); // Navigate to the signup page
    setMenuOpen(false); // Close the menu (for mobile view)
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-title">
          <h1>THE INDORE KERALEEYA SAMAJAM</h1>
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/iksmembers" onClick={() => setMenuOpen(false)}>
            Office Bearers
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" onClick={() => setMenuOpen(false)}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </li>
        <li>
          {/* Use a button with onClick for navigation */}
          <button className="join-btn" onClick={handleJoinUsClick}>
           Membership
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;