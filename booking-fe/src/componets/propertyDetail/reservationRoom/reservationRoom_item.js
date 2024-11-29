import React, { useEffect } from "react";
import "./reservationRoom_items.css";
import { formatCurrency } from "../../../helpers/currencyHelpers";
import { calculateTotalNightPriceForReservation } from "../../../api/bookingAPI";
import { useLocation } from "react-router-dom";

function ReservationRoom_item({
  room,
  totalPrice,
  numberOfNights,
  setTotalPrice,
  setSelectedRoom,
  selectedRoom,
  setIsModalOpen,
  setModalRoom,
}) {
  const handleRoomClick = () => {
    setIsModalOpen(true);
    setModalRoom(room);
  };
  const check_in_date = JSON.parse(localStorage.getItem('option')).check_in
  const check_out_date = JSON.parse(localStorage.getItem('option')).check_out

  const handleSelectedRoom = (e) => {
    const { value, name } = e.target;
    setSelectedRoom((prev) => {
      const existingRoomIndex = prev.findIndex((room) => room.roomId === name);

      if (existingRoomIndex !== -1) {
        console.log(value);
        
        // Create a new array with the updated room count
        return prev.map((room, index) =>
          index === existingRoomIndex
            ? { ...room, numberOfRooms: value }
            : room,
        );
      } else {
        
        // Add a new room entry
        return [
          ...prev,
          {
            roomId: name, 
            numberOfRooms: value,
          },
        ];
      }
    });
  };
  useEffect(() => {
    const calculateTotalNightPrice = async () => {
      const response = await calculateTotalNightPriceForReservation(selectedRoom, check_in_date, check_out_date)
      setTotalPrice(response)
    }
    calculateTotalNightPrice()
  }, [selectedRoom])
  return (
    <tr key={room._id}>
      <td>
        <div className="roomName">
          <a
            href="#"
            className="name"
            onClick={(e) => {
              e.preventDefault();
              handleRoomClick();
            }}
          >
            {room.name}
          </a>
          <span className="type">{room.type}</span>
        </div>
      </td>
      <td>{room.rating}</td>
      <td>👤 {room.guests}</td>

      <td>
        <div className="price">
          <span className="original-price">{room.originalPrice}</span>
          <span className="discounted-price">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </td>
      <td>
        <input
          type="number"
          min="0"
          max={room.capacity.room}
          name={room._id}
          onChange={(e) => handleSelectedRoom(e)}
        />
      </td>
    </tr>
  );
}

export default ReservationRoom_item;
