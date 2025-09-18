import React, { useRef, useEffect, useState } from "react";
import './CulturalPlatform.css';
import "./Home.css";
import img1 from "../../Images/Img/abtmini.JPG";

// import img2 from "../../Images/President'sImage.png";
import img2 from "../../Images/prs.jpg";
import { MdAnnouncement } from "react-icons/md";
import announcements from "../../Data/announcement.json";
import { RiDoubleQuotesL } from "react-icons/ri";
import data from "../../Data/homeEvent.json";
import { MdGroups } from "react-icons/md";
import data2 from "../../Data/testemonial.json";
import HGG1 from "../../Images/HGG1.JPG";
import HGG2 from "../../Images/HGG2.JPG";
import HGG3 from "../../Images/HGG3.JPG";
import HGG4 from "../../Images/HGG4.JPG";
import HGG5 from "../../Images/HGG5.JPG";
import HGG6 from "../../Images/HGG6.JPG";
import HGG7 from "../../Images/HGG7.JPG";
import HGG8 from "../../Images/HGG8.JPG";
import Home1 from '../../Images/Home1.png';
import Home2 from '../../Images/Home2.png';
import Home3 from '../../Images/Home3.png';
import Home4 from '../../Images/Home4.png';
import Home5 from '../../Images/Home5.png';
import Home6 from '../../Images/Home6.png';
import { NavLink } from "react-router-dom";
import axios from "axios";
import MembershipFlipCard from "../Member/member";

const CulturalPlatform = () => {
    const [announcementList, setAnnouncementList] = useState([]);
    const announcementsRef = useRef(null);
  
    const topImageSets = [
      [Home1, Home2, Home3],
      [HGG1, HGG2, HGG3],
      [HGG7, HGG8, HGG4]
    ];
    
    const bottomImageSets = [
      [Home4, Home5, Home6],
      [HGG4, HGG5, HGG6],
      [HGG2, HGG3, HGG1]
    ];
    
    // State to track current image set
    const [currentTopSetIndex, setCurrentTopSetIndex] = useState(0);
    const [currentBottomSetIndex, setCurrentBottomSetIndex] = useState(0);
    const [animationState, setAnimationState] = useState('visible');
    
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('https://iks-admin-backend.onrender.com/all_events');
          const events = response.data.events || [];
  
          setAnnouncementList(response.data.events);
          console.log(response.data.events);
        } catch (error) {
          console.error('Failed to fetch events:', error);
        }
      };
  
      fetchEvents();
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        // Start fade out
        setAnimationState('fade-out');
        
        // After animation completes, change images and fade in
        setTimeout(() => {
          setCurrentTopSetIndex((prevIndex) => 
            (prevIndex + 1) % topImageSets.length
          );
          setCurrentBottomSetIndex((prevIndex) => 
            (prevIndex + 1) % bottomImageSets.length
          );
          setAnimationState('fade-in');
        }, 500); // Half second for fade out
        
      }, 3000); // Change every 5 seconds
      
      return () => clearInterval(interval); // Cleanup
    }, []);
  
  return (
    <div className="cultural-platform">
      {/* Hero Section with Background Image and Overlay Carousel */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Cultural Platform<br />
            and Keralites
          </h1>
     
          
          <button className="join-btn">Join Now</button>
        </div>

        {/* Cards Carousel Overlay */}
        <div className="cards-overlay">
          <div className="cards-container">
            <div className="card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=faces" alt="Kathakali dancers" />
              </div>
              <h3 className="card-title">Kathakali</h3>
              <p className="card-description">
                Folktales & Awareness of
                other culture Diversity
                Conversations
              </p>
            </div>

            <div className="card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center" alt="Kerala backwaters" />
              </div>
              <h3 className="card-title">Community</h3>
              <p className="card-description">
                Boating Wala Platelets of
                Food Festivals Motif
                Workshop
              </p>
            </div>

            <div className="card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop&crop=center" alt="Kerala food" />
              </div>
              <h3 className="card-title">Food Festivals</h3>
              <p className="card-description">
                Culture Foredeal Rooms
                Festivities Festal and
                Workshops
              </p>
            </div>

            <div className="card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop&crop=center" alt="Traditional ceremony" />
              </div>
              <h3 className="card-title">Workshops</h3>
              <p className="card-description">
                Feral Communion Free
                content Patios A Mans
                Workshop
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="Home_AboutUs_container">
          <div className="Home_AboutUs_flexContainer">
            <div className="Home_AboutUs_flex1">
              <img
                src={img1}
                alt="About Us"
                className="AboutUs_mainImage_HomeAboutImage"
              />
            </div>
            <div className="Home_AboutUs_flex2">
              <div className="Home_AboutUs_flex1_headtext">About Us</div>
              <div className="Home_AboutUs_flex1_subtext">
              A Hub for Malayali Culture and Community
              </div>
              <div className="Home_AboutUs_flex1_text">
                
              The Indore Keraleeya Samajam is a socio-cultural organization established in the year 1967 dedicated to preserving and promoting Kerala's rich heritage among the Malayali community in Indore, Madhya Pradesh. Established to foster unity, cultural exchange, and social welfare, the Samajam serves as a platform for celebrating traditional festivals, organizing community events, and supporting charitable activities. It plays a vital role in connecting Malayalis in Indore while also encouraging inter-cultural harmony. Through various educational, cultural, and social initiatives, The Indore Keraleeya Samajam continues to strengthen its commitment to community service and the enrichment of Kerala’s traditions outside its borders.
              </div>
              <NavLink
                to="/about"
                className="about_us_button Home_aboutUs_button"
                style={{ textDecoration: "none" }}
              >
                Learn More About Us
              </NavLink>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="Home_UpdatesContainer">
          <div className="Home_updates_headTExtContainer">
            <h2 className="Home_Event_HeadText Home_updates_mainHead">
              Latest Updates
            </h2>
          </div>
          <div className="Home_Update_flexContainer">
            <div className="Home_update_flex1">
              <div className="Home_update_textContainer">
                <MdAnnouncement />
                <div className="Home_upate_headText">Announcements</div>
              </div>
              <div className="Home_update_container">
                <div
                  className="Home_update_announcements"
                  ref={announcementsRef}
                >
                  {announcementList.map((announcement, index) => (
                    <div className="Home_update_announcement" key={index}>
                      <div className="Home_update_announcement_date">
                        {announcement.date_time}
                      </div>
                      <div className="Home_update_announcement_Head">
                        {announcement.title}
                      </div>
                      <div className="Home_update_announcement_text">
                      {announcement.description.split(' ').slice(0, 20).join(' ')}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="Home_update_flex1">
              <div className="Home_update_textContainer">
                <RiDoubleQuotesL />
                <div className="Home_upate_headText">President's Message</div>
              </div>
    
              <div className="Home_President_container">
  <img src={img2} alt="President" className="Home_president_image" />
  <div className="Home_president_message">
    <p>
      "It’s an honor to lead The Indore Keraleeya Samajam. Over decades, we’ve grown as a united, culturally rich Malayali community, rooted in service, education, and compassion. Our school and collective spirit reflect our commitment to a brighter, inclusive future together."
    </p>
    <div className="Home_president_name">
      <h3>Joseph Thomas</h3>
      <h4>President, IKS</h4>
    </div>
  </div>
</div>

        
            </div>
          </div>
        </div>

        {/* Event Highlights Section */}
        <div className="Home_Event_mainContainer">
          <h2 className="Home_Event_HeadText">Event Highlights</h2>
          <div className="Home_Event_GridContainer">
            {data.map((item) => (
              <div
                key={item.id}
                className="art_cardContainer"
                style={{ backgroundColor: "#fff", borderRadius: "8px" }}
              >
                <img
                  src={`../../Images/${item.image}`}
                  alt={item.heading}
                  className="art_cardImage"
                />
    
              </div>
            ))}
          </div>
          <NavLink style={{ textDecoration: "none" }} to="/events" className="Home_Event_button">
  View All Events
</NavLink>
        </div>

        {/* Member Section */}
        <MembershipFlipCard />

        

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2 className="testimonials-title">What Our Members Say</h2>
          <div className="testimonials-container">
            {data2.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <img
                  src={`/Images/${testimonial.image}`}
                  alt={testimonial.name}
                  className="testimonial-img"
                />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-year">{testimonial.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery Section */}
        <div className="Home_photoGallery_mainContainer">
          <h2 className="testimonials-title">Photo Gallery</h2>
          <div className="Home_photoGallery_gridContianer">
            <img src={HGG1} alt="" className="Home_photogalleryImage" />
            <img src={HGG2} alt="" className="Home_photogalleryImage" />
            <img src={HGG3} alt="" className="Home_photogalleryImage" />
            <img src={HGG4} alt="" className="Home_photogalleryImage" />
            <img src={HGG5} alt="" className="Home_photogalleryImage" />
            <img src={HGG6} alt="" className="Home_photogalleryImage" />
            <img src={HGG7} alt="" className="Home_photogalleryImage" />
            <img src={HGG8} alt="" className="Home_photogalleryImage" />
          </div>
          <NavLink
  to="/gallery"
  style={{ marginTop: "60px",textDecoration:"none" }}
  className="Home_Event_button home_gallery_button"
>
  View Full Gallery
</NavLink>
        </div>
      </div>
    
    
  );
};

export default CulturalPlatform;