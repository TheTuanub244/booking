import React, { useEffect } from "react";
import "./partnerNavbar.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import socketService from "../../../helpers/sockerService";

function PartnerNavbar() {
  const isSignIn = localStorage.getItem("isSignIn");
  const navigate = useNavigate();
  useEffect(() => {
    // Lắng nghe thông báo từ server
    socketService.on("notifyPartner", (notification) => {
      console.log(notification);
    });
  }, []);
  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="/">
          <span className="logo">Booking.com</span>
        </a>

        <div className="navItems">
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </div>
  );
}

export default PartnerNavbar;
