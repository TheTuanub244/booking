import React, { useState, useEffect } from "react";
import './writeReview.css';
import { createReview } from "../../../api/reviewAPI";
import SuccessfullyDisplay from "../../successfullyDisplay/successfullyDisplay";

function WriteReview({rooms}){
    // Define TYPE enum inside the function
  const TYPE = {
    STAFF: 'Staff',
    FACILITIES: 'Facilities',
    CLEANLINESS: 'Cleanliness',
    COMFORT: 'Comfort',
    VALUE_OF_MONEY: 'Value of money',
    LOCATION: 'Location',
    FREE_WIFI: 'Free wifi',
  };

  const [userId, setUserId] = useState(null);
  const [roomId, setRoomId] = useState(null); // This will be set based on room selection
  const [rating, setRating] = useState(1); // Default to 1 star
  const [reviewText, setReviewText] = useState('');
  const [reviewType, setReviewType] = useState(TYPE.STAFF); // Default review type
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [succesfullyPopUp, setSuccessfullyPopUp] = useState(false);

  useEffect(() => {
    // Get userId from sessionStorage
    const user = localStorage.getItem('userId');
    console.log(rooms);
    if (user) {
      setUserId(user);
      
    }
    if (rooms && rooms.length > 0) {
        console.log(rooms);
        
      setRoomId(rooms[0].room._id); // Default to first roomId if available
    }

    return () => {
      setIsSubmitting(false);
      setSuccessfullyPopUp(false);
    }
  }, [rooms]);

  const handleTimeoutSuccessfullyDisplay = async () => {
    // Set the state to true
    setSuccessfullyPopUp(true);

    // Wait for 2 seconds (2000 ms) using a Promise and setTimeout
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Set the state to false after 2 seconds
    setSuccessfullyPopUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData = {
      userId,
      roomId,
      rating,
      review_text: reviewText,
      review_type: reviewType,
    };

    await createReview(reviewData);

    console.log('Review submitted:', reviewData);

    await handleTimeoutSuccessfullyDisplay();
    
    setIsSubmitting(false);
    
  };

  return (
    <div className="writeReview-section">
      <h2 className="writeReview-title">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="writeReview-form-group">
          <label className="writeReview-label">Rating:</label>
          <div className="writeReview-rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`writeReview-star ${star <= rating ? 'writeReview-filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="writeReview-form-group">
          <label className="writeReview-label">Room:</label>
          <select
            className="writeReview-select"
            value={roomId}
            onChange={(e) => {
              e.preventDefault();
              setRoomId(e.target.value)}}
          >
            {rooms.map((room) => (
              <option key={room.room._id} value={room.room._id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="writeReview-form-group">
          <label className="writeReview-label">Review Type:</label>
          <select
            className="writeReview-select"
            value={reviewType}
            onChange={(e) => setReviewType(e.target.value)}
          >
            {Object.values(TYPE).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="writeReview-form-group">
          <label className="writeReview-label">Review Text:</label>
          <textarea
            className="writeReview-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>

        <button
          className="writeReview-submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      {succesfullyPopUp && <SuccessfullyDisplay text={"Tạo đánh giá thành công!"} />}
    </div>
  );
}

export default WriteReview;