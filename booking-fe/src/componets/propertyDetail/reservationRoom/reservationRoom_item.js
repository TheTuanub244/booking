import React from "react";
import "./reservationRoom_items.css";

function ReservationRoom_item({
  room,
  numberOfNights,
  setSelectedRoom,
  setIsModalOpen,
  setModalRoom,
}) {
  const handleRoomClick = () => {
    setIsModalOpen(true);
    setModalRoom(room);
  };

  const handleSelectedRoom = (e) => {
    const { value, name } = e.target;
    setSelectedRoom((prev) => {
      const existingRoomIndex = prev.findIndex((room) => room.roomId === name);

      // If room exists, update its numberOfRooms; otherwise, add a new entry
      if (existingRoomIndex !== -1) {
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
            roomId: name, // Store roomId as a string
            numberOfRooms: value,
          },
        ];
      }
    });
  };
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
            {room.price_per_night && room.price_per_night * numberOfNights}
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
