import { useEffect } from "react"
import { getBooking } from "../../../api/bookingAPI"

const PartnerBookingDashboard = () => {
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        const handleGetBooking = async () => {
            const respone = await getBooking(userId)
            console.log(respone);
            
        }
        handleGetBooking()
    }, [])
    return (
        <h1>Hello</h1>
    )
}
export default PartnerBookingDashboard;