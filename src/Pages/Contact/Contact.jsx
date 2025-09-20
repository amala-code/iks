import React from "react";
import "./Contact.css";
import { NavLink } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import MembershipFlipCard from "../Member/member";
import Member from "../IKSMember/Memebr";
import MembershipMini from "../Member/membership_mini";

const Contact = () => {
  return (
    <>
      <div className="Contact_mainContainer">
        <div className="Contact_bannerContainer">
          <div className="Contact_headContnainer_text">
            <h2 className="Contact_heading">Contact Us</h2>
            <p className="Contact_subhead">
              Get in touch with our community. We're here to help and answer any
              questions you might have.
            </p>
          </div>
        </div>
        <div className="Contact_subContainer1">
          <div className="Contact_iconsGrid">
            <div className="Contact_iconDiv1">
              <div className="Contact_icon_circle">
                <IoMail />
              </div>
              <div className="Contact_iconDiv1_text1">Email Us</div>
              <div className="Contact_iconDiv1_text2">
                <a
                  className="Contact_iconLink"
                  href="mailto:contact@ikscommunity.org"
                >
indorekeraleeya_samajam@rediffmail.com                </a>
              </div>
              <div className="Contact_iconDiv1_text3">Send us an email</div>
            </div>
            <div className="Contact_iconDiv1">
              <div className="Contact_icon_circle">
                <IoCall />
              </div>
              <div className="Contact_iconDiv1_text1">Call Us</div>
              <div className="Contact_iconDiv1_text2"> 91115 70909</div>
              <div className="Contact_iconDiv1_text3">Give us a call</div>
            </div>
            <div className="Contact_iconDiv1">
              <div className="Contact_icon_circle">
                <FaClock />
              </div>
              <div className="Contact_iconDiv1_text1">Office Hours</div>
              <div className="Contact_iconDiv1_text2">Mon - Fri: 9AM - 6PM</div>
              <div className="Contact_iconDiv1_text3">Visit our office</div>
            </div>
          </div>
        </div>
        <div className="Contact_Formcontainer">
          {/* <div className="Contact_FormContainerDiv1">
            <div className="Contact_FormContainerDiv1_headText">
              Join our community
            </div>
            <div className="Contact_inputContainer">
              <div className="Contact_field">
                <label className="Contact_inputName">
                  Full Name{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
                </label>
                <input
                  required
                  className="Contact_input"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="Contact_field">
                <label className="Contact_inputName">
                  Email Address{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
                </label>
                <input
                  required
                  className="Contact_input"
                  type="text"
                  placeholder="Enter your mail"
                />
              </div>
              <div className="Contact_field">
                <label className="Contact_inputName">
                  Phone Number{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
                </label>
                <input
                  required
                  className="Contact_input"
                  type="text"
                  placeholder="Enter your number"
                />
              </div>
              <div className="Contact_field">
                <label className="Contact_inputName">
                  Occupation{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
                </label>
                <input
                  required
                  className="Contact_input"
                  type="text"
                  placeholder="What do you do?"
                />
              </div>
              <div className="Contact_field">
                <label className="Contact_inputName">About you </label>
                <textarea
                  className="signup_input signup_textarea"
                  type="description"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div
                style={{ marginTop: "20px" }}
                className="Contact_button_container"
              >
                <div className="Contact_button">Join our community</div>
              </div>
              <h4 style={{ marginTop: "20px" }} className="signup_subhead">
                Already a member{" "}
                <NavLink to="/login" className="Contact_login_button">
  Click here
</NavLink>
              </h4>
            </div>
          </div> */}
          <MembershipMini/>
          <div className="Contact_FormContainerDiv1">
            <div className="Contact_FormContainerDiv1_headText">Vist Us</div>
            <div className="Contact_mapContainer">
              <iframe
                title="Winway World Office Map"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen


                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d117751.44969079601!2d75.79186428617214!3d22.73817067703532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3962fd67b701745b%3A0xbca80503e8a0f8f1!2sPink%20Flower%20Road%2C%20Near%2C%20Janta%20Quarters%20Main%20Rd%2C%20Janta%20Quarter%2C%20Indore%2C%20Madhya%20Pradesh%20452011!3m2!1d22.738173099999997!2d75.8742946!5e0!3m2!1sen!2sin!4v1747065893210!5m2!1sen!2sin" />
                
              
            </div>
            <div className="Contact_mapText">
              <FaLocationDot style={{ color: "#c93c20" }} /> 
              The Indore Keraleeya Samajam,
              <br/> 216 to 228, Janta Colony,                Stadium Ground,  Nanda Nagar, <br />
              Stadium Ground,  Nanda Nagar,

INDORE  (MP) – 452 011 <br />
            </div>
   
          </div>
        </div>
        <div className="Contact_FAQ">
          <div className="Contact_FormContainerDiv1_headText">
            Frequently Asked Questions
          </div>
          <div className="Contact_FAQ_questions_gridContainer">
            <div className="Contact_FAQ_QuestionDiv_main">
              <div className="Contact_FAQ_QuestionDiv_sub">
                <h4 className="Contact_FAQ_question">
                  What activities do you organize?
                </h4>
                <p className="Contact_FAQ_answer">
                  We organize workshops, meetups, cultural events, and various
                  community initiatives.
                </p>
              </div>
              <div className="Contact_FAQ_QuestionDiv_sub">
                <h4 className="Contact_FAQ_question">How can I volunteer?</h4>
                <p className="Contact_FAQ_answer">
                  Contact us through the form or email, and we'll connect you
                  with volunteer opportunities.
                </p>
              </div>
            </div>

            <div className="Contact_FAQ_QuestionDiv_main">
              <div className="Contact_FAQ_QuestionDiv_sub">
                <h4 className="Contact_FAQ_question">
                  How can I join the community?
                </h4>
                <p className="Contact_FAQ_answer">
                Fill out our community join form above, and we'll get back to you within 48 hours with all the necessary details!
                </p>
              </div>
              <div className="Contact_FAQ_QuestionDiv_sub">
                <h4 className="Contact_FAQ_question">
                  Is there a membership fee?
                </h4>
                <p className="Contact_FAQ_answer">
                Unlock lifetime access for only ₹ 2001/- Continue enjoying premium benefits each year with a ₹ 600/- annual subscription.

</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
