import React, { useState, useEffect } from "react";
import "./payment.css";
import Navbar from "../../componets/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    amount: 0,
    bankCode: "",
    language: "vn",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    localStorage.setItem("email", formData.email);
    console.log(formData);
    axios
      .post("http://localhost:8000/payment/create_payment", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

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
                  onSubmit={handleSubmit}
                  id="payment_form"
                  accept-charset="UTF-8"
                  action="http://localhost:8000/payment/create_payment"
                  method="post"
                >
                  <label>
                    First name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="firstname"
                    onChange={handleChange}
                    required
                  />
                  <label>
                    Last name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-comment form-control-lg"
                    name="lastname"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />

                  <label>
                    Country/Region<span className="required">*</span>
                  </label>
                  <select
                    className="country"
                    name="country"
                    onChange={handleChange}
                  >
                    {country.map((index) => (
                      <option value={index.name} data-code={index.code}>
                        {index.name}
                      </option>
                    ))}
                  </select>

                  <label for="amount">Số tiền</label>
                  <input
                    class="form-control"
                    data-val="true"
                    data-val-number="The field Amount must be a number."
                    data-val-required="The Amount field is required."
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={handleChange}
                  />

                  <label for="bankcode">Ngân hàng</label>
                  <select
                    name="bankCode"
                    id="bankcode"
                    class="form-control"
                    onChange={handleChange}
                  >
                    <option value="">Không chọn </option>
                    <option value="JCB">JCB</option>
                    <option value="UPI">UPI</option>
                    <option value="VIB">VIB</option>
                    <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
                    <option value="SCB">Ngan hang SCB</option>
                    <option value="NCB">Ngan hang NCB</option>
                    <option value="SACOMBANK">Ngan hang SacomBank </option>
                    <option value="EXIMBANK">Ngan hang EximBank </option>
                    <option value="MSBANK">Ngan hang MSBANK </option>
                    <option value="NAMABANK">Ngan hang NamABank </option>
                    <option value="VNMART"> Vi dien tu VnMart</option>
                    <option value="VIETINBANK">Ngan hang Vietinbank </option>
                    <option value="VIETCOMBANK">Ngan hang VCB </option>
                    <option value="HDBANK">Ngan hang HDBank</option>
                    <option value="DONGABANK">Ngan hang Dong A</option>
                    <option value="TPBANK">Ngân hàng TPBank </option>
                    <option value="OJB">Ngân hàng OceanBank</option>
                    <option value="BIDV">Ngân hàng BIDV </option>
                    <option value="TECHCOMBANK">Ngân hàng Techcombank </option>
                    <option value="VPBANK">Ngan hang VPBank </option>
                    <option value="AGRIBANK">Ngan hang Agribank </option>
                    <option value="MBBANK">Ngan hang MBBank </option>
                    <option value="ACB">Ngan hang ACB </option>
                    <option value="OCB">Ngan hang OCB </option>
                    <option value="IVB">Ngan hang IVB </option>
                    <option value="SHB">Ngan hang SHB </option>
                    <option value="APPLEPAY">Apple Pay </option>
                    <option value="GOOGLEPAY">Google Pay </option>
                  </select>

                  <label for="language">Ngôn ngữ</label>
                  <select
                    name="language"
                    id="language"
                    class="form-control"
                    onChange={handleChange}
                  >
                    <option value="vn">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                  {errorPayment && (
                    <p className="errorMessage">{errorPayment}</p>
                  )}

                  <div className="btnDiv">
                    <button type="submit" className="btnSub">
                      Next: Final details
                    </button>
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
