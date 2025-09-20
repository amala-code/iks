import React, { useState } from "react";
import { MdGroups, MdPayment, MdCheck, MdPhone, MdEmail, MdPerson, MdDownload } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./MembershipFlipCard.css";
import "./PaymentCard.css";

const MembershipFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    member_true: false,
    id: "Not allocated",
  });
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const API_BASE_URL = 'https://new-admin-backend.vercel.app';

  const handleValidate = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/member/phone`, { phone });
      
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

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Get membership amount
  const getMembershipAmount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/membership-amount`);
      return response.data;
    } catch (error) {
      console.error('Error getting membership amount:', error);
      throw error;
    }
  };

  // Create order
  const createOrder = async (amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: 'INR'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  // Verify payment
  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  // Handle payment process
  const handlePayment = async () => {
    setShowQR(true);
    setPaymentLoading(true);
    setPaymentStatus(null);
    setTransactionDetails(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setPaymentLoading(false);
        return;
      }

      // Get membership amount
      const amountData = await getMembershipAmount();
      const amount = amountData.amount;

      // Create order
      const orderData = await createOrder(amount);

      // Razorpay options
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'The Indore Keraleeya Samajam',
        description: 'Annual Membership Subscription',
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // Verify payment
            const verificationResult = await verifyPayment({
              member_id: userData.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            setPaymentStatus('success');
            setTransactionDetails({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: orderData.amount / 100,
              verificationStatus: verificationResult.status,
              message: verificationResult.message,
              memberName: userData.name,
              memberId: userData.id,
              date: verificationResult.date,
              time: verificationResult.time
            });

            toast.success("Payment successful! Your membership has been renewed.");

          } catch (error) {
            console.error('Payment verification failed:', error);
            setPaymentStatus('failed');
            setTransactionDetails({
              error: 'Payment verification failed',
              details: error.message
            });
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email || '',
          contact: phone,
        },
        theme: {
          color: '#ff6b35',
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('cancelled');
            setPaymentLoading(false);
            toast.info('Payment was cancelled');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setPaymentStatus('failed');
      setTransactionDetails({
        error: 'Payment initiation failed',
        details: error.message
      });
      setPaymentLoading(false);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  // Download transaction receipt as PDF
  const downloadReceipt = () => {
    // Create a new window for the PDF
    const printWindow = window.open('', '_blank');
    
    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>IKS Payment Receipt</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #fff5f2, #ffffff);
                color: #333;
            }
            .receipt-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border: 3px solid #ff6b35;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
            }
            .header {
                background: linear-gradient(135deg, #ff6b35, #ff8a65);
                color: #f05a22;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 1px;
            }
            .header h2 {
                margin: 10px 0 0 0;
                font-size: 18px;
                font-weight: normal;
                opacity: 0.9;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 25px;
                padding: 20px;
                background: #fff5f2;
                border-radius: 10px;
                border-left: 4px solid #ff6b35;
            }
            .section h3 {
                color: #ff6b35;
                margin: 0 0 15px 0;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #ffe4dc;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #666;
            }
            .detail-value {
                font-weight: bold;
                color: #333;
                text-align: right;
            }
            .amount {
                font-size: 18px;
                color: #ff6b35;
            }
            .status {
                background: #ff6b35;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background: #fafafa;
                color: #666;
                font-size: 14px;
                border-top: 2px solid #ffe4dc;
            }
            .thank-you {
                color: #ff6b35;
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 10px;
            }
            @media print {
                body { background: white; }
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="header">
                <h1>THE INDORE KERALEEYA SAMAJAM</h1>
                <h2>MEMBERSHIP PAYMENT RECEIPT</h2>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Member Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${transactionDetails.memberName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Member ID:</span>
                        <span class="detail-value">${transactionDetails.memberId}</span>
                    </div>
                </div>
                
                <div class="section">
                    <h3>Transaction Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Payment ID:</span>
                        <span class="detail-value">${transactionDetails.paymentId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Order ID:</span>
                        <span class="detail-value">${transactionDetails.orderId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Amount:</span>
                        <span class="detail-value amount">₹${transactionDetails.amount}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date & Time:</span>
                        <span class="detail-value">${transactionDetails.date} ${transactionDetails.time}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value"><span class="status">${transactionDetails.verificationStatus}</span></span>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div class="thank-you">Thank you for your membership!</div>
                <p>This is a computer generated receipt and does not require signature.</p>
                <p>For any queries, please contact The Indore Keraleeya Samajam</p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
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
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setRegistrationLoading(true);
    try {
      const response = await axios.post(
        "https://new-admin-backend.vercel.app/register_non_member_request",
        formData
      );
    
      // If API responds with 200/201 = success
      if (response.status === 200 || response.status === 201) {
        toast.success(
          response.data.message ||
            "Your Information is sent successfully. We'll review your application and get back to you soon."
        );
    
        setIsFlipped(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          member_true: false,
          id: "Not Allocated",
        });
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again later."
        );
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
                    
                    <p>
  <strong>Subscription:</strong>{" "}
  {userData && userData.amount_subscription
    ? `Paid — ${new Date().getFullYear()}`
    : `Due — ${new Date().getFullYear()}`}
</p>
                    
                    {paymentLoading && (
                      <div className="payment-loader-container">
                        <div className="payment-loader"></div>
                        <p>Processing payment...</p>
                      </div>
                    )}

                    {paymentStatus === 'success' && (
                      <div className="payment-success-card">
                        <div className="payment-success-section">
                          <div className="success-animation">
                            <div className="checkmark-circle">
                              <div className="checkmark"></div>
                            </div>
                          </div>
                          
                          <div className="success-message">
                            <h4>Payment Successful!</h4>
                            <p>Your membership has been renewed successfully.</p>
                          </div>
                          
                          <button 
                            onClick={downloadReceipt}
                            className="download-receipt-button"
                          >
                            <MdDownload />
                            Download Receipt
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentStatus === 'failed' && (
                      <div className="payment-failed-section">
                        <div className="failed-animation">
                          <div className="error-circle">
                            <div className="error-cross"></div>
                          </div>
                        </div>
                        
                        <div className="error-message">
                          <h4>Payment Failed</h4>
                          <p>{transactionDetails.error}</p>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setShowQR(false);
                            setPaymentStatus(null);
                            setTransactionDetails(null);
                          }}
                          className="retry-button"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {(!showQR || paymentStatus === 'cancelled' || paymentStatus === 'failed') && paymentStatus !== 'success' && (
                    <button
                      onClick={handlePayment}
                      className="primary-button wide"
                    >
                      Proceed to Payment
                    </button>
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

            <div className="info-section">
              <h3>Subscription Benefits</h3>
              <ul className="benefits-list">
                <li><MdCheck /> Renew your annual membership</li>
                <li><MdCheck /> Support community cultural events</li>
                <li><MdCheck /> Stay connected with community updates</li>
                <li><MdCheck /> Access to exclusive member gatherings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BACK - Become a Member */}
        <div className="membership-side back">
          <div className="card-header">
            <h2><MdGroups /> Become a Member</h2>
          </div>
          
          <div className="card-content">
            <div className="benefits-section">
              <h3>Membership Benefits</h3>
              <ul className="benefits-list">
                <li><MdCheck /> Access to all cultural events and programs</li>
                <li><MdCheck /> Exclusive community gatherings</li>
                <li><MdCheck /> Voting rights in community decisions</li>
                <li><MdCheck /> Special discounts on event tickets</li>
                <li><MdCheck /> Networking opportunities</li>
              </ul>
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
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="secondary-button"
                  >
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={{margin:"10rem"}} ></div>
    </div>
  );
};

export default MembershipFlipCard;