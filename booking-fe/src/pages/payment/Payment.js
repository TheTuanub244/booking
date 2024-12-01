import React, { useState, useEffect } from "react";
import "./payment.css";
import Navbar from "../../componets/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { createBooking } from "../../api/bookingAPI";
import {
  faWifi,
  faPlaneDeparture,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

function Payment(
  //object 
  /*  address(chỗ này gửi được chuỗi đầy đủ như này luôn thì tốt "190 Le Thanh Ton, District 1, Ho Chi Minh City, Vietnam")
      hotelName
      checkInDate()
      checkOutDate()
      totalPrice(số tiền: ví dụ: 4000000)
      capacity {
        adults: (số lượng),
        childs: {
          count: (số lg),
          age: (tuổi)
        }
      }
      roomData(Mảng)
      totalNight(số lượng: ví dụ:2)
      review: {
        total: (số lượng nhận xét)
        point: (số điểm)
        desc: (mô tả)
      }
    parterId: (id)
    property:(id)
  */
) {
  const [hasChild, setHasChild] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    address: "",
    hotelName: "",
    checkInDate: "",
    checkOutDate: "",
    totalPrice: "",
    capacity: {
      adults: 0,
      childs: {}
    },
    roomData: [],
    totalNight: 0,
    reviews: {},
    partnerId: "",
    property: "propertyInfo.property"
  });
  const [isloading,setIsloading]=useState(true);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Kiểm tra nếu chuỗi ngày không hợp lệ
    if (isNaN(date)) return "Invalid Date";
  
    const dayName = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
  
    return `${dayName}, ${day} ${month} ${year}`;
  };
  

  const [errorPayment, setErrorPayment] = useState(
    "Please fill in your last name",
  );
  let totalRoom = 0;

  const loadData = async () => {
    var ri = localStorage.getItem('reservationInfo');
    if(ri) {
      ri = JSON.parse(ri);
      await setReservationInfo(ri);
    }
  }

  const editData = async () => {
    await loadData();
    setIsloading(false);
    console.log(reservationInfo);

    reservationInfo.roomData.forEach((room) => {
      totalRoom += room.numberOfRooms;
    });
  
    if (reservationInfo.capacity.childs.count !== 0) {
      setHasChild(true);
    } else {
      setHasChild(false);
    }
  }

useEffect(() => {
  
  editData();
  console.log(reservationInfo);
}, []);



  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
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
    const user_id = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    const booking = createBooking(user_id,reservationInfo.partnerId,reservationInfo.property,reservationInfo.roomData,reservationInfo.capacity,reservationInfo.checkInDate,reservationInfo.checkOutDate,reservationInfo.totalPrice,token);
    console.log(booking);
    const overViewData = {
      bookingId:booking._id,
      email:formData.email,
      firstName: formData.firstname,
      lastName: formData.lastname,
      address:reservationInfo.address,
      hotelName:reservationInfo.hotelName,
      checkInDate:reservationInfo.checkInDate,
      checkOutDate:reservationInfo.checkOutDate,

    }

    localStorage.setItem('overViewData',JSON.stringify(overViewData));


    axios
      .post(`${process.env.REACT_APP_API_URL}/payment/create_transaction`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    
    <div>
      {!isloading && <>
        <Navbar />
        <div className="payment">
          <div className="paymentContainer">
            <div className="leftContent">
              <div className="bookingInformation">
                <h3>{reservationInfo.hotelName}</h3>
                <div className="address">
                  {reservationInfo.address}
                </div>
                <span>{reservationInfo?.review?.desc || "Good"} Location</span>
                <div className="infoEvaluation">
                  <div className="infoScore">
                    <div>{reservationInfo?.review?.point ||"4.0"}</div>
                  </div>

                  <div className="infoRating">
                    <div className="infoComment">{reservationInfo?.review?.desc|| "Good"}</div>
                    <div className="infoReview">{reservationInfo?.review?.total || 141} reviews</div>
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
                    <div className="checkInTime">{formatDate(reservationInfo.checkInDate)}</div>
                    <div className="checkInFrom">From 14:00</div>
                  </div>

                  <div className="checkOut">
                    <div className="checkOutTitle">Check-out</div>
                    <div className="checkOutTime">{formatDate(reservationInfo.checkOutDate)}</div>
                    <div className="checkOutUntil">Until 11:00</div>
                  </div>
                </div>
                <div className="lengthStay">
                  <div className="lengthStayTitle">Total length of stay:</div>
                  <div className="totalNight">{reservationInfo.totalNight} nights</div>
                </div>

                <div className="selected">
                  <div className="selectedTitle">You selected</div>

                  {hasChild === true ? (
                    <div className="mySelected">{totalRoom} rooms for {reservationInfo.capacity.adults} adults, {reservationInfo.capacity.childs.count} childs</div>
                  ) : (
                    <div className="mySelected">{totalRoom} rooms for {reservationInfo.capacity.adults} adults</div>
                  )

                  }
                  <button className="changeSelection">
                    Change your selection{" "}
                  </button>
                </div>
              </div>

              <div className="priceSummary">
                <h3>Your price summary</h3>
                <div className="totalPrice">
                  <div className="textLeft">Total</div>
                  <div className="textRight">VND {reservationInfo?.totalPrice?.toLocaleString("en-US")}</div>
                </div>
              </div>
            </div>
            <div className="rightContent">

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
                    action="http://localhost:8000/payment/create_transaction"
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

                    <label for="amount">Total price<span className="required">*</span></label>
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

                    <label for="bankcode">Payment method</label>
                    <select
                      name="bankCode"
                      id="bankcode"
                      class="form-control"
                      onChange={handleChange}
                    >
                      <option value="">Không chọn </option>
                      <option value="VNMART"> Vi dien tu VnMart</option>
                      <option value="VISA">VISA</option>
                      <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
                      <option value="SCB">Ngan hang SCB</option>
                      <option value="NCB">Ngan hang NCB</option>
                      <option value="SACOMBANK">Ngan hang SacomBank </option>
                      <option value="EXIMBANK">Ngan hang EximBank </option>
                      <option value="MSBANK">Ngan hang MSBANK </option>
                      <option value="NAMABANK">Ngan hang NamABank </option>
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
      
                    </select>

                    <label for="language">Language<span className="required">*</span></label>
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
      </>}
      
    </div>
  );
}

export default Payment;
