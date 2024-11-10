import React from "react";
import './propertyReview.css';
import { useEffect, useState } from "react";
import RatingProgressBar from "./ratingProgressBar/ratingProgressBar";
import ReviewComment from "./reviewComment/reviewComment";

const PropertyReview = ({property_id}) => {

    const [reviewPoint, setReviewPoint] = useState({
        staff: 0,
        facilities: 0,
        cleanliness: 0,
        comfort: 0,
        value_of_money: 0,
        location: 0,
        freewifi: 0
    })

    useEffect(() => {

    }, [property_id]);

    return (
        <div className="propertyReview-container">
            <h2>Review</h2>
            <div className="overview-review">
                <div className="avarage-point">
                    <h4>9.9</h4>
                </div>
                <div className="rate">
                    <h4>nice</h4>
                </div>
                <div className="numberOfReviews">
                    <h4>9999 Reviews</h4>
                </div>
            </div>
            <h4>Rating</h4>
            <div class="rating-categories">
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
                <RatingProgressBar point={9.0} />
            </div>
            <h4>Comment</h4>
            <div className="review-comment">
                <ReviewComment />
                <ReviewComment />
                <ReviewComment />
            </div>
        </div>
    )
}

export default PropertyReview;