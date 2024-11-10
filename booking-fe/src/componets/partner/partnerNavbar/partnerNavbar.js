import React from "react";
import "./partnerNavbar.css";
import { useNavigate } from "react-router-dom";

function PartnerNavbar() {
  const isSignIn = localStorage.getItem("isSignIn");
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="/">
          <span className="logo">Booking.com</span>
        </a>

        <div className="navItems">
          <span>Already a partner ? </span>
          <button className="navButton" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerNavbar;
