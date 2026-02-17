import { useRef, useEffect } from "react";

export default function Notifications() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="notifications-page">
     
      <div className="notifications-header">
        <h2 ref={headingRef} tabIndex="-1">Avisos</h2>
      </div>

    
      <div className="notifications-grid">
      
        <div className="notification-card">
          <div className="notification-image"></div>

          <div className="notification-content">
            <div className="notification-line"></div>
            <div className="notification-line short"></div>
            <div className="notification-line tiny"></div>
          </div>
        </div>

        <div className="notification-card">
          <div className="notification-image"></div>

          <div className="notification-content">
            <div className="notification-line"></div>
            <div className="notification-line short"></div>
            <div className="notification-line tiny"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
