import React, { useState, useEffect } from 'react';
import './partnerDashboard.css';
import PartnerNavbar from '../../../componets/partner/partnerNavbar/partnerNavbar';

const words = ["Hotel", "Apartment", "Homestay", "Hostel"];

const PartnerDashboard = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 5000); // Change word every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <PartnerNavbar/>
            <div className="dashboard-text">
                <h1 className="big-text">List your</h1>
                <h1 className="big-text transition-text">{words[currentWordIndex]}</h1>
                <h1 className="big-text">on Booking</h1>
            </div>
        </div>
    );
};

export default PartnerDashboard;
