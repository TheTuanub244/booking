import React, { useState } from 'react';
import './reservationRoom.css';
import ReservationRoom_item from './reservationRoom_item';
import RoomModal from './roomModal';
import SignInPopup from './signInPopup';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationRoom = ({ roomData }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfNights, setNumberOfNights] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalRoom, setModalRoom] = useState(null);
  const userId = localStorage.getItem('userId')
  const closeModal = () => {
    setIsModalOpen(false);
    setModalRoom(null);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reservation Details:", {
      selectedRoom,
      checkInDate,
      checkOutDate,
      numberOfGuests,
    });
  };

  const handleChangeDate = (e) => {
    let date1, date2;
    if(e.target.id === "checkIn"){
      setCheckInDate(e.target.value);
      date1 = new Date(e.target.value);
      if(checkOutDate) date2 = new Date(checkOutDate);
    }
    if(e.target.id === "checkOut"){
      
      date2 = new Date(e.target.value);

      if(checkInDate) date1 = new Date(checkInDate);

      if(date2 - date1 < 0) return;


      setCheckOutDate(e.target.value);
    }
      console.log(date1);
      let miliseconds = Math.abs(date2 - date1);
      let days = miliseconds / (1000 * 60 * 60 * 24);

      if(days) setNumberOfNights(days);
    
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReserveClick = () => {
    if(!userId){
      setIsPopupOpen(true)
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSignIn = () => {
    setIsPopupOpen(false);
    localStorage.setItem('redirectPath', location.pathname)
    navigate('/login')
  };
  return (
    <div className="ReservationForm">
      <h2>Reserve Your Room</h2>
      <form onSubmit={handleSubmit}>
      <div className="reservation-details">
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
          <input
            type="number"
            id="guests"
            value={numberOfGuests}
            min="1"
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
          <button type="button" className='update'>Update</button>
      </div>
        
        <div className="table-responsive">
          <table className="room-table">
            <thead>
              <tr key="0">
                <th>Room type</th>
                <th>Rates</th>
                <th>Number of guests</th>
                <th>Price for {numberOfNights ? numberOfNights : ''} nights</th>
                <th>Select rooms</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room) => <ReservationRoom_item key={room._id} room={room} numberOfNights={numberOfNights} 
                                                            setSelectedRoom={setSelectedRoom} 
                                                            setIsModalOpen={setIsModalOpen} 
                                                            setModalRoom={setModalRoom} />)}
            </tbody>
          </table>
        </div>
        <div className="reserveButton">
          <button className="reserve" onClick={handleReserveClick}>Reserve Now</button>
        </div>
        

      </form>
      <RoomModal isOpen={isModalOpen} 
                onClose={closeModal} 
                room={modalRoom} />
      <SignInPopup isOpen={isPopupOpen} onClose={handleClosePopup} onSignIn={handleSignIn}/>
    </div>
  );
};

export default ReservationRoom;
