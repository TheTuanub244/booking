import React from "react";
import "./reviewComment.css";

const ReviewComment = () => {
  return (
    <div className="reviewComment-container">
      <div className="reviewer-profile">
        <div className="reviewer-image">
          <div className="img"></div>
        </div>
        <div className="reviewer-name-nationality">
          <div className="reviewer-name"></div>
          <div className="reviewer-nationality"></div>
        </div>
      </div>
      <div className="reviewer-comment"></div>
    </div>
  );
};

export default ReviewComment;
