import React, { useEffect, useState } from "react";
import "./reservationRoom.css";
import ReservationRoom_item from "./reservationRoom_item";
import RoomModal from "./roomModal";
import { checkRoomDateBooking } from "../../../function/searchRoomInProperty";
import SignInPopup from "./signInPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../../../api/bookingAPI";

const ReservationRoom = ({ roomData, partnerId }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState({
    adults: 0,
    child: [],
  });

  const [numberOfNights, setNumberOfNights] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalRoom, setModalRoom] = useState(null);

  const [isSearchRoom, setIsSearchRoom] = useState(false);

  const [roomSearch, setRoomSearch] = useState(null);

  const [numberOfGuestInput, setNumberOfGuestInput] = useState(false);

  const userId = localStorage.getItem("userId");
  const closeModal = () => {
    setIsModalOpen(false);
    setModalRoom(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reservation Details:", {
      selectedRoom,
      checkInDate,
      checkOutDate,
      numberOfGuests,
    });
  };

  const handleChangeNumberOfGuest = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    if (value < 0) return;
    setNumberOfGuests((prev) => {
      if (e.target.name === "adults") {
        return {
          ...prev,
          [name]: value,
        };
      } else if (name === "child") {
        if (e.target.value < prev.child.length) {
          prev.child.pop();
        } else {
          prev.child.push({
            index: prev.child.length,
            age: 0,
          });
        }
        return { ...prev };
      }
    });
  };

  const handleChangeAgeOfChilds = (e, i) => {
    e.stopPropagation();
    const { value } = e.target;
    setNumberOfGuests((prev) => ({
      ...prev,
      child: prev.child.map((child) =>
        child.index === i ? { ...child, age: Number(value) } : child,
      ),
    }));
  };

  const handleChangeDate = (e) => {
    let date1, date2;
    if (e.target.id === "checkIn") {
      setCheckInDate(e.target.value);
      date1 = new Date(e.target.value);
      if (checkOutDate) date2 = new Date(checkOutDate);
    }
    if (e.target.id === "checkOut") {
      date2 = new Date(e.target.value);

      if (checkInDate) date1 = new Date(checkInDate);

      if (date2 - date1 < 0) return;

      setCheckOutDate(e.target.value);
    }
    console.log(date1);
    let miliseconds = Math.abs(date2 - date1);
    let days = miliseconds / (1000 * 60 * 60 * 24);

    if (days) setNumberOfNights(days);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReserveClick = async () => {
    await createBooking(userId, partnerId, "67349f6d8e44839e850b6366", "67131b83495dc248e2715e5f");
    if (!userId) {
      setIsPopupOpen(true);
    }
  };

  const searchRoom = () => {
    let dateSearch = {
      check_in_date: new Date(checkInDate),
      check_out_date: new Date(checkOutDate),
    };

    setRoomSearch(
      roomData.filter((room) =>
        checkRoomDateBooking(dateSearch, room.availability),
      ),
    );
    setIsSearchRoom(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSignIn = () => {
    setIsPopupOpen(false);
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  return (
    <div className="ReservationForm">
      <h2>Reserve Your Room</h2>
      <form className="reservation-details">
        <label htmlFor="checkIn">Check-In Date:</label>
        <input
          type="date"
          id="checkIn"
          value={checkInDate}
          onChange={(e) => handleChangeDate(e)}
          required
        />

        <label htmlFor="checkOut">Check-Out Date:</label>
        <input
          type="date"
          id="checkOut"
          value={checkOutDate}
          onChange={(e) => handleChangeDate(e)}
          required
        />

        <label htmlFor="guests">Number of Guests:</label>
        <div
          className="guestInput"
          onClick={(e) => {
            e.preventDefault();
            setNumberOfGuestInput(true);
          }}
        >
          {numberOfGuests &&
            `${numberOfGuests.adults} Adults + ${numberOfGuests.child.length} Childs`}
          {numberOfGuestInput && (
            <>
              <div
                className="blockInput"
                onClick={(e) => {
                  e.stopPropagation();
                  setNumberOfGuestInput(false);
                }}
              ></div>

              <div className="numberOfGuestInput">
                <label>Adults: </label>
                <input
                  type="number"
                  name="adults"
                  value={numberOfGuests.adults}
                  onChange={(e) => handleChangeNumberOfGuest(e)}
                />
                <label>Childs: </label>
                <input
                  type="number"
                  name="child"
                  value={numberOfGuests.child.length}
                  onChange={(e) => handleChangeNumberOfGuest(e)}
                />
                {numberOfGuests.child.length > 0 && (
                  <>
                    <label>Childs Age: </label>
                    <div className="childAgeInput">
                      {numberOfGuests.child.map((child) => (
                        <input
                          type="number"
                          key={child.index}
                          name={`childAge ${child.index}`}
                          value={child.age}
                          onChange={(e) => {
                            handleChangeAgeOfChilds(e, child.index);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <button type="submit" className="update">
          Update
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="table-responsive">
          <table className="room-table">
            <thead>
              <tr key="0">
                <th>Room type</th>
                <th>Rates</th>
                <th>Number of guests</th>
                <th>Price for {numberOfNights ? numberOfNights : ""} nights</th>
                <th>Select rooms</th>
              </tr>
            </thead>
            <tbody>
              {!isSearchRoom
                ? roomData.map((room) => (
                    <ReservationRoom_item
                      key={room._id}
                      room={room}
                      numberOfNights={numberOfNights}
                      setSelectedRoom={setSelectedRoom}
                      setIsModalOpen={setIsModalOpen}
                      setModalRoom={setModalRoom}
                    />
                  ))
                : roomSearch.map((room) => (
                    <ReservationRoom_item
                      key={room._id}
                      room={room}
                      numberOfNights={numberOfNights}
                      setSelectedRoom={setSelectedRoom}
                      setIsModalOpen={setIsModalOpen}
                      setModalRoom={setModalRoom}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        <div className="reserveButton">
          <button className="reserve" onClick={handleReserveClick}>
            Reserve Now
          </button>
        </div>
      </form>
      <RoomModal isOpen={isModalOpen} onClose={closeModal} room={modalRoom} />
      <SignInPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default ReservationRoom;
