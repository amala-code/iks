import { useState, useEffect, useRef } from 'react';

const FirstTimeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (hasCalledAPI.current) return;
    
    const timer = setTimeout(() => {
      hasCalledAPI.current = true;
      fetchModalData();
    }, 2000); // Changed to 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  const fetchModalData = async () => {
    try {
      const response = await fetch('https://new-admin-backend.vercel.app/all_events');
      const data = await response.json();
      
      const popupEvent = data.events?.find(event => 
        event.popup === "true" || event.popup === true
      );
      
      if (popupEvent) {
        if (popupEvent.popup_end_date) {
          let endDateStr = popupEvent.popup_end_date;
          
          if (endDateStr.startsWith('0')) {
            endDateStr = '2' + endDateStr;
          }
          
          const dateParts = endDateStr.split('-');
          if (dateParts.length === 3) {
            const year = dateParts[0];
            const month = dateParts[1].padStart(2, '0');
            const day = dateParts[2].padStart(2, '0');
            endDateStr = `${year}-${month}-${day}`;
          }
          
          const endDate = new Date(endDateStr);
          const today = new Date();
          endDate.setHours(23, 59, 59, 999);
          
          if (today <= endDate) {
            setModalData(popupEvent);
            setIsOpen(true);
          }
        } else {
          setModalData(popupEvent);
          setIsOpen(true);
        }
      }
    } catch (error) {
      console.error('Error fetching modal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = () => {
    window.location.href = '/events'; // Redirects to /events
    handleClose();
  };

  if (loading || !isOpen || !modalData) {
    return null;
  }

  // Construct proper image URL
  const imageUrl = modalData.image 
    ? `https://new-admin-backend.vercel.app/static/images/${modalData.image}`
    : 'https://via.placeholder.com/1200x800/667eea/ffffff?text=Event';

  return (
    <>
      {/* Backdrop with animation */}
      <div 
        className="modal-backdrop"
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-in-out'
        }}
      />

      {/* Modal Container */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}
      >
        <div 
          className="modal-container"
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            maxWidth: '1000px',
            width: '100%',
            maxHeight: '95vh',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
            animation: 'slideUp 0.4s ease-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="close-button"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            aria-label="Close modal"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable Content */}
          <div className="modal-content" style={{ maxHeight: '95vh', overflowY: 'auto' }}>
            {/* Hero Image Section - Takes up majority of space */}
            <div 
              className="hero-image-container"
              style={{
                position: 'relative',
                width: '100%',
                height: '65vh',
                minHeight: '400px',
                maxHeight: '700px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <img
                src={imageUrl}
                alt={modalData.title || 'Event'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  console.error('Image failed to load:', imageUrl);
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Bottom Gradient Overlay for text readability */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Event Title Overlay on Image */}
              <div 
                className="title-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px',
                  color: 'white'
                }}
              >
                {/* Category Badge */}
                {modalData.category && (
                  <div style={{ marginBottom: '12px' }}>
                    <span 
                      style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {modalData.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 
                  style={{
                    fontSize: 'clamp(24px, 5vw, 42px)',
                    fontWeight: '900',
                    lineHeight: '1.2',
                    margin: 0,
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  {modalData.title || 'Special Event'}
                </h2>
              </div>
            </div>

            {/* Content Section - Compact */}
            <div className="content-section" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
              {/* Description */}
              <p 
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  lineHeight: '1.7',
                  color: '#4B5563',
                  marginBottom: '24px',
                  whiteSpace: 'pre-line'
                }}
              >
                {modalData.description}
              </p>

              {/* Event Details - Inline and Compact */}
              {(modalData.date_time || modalData.location) && (
                <div 
                  className="event-details"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '24px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '12px'
                  }}
                >
                  {modalData.date_time && (
                    <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 200px' }}>
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#4F46E5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px',
                          flexShrink: 0
                        }}
                      >
                        <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Date & Time
                        </div>
                        <div style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: '#1F2937', fontWeight: '700' }}>
                          {modalData.date_time}
                        </div>
                      </div>
                    </div>
                  )}

                  {modalData.location && (
                    <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 200px' }}>
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px',
                          flexShrink: 0
                        }}
                      >
                        <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Location
                        </div>
                        <div style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: '#1F2937', fontWeight: '700', lineHeight: '1.4', wordBreak: 'break-word' }}>
                          {modalData.location}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons" style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <button
                  onClick={handleRedirect}
                  className="primary-button"
                  style={{
                    width: '100%',
                    padding: 'clamp(14px, 2vw, 18px)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(14px, 2vw, 17px)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    letterSpacing: '0.3px'
                  }}
                >
                  View All Events →
                </button>

                <button
                  onClick={handleClose}
                  className="secondary-button"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    color: '#6B7280',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-button:hover {
          background-color: rgba(0, 0, 0, 0.9) !important;
          transform: scale(1.1) rotate(90deg);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6) !important;
        }

        .secondary-button:hover {
          color: #1F2937 !important;
          background-color: #F3F4F6 !important;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #A0AEC0;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .modal-container {
            border-radius: 16px !important;
            max-height: 98vh !important;
          }

          .hero-image-container {
            height: 50vh !important;
            min-height: 300px !important;
          }

          .title-overlay {
            padding: 20px !important;
          }

          .content-section {
            padding: 20px !important;
          }

          .event-details {
            flex-direction: column !important;
            gap: 12px !important;
          }

          .close-button {
            width: 36px !important;
            height: 36px !important;
            top: 12px !important;
            right: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-image-container {
            height: 45vh !important;
            min-height: 280px !important;
          }
        }
      `}</style>
    </>
  );
};

export default FirstTimeModal;