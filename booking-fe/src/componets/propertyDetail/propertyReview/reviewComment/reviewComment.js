import React from "react";
import "./reviewComment.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import default styles for Skeleton

const ReviewComment = ({ user, review }) => {
  const placeholderImage = "/mnt/data/A_circular_placeholder_image_for_a_user_profile._T.png";
  return (
    <div className="reviewComment-container">
      <div className="reviewer-profile">
        <div className="reviewer-image">
          <div className="img">
            <img src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=" alt="User Profile" class="profile-image" />
          </div>
        </div>
        <div className="reviewer-name-nationality">
          <div className="reviewer-name">
            <p>{user?.userName || <Skeleton width="100%" />}</p>
          </div>
          <div className="reviewer-nationality">
            <p>{user?.address?.province || <Skeleton width="100%" />}</p>
          </div>
        </div>
      </div>
      <div className="reviewer-comment">
        <p>{review?.review_text || <Skeleton count={3} />}</p>
      </div>
    </div>
  );
};

export default ReviewComment;
