import React from 'react';
import './featuredProperties.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

function FeaturedProperties() {
  const hotelList = [
    {
      id: 1,
      name: 'Mandarin Boutique Hotel',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      location: 'Ho Chi Minh City, VietNam',
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 2,
      name: 'Mandarin Boutique Hotel',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      location: 'Ho Chi Minh City, VietNam',
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 3,
      name: 'Mandarin Boutique Hotel',
      location: 'Ho Chi Minh City, VietNam',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 4,
      name: 'Mandarin Boutique Hotel',
      location: 'Ho Chi Minh City, VietNam',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 5,
      name: 'Mandarin Boutique Hotel',
      location: 'Ho Chi Minh City, VietNam',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 6,
      name: 'Mandarin Boutique Hotel',
      location: 'Ho Chi Minh City, VietNam',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },
    {
      id: 7,
      name: 'Mandarin Boutique Hotel',
      location: 'Ho Chi Minh City, VietNam',
      image:"https://cf.bstatic.com/xdata/images/hotel/square240/594604395.jpg?k=f559cc64f6df6e5bf47a2cd6d34d8cdb844a56c9d1a028b93b912c8cb3bf0f74&o=",
      star: '8.8',
      numberReviews: '3,250',
      price: '3,506,999'
    },

  ]
  return (
    <div className='fp'>
      <Swiper
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang
        modules={[Navigation, Pagination]} // Thêm các module vào đâyx
      >
        {hotelList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='fpItem'>
              <div className='fpItemImg'>
                <img src={item.image} alt="" className='fpImg' />
              </div>
              <div className='fpItemContent'>
                <h3 className='fpName'>{item.name}</h3>
                <div className='fpCity'>{item.location}</div>
                <div className='fpRating'>
                  <div className='star'>{item.star}</div>
                  <span>Excellent - {item.numberReviews} reviews</span>
                </div>
                <div className='fpPrice'>
                  <span>Starting from</span>
                  <div className='price'>VND {item.price}</div>
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