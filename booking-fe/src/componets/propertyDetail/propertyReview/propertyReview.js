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

  const allReviewRef = useRef(null);

  const [currentAllReviewPage, setCurrentAllReviewPage] = useState(1);

  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isLoadingAllReview, setIsLoadingAllReview] = useState(true);

  useEffect(() => {
    fetchTopComments();
    console.log(reviewComment);
  }, [property_id]);

  async function handleViewAllReview(){
    setIsLoadingAllReview(true);
    document.body.style.overflow = "hidden";

    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      setAllReviewComment(reviewComments.reviews);
      setIsLoadingAllReview(false);
    } catch(e) {
      console.log(`Error at fetching review comment ${e}`);
    }
  }

  // Fetch reviews for a specific page
  async function loadReviews(page) {
    console.log("Loading");
    setIsLoadingAllReview(true);
    try {
      const response = await findReviewWithProperty(property_id, page);
      setAllReviewComment((prevReviews) => [...prevReviews, ...response.reviews]);
      setCurrentAllReviewPage(page);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoadingAllReview(false);
    }
  }

  // Handle scroll event
  const handleScrollAllReview = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoadingAllReview) {
      loadReviews(currentAllReviewPage + 1); // Load next page when reaching bottom
    }
  };



  function handleCloseAllReview() {
    document.body.style.overflow = "";
  }

  async function fetchTopComments() {
    setIsLoadingReview(true);
    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      console.log(reviewComments);
      setReviewComment(reviewComments.reviews);
      setIsLoadingReview(false);
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
        <button className="left-button" onClick={(e) => {e.preventDefault();
                                scrollLeft();}}>&#8592;</button>
        <div className="review-comment" ref={reviewCommentRef}>
         
          {!isLoadingReview ? (reviewComment.map((review, index) => 
            (<ReviewComment key={index} review={review} />)
          )) : (
            Array(10).fill(null).map((_, index) => <ReviewComment key={index} />)
          )}
            
        </div>
        <button className="right-button" onClick={(e) => {e.preventDefault();
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
              handleCloseAllReview();
            }}
          ></div>
          
          <div className="all-reviews"
            onClick={(e) => e.stopPropagation()}
            onScroll={(e) => handleScrollAllReview(e)}
            ref={allReviewRef}>
          {allReviewComment.map((review, index) => (<ReviewDetail key={index} review={review} />))}
          {!isLoadingAllReview &&  (Array(10).fill(null).map((_, index) => <ReviewDetail key={index} />))}       
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyReview;
