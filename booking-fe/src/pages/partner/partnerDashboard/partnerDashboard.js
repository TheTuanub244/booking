import React, { useState, useEffect } from 'react';
import './partnerDashboard.css';
import PartnerNavbar from '../../../componets/partner/partnerNavbar/partnerNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const words = ["Hotel", "Apartment", "Homestay", "Hostel"];

const PartnerDashboard = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 5000); // Change word every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <PartnerNavbar/>
            <div className='dashboard-container'>
                <div className="dashboard-text">
                    <h1 className="big-text">List your</h1>
                    <h1 className="big-text transition-text">{words[currentWordIndex]}</h1>
                    <h1 className="big-text">on Booking</h1>
                    <h2 style={{
                        color: 'white'
                    }}>List your property today and quickly start earning more income</h2>
                </div>
                <div className='register-block'>
                    <h2>Register for free</h2>
                    <div className='list-option'>
                        <span className='list-item'> <FontAwesomeIcon icon={faCheck} className='icon'/> Mange your properties</span>
                        <span className='list-item'> <FontAwesomeIcon icon={faCheck} className='icon'/> We handle your payment</span>
                    </div>
                    <button onClick={() => navigate('/partner/partnerRegister')}>Get started now</button>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;
