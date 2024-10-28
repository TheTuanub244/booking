import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./propertyList.css";
import { Navigation, Pagination } from 'swiper/modules';


const PropertyList = () => {
  const images = [
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
    'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o='
  ];

  return (
    <div className='pList'>

      <Swiper
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang
        modules={[Navigation, Pagination]} // Thêm các module vào đâyx
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='pListItem'>
              <div className='pListImg'>
                <img src={image} alt='' />
              </div>
              <div className='pListTitles'>
                <h1>Hotels</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyList;