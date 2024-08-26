import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <div className="main-sidebar">
      <aside id="sidebar-wrapper">
        <div
          className="sidebar-brand"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
            marginTop: "20px",
            height: "100%",
          }}
        >
          <Link
            to="/dashboard"
            onClick={() => handleClick("/dashboard")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="../assets/img/avatar/avatar-1.png"
              alt="Stisla"
              style={{
                height: "80px",
                width: "auto",
                borderRadius: "50%",
                marginBottom: "2px",
              }}
            />
            <span style={{ color: "black", fontSize: "16px" }}>Stisla</span>
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li
            className={`nav-item ${
              activeMenu === "/dashboard" ? "active" : ""
            }`}
          >
            <Link to="/dashboard" onClick={() => handleClick("/dashboard")}>
              <i className="fas fa-fire"></i>
              <span>General Dashboard</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/userlist" ? "active" : ""}`}
          >
            <Link to="/userlist" onClick={() => handleClick("/userlist")}>
              <i className="fas fa-users"></i>
              <span>User List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/provider" ? "active" : ""}`}
          >
            <Link to="/provider" onClick={() => handleClick("/provider")}>
              <i className="fas fa-user-md"></i>
              <span>Provider List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/worker" ? "active" : ""}`}
          >
            <Link to="/worker" onClick={() => handleClick("/worker")}>
              <i className="fas fa-user-tie"></i> 
              <span>Worker List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/categeorylist" ? "active" : ""}`}
          >
            <Link to="/categeorylist" onClick={() => handleClick("/categeorylist")}>
              <i className="fas fa-list-alt"></i> 
              <span>Category List</span> 
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/services" ? "active" : ""}`}
          >
            <Link to="/services" onClick={() => handleClick("/services")}>
              <i className="fas fa-cogs"></i> 
              <span>Service List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/booking" ? "active" : ""}`}
          >
            <Link to="/booking" onClick={() => handleClick("/booking")}>
              <i className="fas fa-calendar-check"></i> 
              <span>Booking List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/carlist" ? "active" : ""}`}
          >
            <Link to="/carlist" onClick={() => handleClick("/carlist")}>
              <i className="fas fa-car"></i> 
              <span>Car List</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/privacy" ? "active" : ""}`}
          >
            <Link to="/privacy" onClick={() => handleClick("/privacy")}>
              <i className="fas fa-lock"></i>
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeMenu === "/aboutus" ? "active" : ""}`}
          >
            <Link to="/aboutus" onClick={() => handleClick("/aboutus")}>
              <i className="fas fa-info-circle"></i>
              <span>About Us</span>
            </Link>
          </li>
          <li className={`nav-item ${activeMenu === "/terms" ? "active" : ""}`}>
            <Link to="/terms" onClick={() => handleClick("/terms")}>
              <i className="fas fa-file-contract"></i>
              <span>Terms and Conditions</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
