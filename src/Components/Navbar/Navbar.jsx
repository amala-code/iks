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
      {/* <div className="phone-number">info.gmail.com</div>

      <div className="phone-number">+91 731 234 5678</div> */}

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

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../../Images/IKSlogo.jpg";
// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navRef = useRef(null);
//   const navigate = useNavigate();

//   // Close the menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navRef.current && !navRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [menuOpen]);

//   const handleJoinUsClick = () => {
//     navigate("/membership");
//     setMenuOpen(false);
//   };

//   return (
//     <nav className="navbar" ref={navRef}>
//       <div className="nav-container">
//         {/* Logo and Title Section */}
//         <div className="nav-logo">
//           <img src={logo} alt="IKS Logo" className="logo" />
//           <div className="nav-title">
//             <h1>THE INDORE KERALEEYA SAMAJAM</h1>
//             <p className="nav-subtitle">Preserving Culture, Building Community</p>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="nav-contact">
//           {/* <div className="contact-item">
//             <span className="contact-icon">📞</span>
//             <a href="tel:+917312345678">+91 731 234 5678</a>
//           </div> */}
//           <div className="contact-item">
//             <span className="contact-icon">✉️</span>
//             <a href="mailto:info@indorekeraleeya.org">info@indorekeraleeya.org</a>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <li>
//             <NavLink 
//               to="/" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/about" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               About Us
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/iksmembers" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               Office Bearers
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/events" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               Events
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/gallery" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               Gallery
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/contact" 
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               Contact
//             </NavLink>
//           </li>
//           <li>
//             <button className="join-btn" onClick={handleJoinUsClick}>
//               Membership
//             </button>
//           </li>
//         </ul>

//         {/* Hamburger Menu */}
//         <div 
//           className={`hamburger ${menuOpen ? "active" : ""}`} 
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

