import React from "react";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerLogin.css";

function HeaderLogin() {
  return (
    <div className="headerLogin">
      <div className="headerLoginContainer">
        <div className="logo">Booking.com</div>
        <div className="top-bar">
          <div className="language">
            <img
              src="https://q-xx.bstatic.com/backend_static/common/flags/new/48-squared/vn.png"
              alt="language"
            />
          </div>
          <div className="support">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLogin;
