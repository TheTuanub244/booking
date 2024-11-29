import React, { useEffect, useState } from "react";
import "./reservationRoom.css";
import ReservationRoom_item from "./reservationRoom_item";
import RoomModal from "./roomModal";
import { checkRoomDateBooking } from "../../../function/searchRoomInProperty";
import SignInPopup from "./signInPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../../../api/bookingAPI";
import { Button, Modal } from "react-bootstrap";
import { calculateNights } from "../../../helpers/dateHelpers";
import { formatCurrency } from "../../../helpers/currencyHelpers";
import moment from "moment";

const ReservationRoom = ({ roomData, partnerId }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState({
    adults: 0,
    child: {
      count: 0,
      age: 0
    },
  });
  
  const [numberOfNights, setNumberOfNights] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalRoom, setModalRoom] = useState(null);

  const [isSearchRoom, setIsSearchRoom] = useState(false);

  const [roomSearch, setRoomSearch] = useState(null);

  const [numberOfGuestInput, setNumberOfGuestInput] = useState(false);

  const [showModal, setShowModal] = useState(false)

  const [totalPrice, setTotalPrice] = useState(0)
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken")
  const closeModal = () => {
    setIsModalOpen(false);
    setModalRoom(null);
  };
  useEffect(() => {
    const check_in = JSON.parse(localStorage.getItem('option')).check_in
    const check_out = JSON.parse(localStorage.getItem('option')).check_out

    const formattedCheckIn = (new Date(check_in)).toISOString().split('T')[0];
    const formattedCheckOut = (new Date(check_out)).toISOString().split('T')[0];

    setCheckInDate(formattedCheckIn)
    setCheckOutDate(formattedCheckOut)
    
    const totalNights = calculateNights(check_in, check_out)
    setNumberOfNights(totalNights)
  }, [])
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
        if(value === 0){
          return {
            ...prev,
            child: {
              count: 0,
              age: 0,
            }
          }
        } 
        return {
          ...prev,
          child: {
            ...prev.child,
            count: value
          }
        }
      }
    });
  };

  const handleChangeAgeOfChilds = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    setNumberOfGuests((prev) => ({
      ...prev,
      child: {
        ...prev.child,
        age: value
      }
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
    let miliseconds = Math.abs(date2 - date1);
    let days = miliseconds / (1000 * 60 * 60 * 24);

    if (days) setNumberOfNights(days);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReserveClick = async () => {
    try{
      
      const option = JSON.parse(localStorage.getItem('option'))
      await createBooking(
        userId,
        partnerId,
        roomData[0].room.property_id._id,
        selectedRoom,
        option.capacity,
        option.check_in,
        option.check_out,
        totalPrice,
        accessToken
      );
    } catch(err){
      console.log(err);
      if(err.response.status === 401){
        setShowModal(true)
      }
    }
  };
  const handleCloseModal = async () => {
    setShowModal(false);
    navigate("/login");
  };
  const searchRoom = () => {
    let dateSearch = {
      check_in_date: new Date(checkInDate),
      check_out_date: new Date(checkOutDate),
    };

    setRoomSearch(
      roomData.filter((room) =>
        checkRoomDateBooking(dateSearch, room.room.availability),
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
      <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="fix-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign in required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You must sign in to reserve your room !
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleCloseModal()}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      <h2>Reserve Your Room</h2>
      <form className="reservation-details" onSubmit={e => {e.preventDefault();}}>
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
            `${numberOfGuests.adults} Adults + ${numberOfGuests.child.count} Childs`}
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
                  value={numberOfGuests.child.count}
                  onChange={(e) => handleChangeNumberOfGuest(e)}
                />
                {numberOfGuests.child.count > 0 && (
                  <>
                    <label>Childs Age: </label>
                    <div className="childAgeInput">
                      <input
                        type="number"
                        name={`childAge`}
                        value={numberOfGuests.child.age}
                        onChange={(e) => {
                          handleChangeAgeOfChilds(e);
                        }}
                      />
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
                      key={room.room._id}
                      room={room.room}
                      totalPrice={room.totalPriceNight}
                      selectedRoom={selectedRoom}
                      numberOfNights={numberOfNights}
                      setTotalPrice={setTotalPrice}
                      setSelectedRoom={setSelectedRoom}
                      setIsModalOpen={setIsModalOpen}
                      setModalRoom={(room) => {
                        setModalRoom(room.room);
                        setIsModalOpen(true);
                      }}
                    />
                  ))
                : roomSearch.map((room) => (
                    <ReservationRoom_item
                      key={room._id}
                      room={room}
                      numberOfNights={numberOfNights}
                      setSelectedRoom={setSelectedRoom}
                      setTotalPrice={setTotalPrice}
                      setIsModalOpen={setIsModalOpen}
                      setModalRoom={(room) => {
                        setModalRoom(room);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        
        <div className="reserveButton">
          <div>
            <h2>Total Price: {formatCurrency(totalPrice)}</h2>
          </div>
          <button className="reserve" onClick={handleReserveClick}>
            Reserve Now
          </button>
        </div>
      </form>

      {isModalOpen && (
        <RoomModal isOpen={isModalOpen} onClose={closeModal} room={modalRoom} />
      )}

      <SignInPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default ReservationRoom;
