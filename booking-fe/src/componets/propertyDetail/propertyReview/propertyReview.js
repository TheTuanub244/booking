import React from "react";
import "./propertyReview.css";
import { useEffect, useState, useRef } from "react";
import RatingProgressBar from "./ratingProgressBar/ratingProgressBar";
import ReviewComment from "./reviewComment/reviewComment";
import ReviewDetail from "./reviewDetail/reviewDetail";
import { findReviewWithProperty } from "../../../api/reviewAPI";


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

  const [reviewComment, setReviewComment] = useState([]);

  const [allReviewComment, setAllReviewComment] = useState([]);

  const [allReviewPopUp, setAllReviewPopUp] = useState(true);

  const reviewCommentRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopComments();
    console.log(reviewComment);
  }, [property_id]);

  async function handleViewAllReview(){
    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      setAllReviewComment(reviewComments.reviews);
    } catch(e) {
      console.log(`Error at fetching review comment ${e}`);
    }
  }

  async function fetchTopComments() {
    setIsLoading(true);
    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      console.log(reviewComments);
      setReviewComment(reviewComments.reviews);
      setIsLoading(false);
    } catch (e) {
      console.log(`Error at fetching review comment ${e}`);
    }
    
  }

   
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
         
          {!isLoading ? (reviewComment.map((review, index) => 
            (<ReviewComment key={index} review={review} />)
          )) : (
            Array(10).fill(null).map((_, index) => <ReviewComment key={index} />)
          )}
            
        </div>
        <button class="right-button" onClick={(e) => {e.preventDefault();
                                 scrollRight();}}>&#8594;</button>
      </div>

      <button
        className="view-all-review-button"
        onClick={(e) => {
          e.preventDefault();
          setAllReviewPopUp(true);
          handleViewAllReview();
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
          {allReviewComment ? allReviewComment.map((review, index) => (<ReviewDetail key={index} review={review} />))
                            : (
                              Array(10).fill(null).map((_, index) => <ReviewDetail key={index} />)
                            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyReview;
