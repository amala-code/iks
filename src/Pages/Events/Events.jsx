// import React, { useEffect, useState,useRef } from "react";
// import "./Events.css";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaArrowRight } from "react-icons/fa6";
// import { GrAnnounce } from "react-icons/gr";

// import eventsData2 from "../../Data/eventsData2.json";
// import eventsData from "../../Data/eventsData.json";
// import announcementData from "../../Data/announcement.json";
// import axios from "axios";

// const Events = () => {
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     setEvent(eventsData[0]);
//   }, []);

//   const [announcementList, setAnnouncementList] = useState([]);
//   const announcementsRef = useRef(null);



//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('https://iks-admin-backend.onrender.com/all_events');
//         const events = response.data.events || [];

//         setAnnouncementList(response.data.events);

//         console.log(response.data.events);
//       } catch (error) {
//         console.error('Failed to fetch events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (!event) return null;

//   return (
//     <>
//       <div className="Event_mainContainer">
//         <div className="Event_subContainer">
//           <div className="Event_headContnainer_text">
//             <p className="Event_featured">Featured Event</p>
//             <div className="Event_liveEvent">
//               <h1 className="Event_liveEvent_head">{event.title}</h1>
//               <p className="Event_liveEvent_text">{event.description}</p>
//               <div className="Event_liveEvent_date">
//                 <p>
//                   <FaCalendarAlt className="Event_banner_icon" /> {event.date}
//                 </p>
//                 <p>
//                   <FaLocationDot className="Event_banner_icon" /> {event.venue}
//                 </p>
//               </div>
//             </div>
//             <a href={event.registerLink} className="Event_banner_button">
//               <p style={{ marginRight: "10px" }}>Register Now</p>{" "}
//               <FaArrowRight />
//             </a>
//           </div>
//         </div>
//         <div className="Event_subContainer2">
//           <div className="Event_subContainer2_div1">
//             <h4 className="Event_subcontainer_div1_headtext">
//               Upcoming Events
//             </h4>
//             <div className="Event_subContainer2_div1_cardContainer">
//             {announcementList.map((event) => (
//   <div key={event.id} className="Event_subContainer2_div1_card">
//     {event.image && (
//       <img
//         src={`https://iks-admin-backend.onrender.com/static/images/${event.image}`}
//         alt={event.title}
//         className="Event_subContainer1_img"
//       />
//     )}
//     <h6 className="Event_subContainer2_div1_card_text2">
//       {event.title}
//     </h6>
//     <div className="Event_subContainer2_div1_card_text3">
//       <FaCalendarAlt /> {event.date_time}
//     </div>
//     <div className="Event_subContainer2_div1_card_text4">
//       <FaLocationDot /> {event.location}
//     </div>
//     <p className="Event_text">
//       {/* Add more content if needed */}
//     </p>
//   </div>
// ))}
//             </div>

            
//           </div>


//           <div className="Event_subContainer2_div2">
//             <div className="Event_subContainer2_div2_headText_Container">
//               <GrAnnounce className="Event_subContainer2_div2_headText_logo" />
//               <p className="Event_subContainer2_div2_headText">Announcements</p>
//             </div>
//             <div className="Event_subContainer2_div2_Announcment_Container">
//               {announcementData.map((announcement) => (
//                 <div key={announcement.id}>
//                   <div className="Event_subContainer2_div2_Announcment_Container_text1">
//                     {announcement.date}
//                   </div>
//                   <div className="Event_subContainer2_div2_Announcment_Container_text2">
//                     {announcement.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Events;
import React, { useEffect, useState, useRef } from "react";
import "./Events.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";

import announcementData from "../../Data/announcement.json";
import axios from "axios";

const Events = () => {
  const [event, setEvent] = useState(null);
  const [announcementList, setAnnouncementList] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("../../Images/Eventback.jpg");
  const announcementsRef = useRef(null);

  // Fetch dynamic events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://iks-admin-backend.onrender.com/all_events');
        const events = response.data.events || [];
        
        setAnnouncementList(events);
        setAllEvents(events);
        
        // Set the first event as featured if events exist
        if (events.length > 0) {
          setEvent(events[0]);
          // Set background image from first event
          if (events[0].background_image || events[0].image) {
            setBackgroundImage(`https://iks-admin-backend.onrender.com/static/images/${events[0].background_image || events[0].image}`);
          }
        }
        
        console.log('Fetched events:', events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setAnnouncementList([]);
        setAllEvents([]);
      }
    };

    fetchEvents();
  }, []);

  // Auto-rotate featured event
  useEffect(() => {
    if (!isAutoRotating || allEvents.length === 0) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allEvents.length;
        const nextEvent = allEvents[nextIndex];
        setEvent(nextEvent);
        
        // Update background image when event changes
        if (nextEvent && (nextEvent.background_image || nextEvent.image)) {
          setBackgroundImage(`https://iks-admin-backend.onrender.com/static/images/${nextEvent.background_image || nextEvent.image}`);
        }
        
        return nextIndex;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [allEvents, isAutoRotating]);

  // Handle event card click
  const handleEventClick = (selectedEvent, index) => {
    setEvent(selectedEvent);
    setCurrentEventIndex(index);
    setIsAutoRotating(false); // Stop auto-rotation when manually selected
    
    // Update background image
    if (selectedEvent && (selectedEvent.background_image || selectedEvent.image)) {
      setBackgroundImage(`https://iks-admin-backend.onrender.com/static/images/${selectedEvent.background_image || selectedEvent.image}`);
    }
    
    // Resume auto-rotation after 10 seconds
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 10000);
  };

  // Show loading or empty state if no events
  if (allEvents.length === 0) {
    return (
      <div className="Event_mainContainer">
        <div className="Event_loading">
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <>
      <div className="Event_mainContainer">
        {/* <div 
          className="Event_subContainer"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll'
          }}
        >
          <div className="Event_headContainer_text">
            <p className="Event_featured">Featured Event</p>
            <div className="Event_liveEvent">
              <h1 className="Event_liveEvent_head">{event.title}</h1>
              <p className="Event_liveEvent_text">{event.description}</p>
              <div className="Event_liveEvent_date">
                <p>
                  <FaCalendarAlt className="Event_banner_icon" /> 
                  {event.date_time || event.date}
                </p>
                <p>
                  <FaLocationDot className="Event_banner_icon" /> 
                  {event.location || event.venue}
                </p>
              </div>
            </div>
            {(event.registration_link || event.registerLink) && (
              <a 
                href={event.registration_link || event.registerLink} 
                className="Event_banner_button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p style={{ marginRight: "10px" }}>Register Now</p>
                <FaArrowRight />
              </a>
            )}
          </div>
        </div> */}

<div 
  className="Event_subContainer"
  style={{
    backgroundImage: window.innerWidth > 768 
      ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})` 
      : "none",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll'
  }}
>
  {/* Mobile-only image */}
  <img 
    src={backgroundImage} 
    alt="Event Banner" 
    className="Event_mobileBanner" 
  />

  <div className="Event_headContainer_text">
    <p className="Event_featured">Featured Event</p>
    <div className="Event_liveEvent">
      <h1 className="Event_liveEvent_head">{event.title}</h1>
      <p className="Event_liveEvent_text">{event.description}</p>
      <div className="Event_liveEvent_date">
        <p>
          <FaCalendarAlt className="Event_banner_icon" /> 
          {event.date_time || event.date}
        </p>
        <p>
          <FaLocationDot className="Event_banner_icon" /> 
          {event.location || event.venue}
        </p>
      </div>
    </div>
    {(event.registration_link || event.registerLink) && (
      <a 
        href={event.registration_link || event.registerLink} 
        className="Event_banner_button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p style={{ marginRight: "10px" }}>Register Now</p>
        <FaArrowRight />
      </a>
    )}
  </div>
</div>


        <div className="Event_subContainer2">
          <div className="Event_subContainer2_div1">
            <h4 className="Event_subcontainer_div1_headtext">
              Upcoming Events
            </h4>
            {allEvents.length > 0 ? (
              <div className="Event_subContainer2_div1_cardContainer">
                {allEvents.map((eventItem, index) => (
                  <div 
                    key={eventItem.id || index} 
                    className={`Event_subContainer2_div1_card ${
                      event.id === eventItem.id ? 'active' : ''
                    }`}
                    onClick={() => handleEventClick(eventItem, index)}
                  >
                    {eventItem.image ? (
                      <img
                        src={`https://iks-admin-backend.onrender.com/static/images/${eventItem.image}`}
                        alt={eventItem.title}
                        className="Event_subContainer1_img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="Event_subContainer1_img_placeholder"
                      style={{ display: eventItem.image ? 'none' : 'flex' }}
                    >
                      <span>No Image</span>
                    </div>
                    <div className="Event_card_content">
                      <h6 className="Event_subContainer2_div1_card_text2">
                        {eventItem.title}
                      </h6>
                      <div className="Event_subContainer2_div1_card_text3">
                        <FaCalendarAlt /> {eventItem.date_time || eventItem.date}
                      </div>
                      <div className="Event_subContainer2_div1_card_text4">
                        <FaLocationDot /> {eventItem.location || eventItem.venue}
                      </div>
                      {eventItem.description && (
                        <p className="Event_card_description">
                          {eventItem.description.length > 100 
                            ? `${eventItem.description.substring(0, 100)}...` 
                            : eventItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="Event_no_events">
                <p>No events available at the moment.</p>
              </div>
            )}
          </div>

          {/* <div className="Event_subContainer2_div2">
            <div className="Event_subContainer2_div2_headText_Container">
              <GrAnnounce className="Event_subContainer2_div2_headText_logo" />
              <p className="Event_subContainer2_div2_headText">Announcements</p>
            </div>
            <div className="Event_subContainer2_div2_Announcement_Container">
              {announcementData.map((announcement) => (
                <div key={announcement.id} className="Event_announcement_item">
                  <div className="Event_subContainer2_div2_Announcement_Container_text1">
                    {announcement.date}
                  </div>
                  <div className="Event_subContainer2_div2_Announcement_Container_text2">
                    {announcement.text}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Events;