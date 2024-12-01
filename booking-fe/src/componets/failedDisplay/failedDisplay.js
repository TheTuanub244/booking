import React from "react";
import './failedDisplay.css';
import red_cross from '../../assets/images/red_cross.png'

function FailedDisplay({text}){
    return (<div className="blockInput" onClick={(e) => e.stopPropagation()}>
        <div className="failedDisplay-content">
            <div className="failedDisplay-image">
                <img src={red_cross}></img>
            </div>
            <div className="failedDisplay-text">
                <p>{text}</p>

            </div>
        </div>

    </div>)
}

export default FailedDisplay;