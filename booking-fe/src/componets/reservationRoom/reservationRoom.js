import React, { useState } from 'react';
import './reservationRoom.css';

const ReservationRoom = ({ roomData }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfNights, setNumberOfNights] = useState(3);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reservation Details:", {
      selectedRoom,
      checkInDate,
      checkOutDate,
      numberOfGuests,
    });
  };

  return (
    <div className="ReservationForm">
      <h2>Reserve Your Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="table-responsive">
          <table className="room-table">
            <thead>
              <tr>
                <th>Room type</th>
                <th>Number of guests</th>
                <th>Price for {numberOfNights} nights</th>
                <th>Your choices</th>
                <th>Select rooms</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room) => (
                <tr key={room.id}>
                  <td>
                    <strong>{room.type}</strong>
                    <div>{room.description}</div>
                    <ul>
                      {room.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                  <td>👤 {room.guests}</td>
                  <td>
                    <div className="price">
                      <span className="original-price">
                        {room.originalPrice}
                      </span>
                      <span className="discounted-price">
                        {room.discountedPrice}
                      </span>
                      <span className="discount">20% off</span>
                    </div>
                  </td>
                  <td>
                    <ul className="choices">
                      {room.choices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="selectedRoom"
                      value={room.id}
                      checked={selectedRoom === room.id}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="reservation-details">
          <label htmlFor="checkIn">Check-In Date:</label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />

          <label htmlFor="checkOut">Check-Out Date:</label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
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
        </div>
        <button type="submit">Reserve Now</button>
      </form>
    </div>
  );
};

export default ReservationRoom;
