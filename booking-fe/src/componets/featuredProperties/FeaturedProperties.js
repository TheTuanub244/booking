import React,{useEffect, useState} from 'react';
import './featuredProperties.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { getPropertyByRates } from '../../api/propertyAPI';




function FeaturedProperties() {
  const [locationList,setLocationList] = useState([]);

  const propertyByRates = async () => {
    const response = await getPropertyByRates();
    
    setLocationList(response);
  }
  useEffect(() => {
    propertyByRates()
    
  }, [])


  return (
    <div className='fp'>
      <Swiper
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang
        modules={[Navigation, Pagination]} // Thêm các module vào đâyx
      >
        {locationList.map((item) => (
          <SwiperSlide key={item.property._id}>
            <div className='fpItem'>
              <div className='fpItemImg'>
                <img src={item.property.images[0]} alt="" className='fpImg' />
              </div>
              <div className='fpItemContent'>
                <h3 className='fpName'>{item.property.name}</h3>
                <div className='fpCity'>{item.property.address.province}, {item.property.address.district}, {item.property.address.ward}, {item.property.address.street}</div>
                <div className='fpRating'>
                  <div className='star'>{item.property.rate}</div>
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

export default FeaturedProperties;