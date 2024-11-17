import React, { useState, useEffect } from "react";
import "./partnerDashboard.css";
import PartnerNavbar from "../../../componets/partner/partnerNavbar/partnerNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const words = ["Hotel", "Apartment", "Homestay", "Hostel"];

const PartnerDashboard = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000); // Change word every 5 seconds

    return () => clearInterval(intervalId);
  }, []);
  const items = [
    {
      title: "Damage payments",
      description:
        "Our damage programme covers your property in case of damages.",
    },
    {
      title: "Your own house rules",
      description:
        "Communicate your house rules to potential guests who must agree to them in order to book.",
    },
    {
      title: "Choose how you prefer to receive bookings",
      description:
        "Either by letting guests book instantly, or by reviewing booking requests before accepting them.",
    },
    {
      title: "Protection from liability claims",
      description:
        "Receive protection against liability claims from guests and neighbours of up to €/£/$1,000,000 for each reservation.",
    },
    {
      title: "Get paid consistently and securely",
      description:
        "Get guaranteed payouts and fraud protection through Payments by Booking.com.",
    },
    {
      title: "Verified guests",
      description:
        "We verify guests email addresses and credit cards for partners on Payments by Booking.com.",
    },
    {
      title: "Robust support",
      description:
        "Access support in 45 languages and manage your property through Pulse, our app for partners like you.",
    },
  ];

  return (
    <div className="container">
      <PartnerNavbar />
      <div className="dashboard-container">
        <div className="dashboard-text">
          <h1 className="big-text">List your</h1>
          <h1 className="big-text transition-text">
            {words[currentWordIndex]}
          </h1>
          <h1 className="big-text">on Booking</h1>
          <h2
            style={{
              color: "white",
            }}
          >
            List your property today and quickly start earning more income
          </h2>
        </div>
        <div className="register-block">
          <h2>Register for free</h2>
          <div className="list-option">
            <span className="list-item">
              {" "}
              <FontAwesomeIcon icon={faCheck} className="icon" /> Mange your
              properties
            </span>
            <span className="list-item">
              {" "}
              <FontAwesomeIcon icon={faCheck} className="icon" /> We handle your
              payment
            </span>
          </div>
          <button onClick={() => navigate("/partner/partnerRegister")}>
            Get started now
          </button>
        </div>
      </div>
      <div className="register-body">
        <h1
          className="big-text"
          style={{
            color: "black",
            padding: "30px calc(23% + 5px)",
          }}
        >
          List with peace of mind
        </h1>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "0 calc(23% + 5px)",
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 calc(50% - 20px)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "20px", color: "green" }}>✔</span>
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      margin: "0 0 5px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
