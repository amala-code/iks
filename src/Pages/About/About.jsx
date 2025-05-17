
import React from "react";
import "./About.css";
import { NavLink } from "react-router-dom";
import img1 from "../../Images/all.JPG";
import img2 from "../../Images/ab5.JPG";
import img3 from "../../Images/ab2.JPG";
import img4 from "../../Images/ab3.JPG";
import img5 from "../../Images/ab4.JPG";
import { FaCheckCircle, FaBookOpen, FaUsers, FaBullseye, FaCalendarAlt, FaHandshake, FaForward } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="about_us_mainContainer">
        <div className="about_us_headContainer">
          <div className="about_us_headContnainer_text">
            <h1 className="about_us_heading">About Us</h1>
            <p className="about_us_subhead">
              Preserving and celebrating Kerala in Indore
            </p>
          </div>
        </div>
        
        <div className="about_us_subcontainer1">
          <div className="about_us_subcontainer1_div1">
            <h1 className="about_us_subcontainer1_div1_headText">The Indore Keraleeya Samajam</h1>
            <p className="about_us_subcontainer1_div1_text">
              The Indore Keraleeya Samajam is a socio-cultural organization uniting
              the Malayalee community in Indore. We welcome all Malayalees,
              regardless of religious beliefs or social status, creating a
              common platform for preserving Kerala's rich heritage.
            </p>
            
            <div className="about_us_mission">
              <h3 className="about_us_section_title">Our Mission</h3>
              <ul className="about_us_bullet_list">
                <li><FaCheckCircle className="bullet_icon" /> Foster community bonds through cultural celebrations</li>
                <li><FaCheckCircle className="bullet_icon" /> Preserve and promote Kerala's rich heritage</li>
                <li><FaCheckCircle className="bullet_icon" /> Create a home away from home for Malayalees in Indore</li>
                <li><FaCheckCircle className="bullet_icon" /> Engage with Indore's diverse population</li>
                <li><FaCheckCircle className="bullet_icon" /> Nurture young talents within our community</li>
              </ul>
            </div>
            
            <p className="about_us_subcontainer1_div1_text">
              The heart of our Samajam beats strongest during our cultural
              celebrations and community gatherings. Throughout the year, we
              organize numerous events that showcase the rich artistic heritage
              of Kerala - from traditional festival celebrations like Onam and
              Vishu to contemporary cultural programs.
            </p>
          </div>
          
          <div className="about_us_subcontainer1_div2">
            <img
              className="about_us_subcontainer1_div2_img"
              src={img1}
              alt="IKS Community Event"
            />
            <img
              className="about_us_subcontainer1_div2_img"
              src={img2}
              alt="IKS Cultural Program"
            />
            <img
              className="about_us_subcontainer1_div2_img"
              src={img3}
              alt="IKS Festival Celebration"
            />
            <img
              className="about_us_subcontainer1_div2_img"
              src={img4}
              alt="IKS Community Gathering"
            />
          </div>
        </div>
        
        <div className="about_us_objectives">
          <h2 className="about_us_objectives_title"><FaBullseye /> Primary Objectives</h2>
          <div className="about_us_objectives_grid">
            <div className="objective_card">
              <FaCalendarAlt className="objective_icon" />
              <h3>Cultural Promotion</h3>
              <p>Organizing festivals such as Onam, Vishu, Christmas, and New Year to preserve Kerala's traditional customs, art forms, and cuisine.</p>
            </div>
            
            <div className="objective_card">
              <FaHandshake className="objective_icon" />
              <h3>Social Welfare</h3>
              <p>Conducting charitable activities, including medical aid, scholarships, and assistance for the underprivileged.</p>
            </div>
            
            <div className="objective_card">
              <FaUsers className="objective_icon" />
              <h3>Community Engagement</h3>
              <p>Strengthening bonds among Malayalis in Indore through social gatherings, literary events, and interactive sessions.</p>
            </div>
            
            {/* <div className="objective_card">
              <FaBookOpen className="objective_icon" />
              <h3>Educational Development</h3>
              <p>Encouraging Malayalam language learning, conducting career guidance, and providing platforms for students to exhibit their talents.</p>
            </div> */}
          </div>
        </div>
        
        <div className="about_us_subcontainer2">
          <h3 className="about_us_section_title">Membership Information</h3>
          <div className="membership_types">
            <div className="membership_card">
              <h4>Life Membership</h4>
              <ul className="membership_details">
                <li>Open to all Keralites aged 18+ residing in Indore District and surrounding areas</li>
                <li>One-time fee: ₹2,001/-</li>
                <li>Covers individual or family (spouse, children, dependent parents)</li>
                <li>Annual subscription: ₹600/- (due by March 31st)</li>
                <li>Membership may be terminated after 3 consecutive years of non-payment</li>
              </ul>
            </div>
          </div>
          
          <div className="about_us_timeline">
            <h3 className="about_us_section_title">Annual Celebrations & Events</h3>
            <div className="timeline_container">
              <div className="timeline_item">
                <div className="timeline_content">
                  <h4>Onam Celebrations</h4>
                  <p>Featuring elaborate Pookalams (floral decorations), traditional dances like Thiruvathira, and the famous Onasadya (traditional feast).</p>
                </div>
              </div>
              
              <div className="timeline_item">
                <div className="timeline_content">
                  <h4>Vishu Celebrations</h4>
                  <p>Kerala's traditional new year celebration with Vishukkani and cultural programs.</p>
                </div>
              </div>
              
              <div className="timeline_item">
                <div className="timeline_content">
                  <h4>Christmas & New Year</h4>
                  <p>Festive gatherings with special programs and community participation.</p>
                </div>
              </div>
              
              <div className="timeline_item">
                <div className="timeline_content">
                  <h4>Community Engagements</h4>
                  <p>Book discussions, poetry sessions, and literary competitions to promote Malayalam literature.</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="about_us_subcontainer1_div1_text text2">
            The Samajam takes pride in maintaining a growing library that serves
            as a cultural treasure trove for our community. Our collection
            includes an extensive range of Malayalam and English books,
            magazines, and educational materials that help members stay
            connected with Kerala's rich literary heritage.
          </p>
        </div>
        
        <div className="about_us_subcontainer3">
          <img className="about_us_subcontainer3_img" src={img5} alt="IKS Community" />
          <div className="about_us_subcontainer3_textContainer">
            <h3 className="about_us_section_title">Knowledge Sharing & Cultural Bridge</h3>
            <div className="initiative_container">
              <div className="initiative_item">
                <h4><FaBookOpen /> Educational Initiatives</h4>
                <p>Regular workshops and interactive sessions featuring distinguished personalities from various fields, covering topics from Kerala's art forms to professional development.</p>
              </div>
              
              <div className="initiative_item">
                <h4><FaHandshake /> Intercultural Harmony</h4>
                <p>The Samajam not only caters to Malayalis but also promotes inter-cultural harmony by welcoming people from all backgrounds to experience Kerala's traditions.</p>
              </div>
              
              <div className="initiative_item">
                <h4><FaForward /> Future Vision</h4>
                <p>With a commitment to social service, cultural preservation, and community development, we envision expanding our initiatives and increasing youth participation.</p>
              </div>
            </div>
            
            <p className="about_us_subcontainer1_div1_text text2">
              Looking to the future, The Indore Keraleeya Samajam continues to
              evolve while staying true to its core mission of preserving and
              promoting Kerala's cultural heritage. We actively seek ways to
              engage our youth in community activities, ensuring that our
              traditions continue to thrive in the coming generations.
            </p>
          </div>
        </div>
        
        <div className="about_us_subcontainer4">
          <NavLink to="/membership" style={{ textDecoration: "none" }} className="about_us_button">
            Join us on this wonderful journey
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default About;