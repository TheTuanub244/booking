import React from "react";
import "./propertyReview.css";
import { useEffect, useState, useRef } from "react";
import RatingProgressBar from "./ratingProgressBar/ratingProgressBar";
import ReviewComment from "./reviewComment/reviewComment";
import ReviewDetail from "./reviewDetail/reviewDetail";
import {
  findReviewWithProperty,
  getMonthlyRateByProperty,
} from "../../../api/reviewAPI";
import Skeleton from "react-loading-skeleton";
import Pagination from '@mui/material/Pagination';
import { FaTimes } from 'react-icons/fa';

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

  const[totalPageReview, setTotalPageReview] = useState(0);

  const [allReviewComment, setAllReviewComment] = useState([]);

  const [monthlyRate, setMonthlyRate] = useState({});

  const [allReviewPopUp, setAllReviewPopUp] = useState(false);

  const reviewCommentRef = useRef(null);

  const allReviewRef = useRef(null);

  const [currentAllReviewPage, setCurrentAllReviewPage] = useState(1);

  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isLoadingAllReview, setIsLoadingAllReview] = useState(true);

  const [isLoadingRate, setIsLoadingRate] = useState(true);

  useEffect(() => {
    fetchTopComments();
    fetchMonthlyRate();
  }, [property_id]);

  useEffect(() => {
    

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleViewAllReview() {
    setIsLoadingAllReview(true);

    document.body.style.overflow = "hidden";

    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      setAllReviewComment(reviewComments.reviews);
      setIsLoadingAllReview(false);
      setTotalPageReview(reviewComment.totalPages)
    } catch (e) {
      console.log(`Error at fetching review comment ${e}`);
    }
  }

  // Fetch reviews for a specific page
  async function loadReviews(page) {
    console.log("Loading");
    setIsLoadingAllReview(true);
    try {
      const response = await findReviewWithProperty(property_id, page);
      setAllReviewComment([
        ...response.reviews,
      ]);
      setCurrentAllReviewPage(page);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoadingAllReview(false);
    }
  }

  const handlePageChange = (event, value) => {
    loadReviews(value); // Update the page number when pagination changes
  };

  function handleCloseAllReview() {
    document.body.style.overflow = "";
  }

  async function fetchTopComments() {
    setIsLoadingReview(true);
    try {
      const reviewComments = await findReviewWithProperty(property_id, 1);
      setReviewComment(reviewComments.reviews);
      setIsLoadingReview(false);
    } catch (e) {
      console.log(`Error at fetching review comment ${e}`);
    }
  }

  async function fetchMonthlyRate() {
    setIsLoadingRate(true);
    try {
      const monthRate = await getMonthlyRateByProperty(property_id);
      console.log(monthRate["3"]);
      let count =
        monthRate["1"] +
        monthRate["2"] +
        monthRate["3"] +
        monthRate["4"] +
        monthRate["5"];
      let avarage =
        (0.0 +
          monthRate["1"] +
          monthRate["2"] * 2 +
          monthRate["3"] * 3 +
          monthRate["4"] * 4 +
          monthRate["5"] * 5) /
        count;
      avarage = parseFloat(avarage.toFixed(1));
      console.log(count, avarage);

      setMonthlyRate({
        review_count: count,
        avarage: avarage,
      });
      console.log(monthRate);
      setIsLoadingRate(false);
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
          {!isLoadingRate ? <b>{monthlyRate.avarage}</b> : <Skeleton />}
        </div>
        <div className="rate">
          {!isLoadingRate ? (
            <b>{monthlyRate.avarage > 3 ? "NICE" : "AWFUL"}</b>
          ) : (
            <Skeleton />
          )}
        </div>
        <div className="numberOfReviews">
          {!isLoadingRate ? (
            <b>{monthlyRate.review_count} Reviews</b>
          ) : (
            <Skeleton />
          )}
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
        <button
          className="left-button"
          onClick={(e) => {
            e.preventDefault();
            scrollLeft();
          }}
        >
          &#8592;
        </button>
        <div className="review-comment" ref={reviewCommentRef}>
          {!isLoadingReview
            ? reviewComment.map((review, index) => (
                <ReviewComment key={index} review={review} />
              ))
            : Array(10)
                .fill(null)
                .map((_, index) => <ReviewComment key={index} />)}
        </div>
        <button
          className="right-button"
          onClick={(e) => {
            e.preventDefault();
            scrollRight();
          }}
        >
          &#8594;
        </button>
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
              e.stopPropagation();
              e.preventDefault();
              
              setAllReviewPopUp(false);
              handleCloseAllReview();
            }}
          ></div>

          <div
            className="all-reviews"
            onClick={(e) => e.stopPropagation()}
            ref={allReviewRef}
          >
            <div className="allReviews-header">
              <div className="allReviews-topSection">
                <h4>{"Toàn bộ đánh giá"}</h4>
                <FaTimes
                  style={{ fontSize: "24px", cursor: "pointer", color: "black" }}
                />
              </div>
              <div className="allReviews-filter-sort">
                <div className="allReviews-filter">
                  <h5>{"Lọc"}</h5>
                  <div className="filter-dropdown">
                    
                    <div>
                      <label>{"Loại"}</label>
                      <select>
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>

                    <div>
                      <label>{"Điểm"}</label>
                      <select>
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>
                    
                  </div>
                </div>

                <div className="allReviews-sorting">
                  <h5>{"Sắp xếp"}</h5>
                  <div className="sorting-dropdown">
                    <div>
                      <label>{"Điểm"}</label>
                      <select>
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
                
              
            </div>
            <div className="allReviews-content">
              {!isLoadingAllReview ? (allReviewComment.map((review, index) => (
                <ReviewDetail key={index} review={review} />))) :
                Array(10)
                  .fill(null)
                  .map((_, index) => <ReviewDetail key={index} />)
              }
            </div>
            
            <div className="review-pagination">
              <Pagination count={100}
                          size="large"
                          
                          sx={{
                            width: '80%',
                            '& ul': {
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between', // Space out buttons
                            },
                            '& .MuiPaginationItem-root': {
                              flexGrow: 1, // Make each button stretch equally
                              textAlign: 'center',
                            },
                          }}

                          onChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
      <div className="writeReview">
        
      </div>
    </div>
  );
};

export default PropertyReview;
