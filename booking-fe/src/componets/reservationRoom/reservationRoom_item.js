import React from "react";
import './reservationRoom_items.css'

function ReservationRoom_item({ room, numberOfNights, setSelectedRoom }){
    return (
                <tr key={room._id}>
                  <td>
                    <div className="roomName">
                        <span className="name">{room.name}</span>
                        <span className="type">{room.type}</span>
                    </div>
                  </td>
                  <td>
                    {room.rating}
                  </td>
                  <td>👤 {room.guests}</td>
                  
                  <td>
                    <div className="price">
                      <span className="original-price">
                        {room.originalPrice}
                      </span>
                      <span className="discounted-price">
                        {room.price_per_night * numberOfNights}
                      </span>
                    </div>
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="selectedRoom"
                      value={room._id}
                      onChange={() => setSelectedRoom(room._id)}  
                    />
                  </td>
                </tr>
    )
}

export default ReservationRoom_item;