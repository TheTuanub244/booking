import React, { useEffect } from "react";
import './failedDisplay.css';
import red_cross from '../../assets/images/red_cross.png'

function FailedDisplay({text, isOpen, setIsOpen}){

    const handleTimeoutFailedDisplay = async () => {
        setIsOpen(true);
    
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        setIsOpen(false);
    }

    useEffect(() => {
        handleTimeoutFailedDisplay();
    }, [isOpen]);

    return (
        <>
        {isOpen && <div className="blockInput" onClick={(e) => e.stopPropagation()}>
            <div className="failedDisplay-content">
                <div className="failedDisplay-image">
                    <img src={red_cross}></img>
                </div>
                <div className="failedDisplay-text">
                    <p>{text}</p>

                </div>
            </div>

        </div>}
        </>
    )
}

export default FailedDisplay;