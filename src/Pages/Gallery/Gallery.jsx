import React, { useState } from 'react'
import './Gallery.css'
import galleryData from "../../Data/galleryData.json";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc, eventTitle) => {
    setSelectedImage({ src: imageSrc, title: eventTitle });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="Gallery_mainContainer">
        <div className="Gallery_headContainer">
          <div className="Gallery_overlay"></div>
          <div className="Gallery_headContainer_text">
            <h1 className="Gallery_heading">Photo Gallery</h1>
            <p className="Gallery_subhead">Capturing Moments of Celebration</p>
            <div className="Gallery_divider"></div>
          </div>
        </div>
        
        <div className="Gallery_content">
          {galleryData.map((event) => (
            <div key={event.id} className="Gallery_section">
              <div className="Gallery_section_header">
                <h2 className="Gallery_section_title">{event.title}</h2>
                <div className="Gallery_section_line"></div>
              </div>
              <div className="Gallery_photos_grid">
                {event.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="Gallery_photo_wrapper"
                    onClick={() => openModal(`${process.env.PUBLIC_URL}/Images/${image}`, event.title)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/Images/${image}`} 
                      alt={`${event.title} - ${index + 1}`}
                      className="Gallery_photo"
                    />
                    <div className="Gallery_photo_overlay">
                      <span className="Gallery_photo_icon">🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="Gallery_modal" onClick={closeModal}>
            <div className="Gallery_modal_content" onClick={(e) => e.stopPropagation()}>
              <button className="Gallery_modal_close" onClick={closeModal}>×</button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="Gallery_modal_image"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Gallery