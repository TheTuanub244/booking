import React from "react";
import "./propertyReview.css";
import { useEffect, useState, useRef } from "react";
import RatingProgressBar from "./ratingProgressBar/ratingProgressBar";
import ReviewComment from "./reviewComment/reviewComment";
import ReviewDetail from "./reviewDetail/reviewDetail";

const PropertyReview = ({ property_id }) => {
  const [reviewPoint, setReviewPoint] = useState({
    staff: 0,
    facilities: 0,
    cleanliness: 0,
    comfort: 0,
    value_of_money: 0,
    location: 0,
    freewifi: 0,
  });

  const [allReviewPopUp, setAllReviewPopUp] = useState(true);

  const reviewCommentRef = useRef(null);

  useEffect(() => {}, [property_id]);

   
  function scrollLeft() {
    if (reviewCommentRef.current) {
      reviewCommentRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  }


  function scrollRight() {
    if (reviewCommentRef.current) {
      reviewCommentRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  }

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
      <div className="review-rating-container">
        <h4>Rating</h4>
        <div class="rating-categories">
          <RatingProgressBar categorize={"good"} point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
          <RatingProgressBar point={9.0} />
        </div>
      </div>

      <div className="review-comment-container">
        <h4>Comment</h4>
        <button class="left-button" onClick={(e) => {e.preventDefault();
                                scrollLeft();}}>&#8592;</button>
        <div className="review-comment" ref={reviewCommentRef}>
         
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          <ReviewComment />
          
        </div>
        <button class="right-button" onClick={(e) => {e.preventDefault();
                                 scrollRight();}}>&#8594;</button>
      </div>

      <button
        className="view-all-review-button"
        onClick={(e) => {
          e.preventDefault();
          setAllReviewPopUp(true);
        }}
      >
        View all reviews
      </button>
      {allReviewPopUp && (
        <>
          <div
            className="blockInput"
            onClick={(e) => {
              e.preventDefault();
              setAllReviewPopUp(false);
            }}
          ></div>
          <div className="all-reviews">
            <ReviewDetail />
            <hr></hr>
            <ReviewDetail />
            <hr></hr>
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
            <ReviewDetail />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyReview;
