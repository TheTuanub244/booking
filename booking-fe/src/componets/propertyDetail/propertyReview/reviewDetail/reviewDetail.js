import React from "react";
import './reviewDetail.css'

const ReviewDetail = () => {
    
    return (
        <div className="review-detail">
            <div className="review-detail-profile">
                <div className="reviewer-profile">
                    <div className="reviewer-image">
                        <div className="img">
                            img{/* img */}
                        </div>
                    </div>
                    <div className="reviewer-name-nationality">
                        <div className="reviewer-name">
                            a{/* profile name*/}
                        </div>
                        <div className="reviewer-nationality">
                            a{/* profile nationality*/}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="review-detail-content">
                <div className="review-detail-overview">
                    <div className="review-detail-header">
                        <div className="review-detail-date">
                            a{/*ngay thang nam cua danh gia*/}
                        </div>
                        <div className="review-detail-title">
                            a{/*tieu de danh gia */}
                        </div>
                    </div>
                    <div className="review-detail-rate">
                        a{/*diem danh gia */}
                    </div>
                </div>

                <div className="review-detail-text">
                    {/* van ban danh gia */}
                    a<br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                </div>

                <div className="review-detail-response">
                    a{/* phan hoi cua khach san */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                
            </div>
        </div>)
}

export default ReviewDetail;