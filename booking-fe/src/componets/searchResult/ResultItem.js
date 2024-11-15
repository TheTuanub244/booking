import React from "react";
import "./ResultItem.css"
const ResultItem = ({ property }) => {
    const option = JSON.parse(localStorage.getItem('option'))

    const checkAdults = option.capacity.adults  > 1 ? "adults" : "adult";
    const checkRooms = option.capacity.room > 1 ? "rooms" : "room";
    const checkIn = new Date(option.check_in);
    const checkOut = new Date(option.check_out);
    const differenceInTime = checkOut - checkIn;

    const nights = differenceInTime / (1000 * 60 * 60 * 24);
    const checkNights = nights > 1 ? "nights" : "night"
    return (
        <div className="result-item">
            <img src={property.images[0]} alt={`${property.name}`} className="hotel-image" />
            <div className="hotel-info">
                <div className="result-item-head">
                    <div className="property-name-container">
                    <h2 className="property-name">
                        {property.property_id.name} <span className="rating">★★★★</span>
                    </h2>
                    <p style={{
                        fontSize: '12px',
                        color: '#006CE4',
                        textDecoration: 'underline',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>{property.property_id.address.district}, {property.property_id.address.province}</p>
                    <p style={{
                        fontSize: '12px',
                        color: '#006CE4',
                        textDecoration: 'underline',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>Show on map</p>
                    </div>

                    <div className="rating-box">
                        <div className="left-rating">
                            <p className="reviews">Fabulous</p>
                            <p className="review-count"> reviews</p>
                        </div>
                        <p className="score">{property.property_id.rate}</p>
                        
                    </div>
                    
                </div>
                <div className="result-main">
                    <div className="main-left">
                        <p className="recommended">Recommended for your group</p>
                        <ul className="room-details">
                            <li style={{
                                fontWeight: '700',
                                fontSize: '12px'
                            }}>{property.name}</li>
                            <li><span className="green-text">Free cancellation</span></li>
                            <li><span className="green-text">No prepayment needed</span></li>
                        </ul>
                    </div>
                    <div className="main-right">
                        <p style={{
                            fontSize: '12px',
                            marginLeft: '50%'
                        }}>{nights} {checkNights}, {option.capacity.adults} {checkAdults}, {option.capacity.room} {checkRooms}</p>
                        <button className="availability-button">See availability</button>

                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default ResultItem;