import React,{useEffect, useState} from 'react';
import './LastViewProperties.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';




function LastViewProperties({data}) {
    
 const navigate = useNavigate()
  useEffect(() => {
    console.log(data);
    
  }, [data])
  return (
    <div className='fp'>
      <Swiper
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang
        modules={[Navigation, Pagination]} // Thêm các module vào đâyx
      >
        {data.map((item) => (
            
            
          <SwiperSlide key={item._id}>
            <div className='fpItem' onClick={() => navigate(`/property/${item._id}`)}>
              <div className='fpItemImg'>
                <img src={item.images[0]} alt="" className='fpImg' />
              </div>
              <div className='fpItemContent'>
                <h3 className='fpName'>{item.name}</h3>
                <div className='fpCity'>{item.address.province}, {item.address.district}, {item.address.ward}, {item.address.street}</div>
                <div className='fpRating'>
                  <div className='star'>{item.rate}</div>
                  <span>Excellent - {item.numberReviews} reviews</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LastViewProperties;