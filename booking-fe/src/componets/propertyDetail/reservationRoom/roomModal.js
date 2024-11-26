import React from "react";
import RoomModal_image from "./roomModal_image"; // Import the image component
import "./roomModal.css"; // Optional for styling

const RoomModal = ({ isOpen, onClose, room }) => {
  if (!isOpen) return null;

  return (
    room && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div>
            <h2>{room.name}</h2>
            <div className="close">
              <button onClick={onClose}>x</button>
            </div>
          </div>
          <div>
            <div className="image">
              <RoomModal_image images={room.images} />
            </div>
            <div className="info">
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>
                      <b>Type:</b>
                    </td>
                    <td>{room.type}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Rating:</b>
                    </td>
                    <td>{room.rating}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Capacity:</b>
                    </td>
                    <td>{room.capacity.room} guests</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Price per Night:</b>
                    </td>
                    <td>
                      <span
                        className={
                          room.price_per_night.weekday <
                          room.price_per_night.weekend
                            ? "lowerPrice-text"
                            : ""
                        }
                      >
                        {room.price_per_night.weekday} (Weekday)
                      </span>
                      /
                      <span
                        className={
                          room.price_per_night.weekend <
                          room.price_per_night.weekday
                            ? "lowerPrice-text"
                            : ""
                        }
                      >
                        {room.price_per_night.weekend} (Weekend)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h4>Facilities</h4>
              <ul>
                {room.facility.map(
                  (item, index) => item && <li key={index}>{item}</li>, // Only display non-empty facilities
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomModal;
