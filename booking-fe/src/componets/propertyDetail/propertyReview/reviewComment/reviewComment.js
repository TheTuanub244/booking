import React from "react";
import "./reviewComment.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import default styles for Skeleton

const ReviewComment = ({ user, review }) => {
  return (
    <div className="reviewComment-container">
      <div className="reviewer-profile">
        <div className="reviewer-image">
          <div className="img"></div>
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
        <p>{review?.text || <Skeleton count={3} />}</p>
      </div>
    </div>
  );
};

export default ReviewComment;
