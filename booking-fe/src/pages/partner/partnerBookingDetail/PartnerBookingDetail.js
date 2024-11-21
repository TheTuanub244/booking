import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../componets/loading/Loading";
import "./PartnerBookingDetail.css"
import { formatDatesDayAndMonth } from "../../../helpers/dateHelpers";
const PartnerBookingDetail = () => {
    const location = useLocation()
    const [booking, setBooking] = useState()
    useEffect(() => {
        console.log(location.state);
        
        setBooking(location.state)
    }, [])
    
    
    return (
        <>
            {
                booking ? (
                    <div className="partner-booking-detail-container">
                    <div className="partner-booking-detail-container-left">
                        <div className="partner-booking-user-info">
                            <h2>You are signed in</h2>
                            <p>Email: {booking.userDetails[0].email}</p>
                        </div>
                        {/* <p>{booking.userDetails[0].address.ward}, {booking.userDetails[0].address.district}, {booking.userDetails[0].address.province}</p> */}
                        <p>Phone: {booking.userDetails[0].phoneNumber}</p>
                    </div>
                    <div className="partner-booking-detail-container-right">
                        <div className="property-detail-information">
                            <p style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                color: 'black'
                            }}>{booking.propertyDetails.name}</p>
                            <p>{booking.propertyDetails.address.street}, {booking.propertyDetails.address.ward}, {booking.propertyDetails.address.district}, {booking.propertyDetails.address.province}</p>
                            <div className="property-detail-rate">
                                <span>{booking.propertyDetails.rate}</span>
                                <p>With 0 reviews</p>
                            </div>
                        </div>
                        <div className="property-detail-night">
                            <h3>Your booking details</h3>
                            <div className="check-in-check-out">
                                <div className="check-in">
                                <p >Check in</p>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>{formatDatesDayAndMonth(booking.check_in_date)}</p>
                                </div>
                                <div className="check-out">
                                <p>Check out</p>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>{formatDatesDayAndMonth(booking.check_out_date)}</p>
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