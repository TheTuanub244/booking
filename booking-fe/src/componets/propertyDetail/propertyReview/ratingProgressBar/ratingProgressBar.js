import React from "react";
import './ratingProgressBar.css'

const RatingProgressBar = ({categorize, point}) => {
    const percentage = point * 10;
    return (
        <div className='progressBar-container'>
            <div className="categorize-point">
                <p>{categorize}</p>
                <p>{point}</p>
            </div>
            <div className="progress-bar">
                <div
                    className="fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    )
        
        
}

export default RatingProgressBar;