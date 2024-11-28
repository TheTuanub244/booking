import React from "react";
import './successfullyDisplay.css';
import green_check from '../../assets/images/green_check.png'

const SuccessfullyDisplay = ({text}) => {
    return (<div className="blockInput" onClick={(e) => e.stopPropagation()}>
        <div className="successfullyDisplay-content">
            <div className="successfullyDisplay-image">
                <img src={green_check}></img>
            </div>
            <div className="successfullyDisplay-text">
                <p>{text}</p>

            </div>
        </div>

    </div>)
}

export default SuccessfullyDisplay;