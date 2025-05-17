import React, { useState } from "react";
import { MdGroups, MdPayment, MdCheck, MdPhone, MdEmail, MdPerson } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./MembershipFlipCard.css";

const MembershipMini = () => {
  const [isFlipped, setIsFlipped] = useState(true);
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    member_true: false,
    id: "6",
  });
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const handleValidate = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post('https://iks-admin-backend.vercel.app/member/phone', { phone });
      
      if (response.data) {
        setUserData(response.data);
        toast.success("Member validated successfully!");
      } else {
        setIsFlipped(true);
        toast.info("No member found with this number. Please register.");
      }
    } catch (error) {
      toast.error("Error validating phone number. Please try again.");
      setIsFlipped(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id === 'signup-phone' ? 'phone' : id === 'about' ? 'address' : id]: value
    });
  };

  // Handle registration form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setRegistrationLoading(true);
    try {
      // Make API call to register new member
      const response = await axios.post('https://iks-admin-backend.vercel.app/register_new_user_request', formData);
      
      if (response.data && response.data.success) {
        toast.success("Registration successful! We'll review your application and get back to you soon.");
        setIsFlipped(false); // Flip back to front side
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          address: "",
          member_true: false,
          id: "6"
        }); // Reset form
      } else {
        toast.error(response.data.message || "Registration failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Error during registration. Please try again later.");
      console.error("Registration error:", error);
    } finally {
      setRegistrationLoading(false);
    }
  };

  return (
    <div className="membership-container">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className={`membership-card ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT - Pay Subscription */}
        <div className="membership-side front">
          <div className="card-header">
            <h2><MdPayment /> Pay Your yearly Subscription</h2>
          </div>
          
          <div className="card-content">
            <div className="form-section">
              <div className="input-group">
                <label htmlFor="phone">Enter Phone Number</label>
                <div className="input-with-button">
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your registered number"
                  />
                  <button 
                    onClick={handleValidate} 
                    className={`primary-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Validating..." : "Validate"}
                  </button>
                </div>
              </div>

              {userData && (
                <div className="member-details">
                  <div className="member-info">
                    <h3>Member Information</h3>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>ID:</strong> {userData.id}</p>
                  </div>
                  
                  {!showQR ? (
                    <button
                      onClick={() => setShowQR(true)}
                      className="primary-button wide"
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <div className="qr-container">
                      <img
                        src="/sample-qr.png"
                        alt="QR Code for Payment"
                        className="payment-qr"
                      />
                      <p>Scan to complete payment</p>
                    </div>
                  )}
                </div>
              )}
              
              {!userData && !isLoading && (
                <div className="not-member">
                  <p>Not a member yet?</p>
                  <button 
                    onClick={() => setIsFlipped(true)} 
                    className="secondary-button"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>

    
          </div>
        </div>

        {/* BACK - Become a Member */}
        <div className="membership-side back">
          <div className="card-header">
            <h2><MdGroups /> Become a Member</h2>
          </div>
          
  
            
            <div className="form-section">
              <h3>Membership Application</h3>
              <form className="signup-form" onSubmit={handleRegistration}>
                <div className="input-group">
                  <label htmlFor="name">
                    <MdPerson /> Full Name <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="email">
                    <MdEmail /> Email Address <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="signup-phone">
                    <MdPhone /> Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    required
                    placeholder="Enter your number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="about">Address</label>
                  <textarea
                    id="about"
                    placeholder="Enter your address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="button-group">
                  <button 
                    type="submit" 
                    className={`primary-button ${registrationLoading ? 'loading' : ''}`}
                    disabled={registrationLoading}
                  >
                    {registrationLoading ? "Processing..." : "Request to join community"}
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="secondary-button"
                  >
                    Go Back
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MembershipMini;