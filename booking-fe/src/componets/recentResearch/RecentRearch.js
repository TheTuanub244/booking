import React, { useEffect, useState } from "react";
import "./recentResearch.css";
import { findAvailableRoomWithSearch } from "../../api/roomAPI";
import { useNavigate } from "react-router-dom";

function RecentRearch({ data, getHistory }) {
  const navigate = useNavigate()
  const handleClick = async (item) => {
    const userId = localStorage.getItem("userId");
    item.place = item.province
    item.userId = userId
    localStorage.setItem('option', JSON.stringify(item))
    navigate('/searchResult')
    if (userId) {
      item.userId = userId;
      getHistory(userId);
    }
  };
  return (
    <div className="recent-research">
      <div className="title">
        <h3>Your recent searches</h3>
      </div>

      <div className="list-recent-research">
        {data.length === 0 || !data ? (
          <h1>You have not search anything</h1>
        ) : (
          data.map((index) => (
            <div className="item" onClick={() => handleClick(index)}>
              <div className="item-img">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/64x64/806042.jpg?k=322608c1687c823ea5d52b4e2ed4a0eaae14b6ef3c9dd6aaedfb4244de91ce3f&o="
                  alt=""
                />
              </div>

              <div className="item-content">
                <div className="card-title">{index.province}</div>
                <div className="card-subtitle">
                  {new Date(index.check_in).getDate() +
                    " " +
                    new Date(index.check_in).toLocaleDateString("en", {
                      month: "short",
                    })}
                  –
                  {new Date(index.check_out).getDate() +
                    " " +
                    new Date(index.check_out).toLocaleDateString("en", {
                      month: "short",
                    }) +
                    ", "}
                  {index.capacity.adults + index.capacity.childs.count > 1
                    ? `${index.capacity.adults + index.capacity.childs.count} peoples, `
                    : `${index.capacity.adults + index.capacity.childs.count} people, `}
                  {index.capacity.room > 1
                    ? `${index.capacity.room} rooms`
                    : `${index.capacity.room} room`}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentRearch;
