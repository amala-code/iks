import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./StarterPage.css";

// Import images (add more images for the carousel)
import logo from "../Images/IKS_logo.png";
import img1 from "../Images/AboutUs1.png";
import img2 from "../Images/AboutUs2.png";
import img3 from "../Images/AboutUs3.png";
import img4 from "../Images/AboutUs4.png";
import img5 from "../Images/AboutUs5.png";
import img6 from "../Images/AboutUs5.png";
import img7 from "../Images/AboutUs1.png"; // Add more images as needed
import img8 from "../Images/AboutUs2.png";
import img9 from "../Images/AboutUs3.png";
import img10 from "../Images/AboutUs4.png";

const StarterPage = ({ onComplete }) => {
  const carouselRef = useRef(null);
  const welcomeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animate the welcome section
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Animate the carousel
    const images = gsap.utils.toArray(".carousel-image");

    // Create a timeline for the carousel animation
    const tl = gsap.timeline({ repeat: -1 }); // Infinite loop
    images.forEach((img, index) => {
      tl.fromTo(
        img,
        { opacity: 0, scale: 0.5, rotation: -45, x: -200, y: -200 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.2,
        },
        "+=0.5"
      ).to(
        img,
        {
          opacity: 0,
          scale: 0.5,
          rotation: 45,
          x: 200,
          y: 200,
          duration: 1.5,
          ease: "power3.in",
        },
        "+=2"
      );
    });

    // Background color transition
    gsap.to(".starter-page", {
      duration: 5,
      backgroundColor: "#ffffff",
      ease: "power2.inOut",
    });

    // Hide the starter page after 6 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer);
      tl.kill(); // Clean up the timeline
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="starter-page">
      {/* Welcome Section */}
      <div className="welcome-section" ref={welcomeRef}>
        <h1>Welcome to Indian Kerala Society</h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Carousel Background */}
      <div className="carousel" ref={carouselRef}>
        {[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].map(
          (img, index) => (
            <img
              key={index}
              src={img}
              alt={`Carousel Image ${index + 1}`}
              className="carousel-image"
              style={{
                position: "absolute",
                top: `${Math.sin((index / 10) * Math.PI * 2) * 100 + 50}%`,
                left: `${Math.cos((index / 10) * Math.PI * 2) * 100 + 50}%`,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default StarterPage;