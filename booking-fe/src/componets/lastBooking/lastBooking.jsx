import React, { useEffect, useState } from "react";
import "./lastBooking.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function LastBooking({ data }) {
  const navigate = useNavigate();
  const items = data;
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="fp">
      <Swiper
        spaceBetween={15} 
        slidesPerView={4} 
        navigation={items.length > 4}
        pagination={{ clickable: true }} 
        modules={[Navigation, Pagination]} 
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              className="fpItem"
              onClick={() => navigate(`/property/${item._id}`)}
            >
              <div className="fpItemImg">
                <img src={item.property.images[0]} alt="" className="fpImg" />
              </div>
              <div className="fpItemContent">
                <h3 className="fpName">{item.property.name}</h3>
                <div className="fpCity">
                  {item.property.address.street}, {item.property.address.ward},{" "}
                  {item.property.address.district}, {item.property.address.province}
                </div>
                <div className="fpRating">
                  <div className="star">{item.property.rate}</div>
                  <span>Excellent - {item.property.numberReviews} reviews</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LastBooking;