import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./propertyList.css";
import { Navigation, Pagination } from 'swiper/modules';

const PropertyList = ({ propertyType }) => {
  const images = [
    {
      type: "Hotel",
      image: "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777551/SG90ZWxfZWZnZ3Z0/drilldown"
    },
    {
      type: "Apartment",
      image: "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777512/QXBhcnRtZW50X3BkcmczbQ==/drilldown"
    },
    {
      type: "Hostel",
      image: "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777512/SG9zdGVsX2ZlZ2N4cA==/drilldown"
    },
    {
      type: "Resort",
      image: "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777513/UmVzb3J0X2ZzcGdzag==/drilldown"
    },
    {
      type: "Homestay",
      image: "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777846/Ul96OGx3dXc=/drilldown"
    }
  ];

  return (
    <div className='pList'>
      <Swiper
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang
        modules={[Navigation, Pagination]} // Thêm các module vào đây
      >
        {propertyType && propertyType.map((type, index) => {
          // Tìm hình ảnh trùng khớp với type
          const matchedImage = images.find(image => image.type === type);
          console.log(matchedImage);
          
          return (
            <SwiperSlide key={index}>
              <div className='pListItem'>
                <div className='pListImg'>
                  {matchedImage ? (
                    <img src={matchedImage.image} alt={type} />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </div>
                <div className='pListTitles'>
                  <h1>{type}</h1>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PropertyList;
