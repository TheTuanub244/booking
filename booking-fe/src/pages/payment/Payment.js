import React from "react";
import "./payment.css";
import Navbar from "../../componets/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
function Payment() {
  return (
    <div>
      <Navbar />
      <div className="payment">
        <div className="paymentContainer">
          <div className="leftContent">
            <div className="bookingInformation">
              <h3>Qcub1 Homestay</h3>
              <div className="address">
                57/13 Bùi Viện, District 1, Ho Chi Minh City, Vietnam
              </div>
              <span>Excellent location — 9.0</span>
              <div className="infoEvaluation">
                <div className="infoScore">
                  <div>5.0</div>
                </div>

                <div className="infoRating">
                  <div className="infoComment">Excellent</div>
                  <div className="infoReview">141 reviews</div>
                </div>
              </div>

              <div className="infoExtra">
                <div className="wifi">
                  <FontAwesomeIcon icon={faWifi} className="iconWifi" />
                  <span>Free WiFi</span>
                </div>

                <div className="airport">
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    className="iconPlane"
                  />
                  <span>Airport shuttle</span>
                </div>
              </div>
            </div>

            <div className="bookingDetails">
              <h3>Your booking details</h3>
              <div className="timeBooking">
                <div className="checkIn">
                  <div className="checkInTitle">Check-in</div>
                  <div className="checkInTime">Wed 20 Nov 2024</div>
                  <div className="checkInFrom">From 14:00</div>
                </div>

                <div className="checkOut">
                  <div className="checkOutTitle">Check-out</div>
                  <div className="checkOutTime">Fri 22 Nov 2024</div>
                  <div className="checkOutUntil">Until 11:00</div>
                </div>
              </div>
              <div className="lengthStay">
                <div className="lengthStayTitle">Total length of stay:</div>
                <div className="totalNight">2 nights</div>
              </div>

              <div className="selected">
                <div className="selectedTitle">You selected</div>

                <div className="mySelected">2 rooms for 2 adults</div>
                <button className="changeSelection">
                  Change your selection{" "}
                </button>
              </div>
            </div>

            <div className="priceSummary">
              <h3>Your price summary</h3>
              <div className="totalPrice">
                <div className="textLeft">Total</div>
                <div className="textRight">VND 1,360,800</div>
              </div>
            </div>
          </div>
          <div className="rightContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
