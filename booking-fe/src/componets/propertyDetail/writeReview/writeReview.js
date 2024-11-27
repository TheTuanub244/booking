import React, { useState } from "react";
import './writeReview.css';

function WriteReview(){
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

  useEffect(() => {
    // Get userId from sessionStorage
    const user = sessionStorage.getItem('userId');
    if (user) {
      setUserId(user);
    }

    // Set roomId if it's passed as a prop or from the URL
    if (rooms && rooms.length > 0) {
      setRoomId(rooms[0].roomId); // Default to first roomId if available
    }
  }, [rooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData = {
      userId,
      roomId,
      rating,
      reviewText,
      reviewType,
    };

    // Replace with your API call to submit review
    console.log('Review submitted:', reviewData);

    // Simulate a delay for submitting
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Review submitted successfully!');
    }, 2000);
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
            onChange={(e) => setRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.roomId} value={room.roomId}>
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
    </div>
  );
}

export default WriteReview;