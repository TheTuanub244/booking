import React from "react";
import "./roomModal.css"; // Optional for styling
import RoomModal_image from "./roomModal_image";

const RoomModal = ({ isOpen, onClose, room }) => {
  if (!isOpen) return null;

  return (
    room && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="image">
            <RoomModal_image images={room.images} />
          </div>
          <div className="info">
            <div className="close">
              <button onClick={onClose}>x</button>
            </div>

            <h2>{room.name}</h2>
            <p>Type: {room.type}</p>
            <p>Rating: {room.rating}</p>
            <p>Capacity: {room.capacity.room} guests</p>
            <p>Price per Night: {room.price_per_night}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomModal;
