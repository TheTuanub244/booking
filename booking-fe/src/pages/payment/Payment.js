import React, { useState, useEffect } from "react";
import "./payment.css";
import Navbar from "../../componets/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPlaneDeparture,
  faUser,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
function Payment() {
  const [errorPayment, setErrorPayment] = useState(
    "Please fill in your last name",
  );

  const [country, setCountry] = useState([
    { name: "Vietnam" },
    { name: "Turkey" },
    { name: "United States" },
    { name: "Canada" },
    { name: "Australia" },
    { name: "Germany" },
    { name: "France" },
    { name: "Japan" },
    { name: "South Korea" },
    { name: "India" },
  ]);
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
          <div className="rightContent">
            <div className="signIninfor">
              <div className="img">
                <FontAwesomeIcon icon={faUser} className="iconUser" />
              </div>

              <div className="information">
                <div className="text">You are signed in</div>
                <div className="email">tuanleminh2k3@gmail.com</div>
              </div>
            </div>

            <div className="yourDetails">
              <h3>Enter your details</h3>
              <div className="alert">
                <FontAwesomeIcon icon={faInfo} className="iconInfo" />
                <div className="yourAlert">
                  Almost done! Just fill in the{" "}
                  <span className="required">*</span> required info
                </div>
              </div>
              <div className="formInput">
                <form
                  method="post"
                  action=""
                  id="payment_form"
                  accept-charset="UTF-8"
                >
                  <label>
                    First name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="firstname"
                    required
                  />
                  <label>
                    Last name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-comment form-control-lg"
                    name="lastname"
                    required
                  />
                  <label>
                    Email address<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                    class="form-control form-control-lg"
                    name="email"
                    required
                  />
                  <label>
                    Phone number<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    pattern="\d+"
                    id="Phone"
                    className="form-control form-control-comment form-control-lg"
                    name="phone"
                    required
                  />

                  <label>
                    Country/Region<span className="required">*</span>
                  </label>
                  <select className="country" name="country">
                    {country.map((index) => (
                      <option value={index.name} data-code={index.code}>
                        {index.name}
                      </option>
                    ))}
                  </select>

                  {errorPayment && (
                    <p className="errorMessage">{errorPayment}</p>
                  )}

                  <div className="btnDiv">
                    <button className="btnSub">Next: Final details</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
