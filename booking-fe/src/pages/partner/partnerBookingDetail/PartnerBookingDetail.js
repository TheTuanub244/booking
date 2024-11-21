import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../componets/loading/Loading";
import "./PartnerBookingDetail.css"
import { calculateNights, formatDateDayMonthAndYear } from "../../../helpers/dateHelpers";
import PartnerNavbar from "../../../componets/partner/partnerNavbar/partnerNavbar";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { formatCurrency } from "../../../helpers/currencyHelpers";
const PartnerBookingDetail = () => {
    const location = useLocation()
    const [booking, setBooking] = useState()
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const [roomCounts, setRoomCounts] = useState()
    useEffect(() => {
        setBooking(location.state)
    }, [])
    useEffect(() => {
        if(booking && booking.length !== 0){
        const calculateRoomCounts = (roomDetails) => {
            const roomCounts = {};
    
            roomDetails.forEach((room) => {
                if (roomCounts[room.name]) {
                    roomCounts[room.name] += 1;
                } else {
                    roomCounts[room.name] = 1;
                }
            });
    
            return Object.entries(roomCounts);
        }

            const roomCounts = calculateRoomCounts(booking.roomDetails);
            console.log(booking);
            
            setRoomCounts(roomCounts)
        }
    }, [booking])
    return (
        <>
            <PartnerNavbar/>
            {
                booking ? (
                    <div className="partner-booking-detail-container">
                    <div className="partner-booking-detail-container-left">
                        <div className="partner-booking-user-info">
                            <h2>Customer Detail</h2>
                            <p>Email: {booking.userDetails[0].email}</p>
                        </div>
                        <p>{booking.userDetails[0].address.ward}, {booking.userDetails[0].address.district}, {booking.userDetails[0].address.province}</p>
                        <p>Phone: {booking.userDetails[0].phoneNumber}</p>
                        <p className={`${booking.booking_status === "Completed" ? "complete-color" : (
                            booking.booking_status === "Pending" ? "pending-color" : "cancel-color"
                        ) }`}>Booking Status: {booking.booking_status}</p>
                    </div>
                    <div className="partner-booking-detail-container-right">
                        <div className="property-detail-information">
                            <p style={{
                                fontSize: '30px',
                                fontWeight: '700',
                                color: 'black'
                            }}>{booking.propertyDetails.name}</p>
                            <img src={booking.propertyDetails.images[0]} className="image-thumbnail"/>
                            <p style={{
                                marginTop: '20px'
                            }}>Địa chỉ {booking.propertyDetails.address.street}, {booking.propertyDetails.address.ward}, {booking.propertyDetails.address.district}, {booking.propertyDetails.address.province}</p>
                            <div className="property-detail-rate">
                                <span className="rate-number">{booking.propertyDetails.rate}</span>
                                <span style={{
                                    textAlign: 'center',
                                    marginTop: '12px'
                                }}><p>With 0 reviews</p></span>
                            </div>
                        </div>
                        <div className="property-detail-night">
                            <h3>Your booking details</h3>
                            <div className="check-in-check-out">
                                <div className="check-in">
                                <p style={{
                                    fontWeight: '600'
                                }}>Check in</p>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>{formatDateDayMonthAndYear(booking.check_in_date)}</p>
                                </div>
                                <div className="check-out">
                                <p style={{
                                    fontWeight: '600'
                                }}>Check out</p>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>{formatDateDayMonthAndYear(booking.check_out_date)}</p>
                                </div>
                            </div>
                            <p style={{
                                fontWeight: '600'
                            }}>Total length of stay</p>
                            <p style={{
                                fontWeight: '700'
                            }}>{calculateNights(booking.check_in_date, booking.check_out_date)} {calculateNights(booking.check_in_date, booking.check_out_date) > 1 ? 'nights' : 'night'}</p>
                            <div className="rooms-details">
                                <p style={{
                                fontWeight: '600'
                            }}>You selected</p>
                                <div className="selection-summary" style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ margin: 0, flex: 1, fontWeight: '700', fontSize: '18px' }}>
                                    {booking.roomDetails.length} {booking.roomDetails.length > 1 ? 'rooms ' : 'room '} 
                                    for {booking.capacity.adults} {booking.capacity.adults > 1 ? 'adults' : 'adult'}
                                    {booking.capacity.childs.count > 0 && (
                                        <>
                                            {' and '}
                                            {booking.capacity.childs.count} {booking.capacity.childs.count > 1 ? 'children ' : 'child '} 
                                            with {booking.capacity.childs.age} years old
                                        </>
                                    )}
                                </p>
                            <button
                                className="toggle-button"
                                onClick={toggleExpand}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                            >
                                {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}

                            </button>
                            </div>
                            <div
                                className={`room-names ${isExpanded ? 'expanded' : 'collapsed'}`}
                                style={{
                                    overflow: 'hidden',
                                    maxHeight: isExpanded ? '500px' : '0', // Smooth expand/collapse
                                    transition: 'max-height 0.3s ease',
                                }}
                            >
                              {
                                (roomCounts && roomCounts.length !== 0) && (
                                    <ul style={{ padding: 0, margin: 0 }}>
                                    {roomCounts.map(([roomName, count], index) => (
                                        <li key={index} style={{ fontSize: '14px', color: '#333', listStyle: 'none' }}>
                                            {count} x {roomName}
                                        </li>
                                    ))}
                                </ul>
                                )
                              }
                            </div>
                            <p style={{
                                fontWeight:'700',
                                color: '#006CE4',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}>Change your selection</p>
                            <div className="total-price-container">
                                <h2>Total Price</h2>
                                <h1>{formatCurrency(booking.total_price)}</h1>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                ) : (
                    <Loading/>
                )
            }
        </>
    )
}
export default PartnerBookingDetail;