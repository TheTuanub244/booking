import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach, faPersonHiking, faCity } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

import './easyTrip.css';
import { useNavigate } from 'react-router-dom';

function EasyTrip({propertyNear}) {
  const typeTrip = [
    {
      id: 1,
      icon: faUmbrellaBeach,
      title: 'Beach'
    },
    {
      id: 2,
      icon: faPersonHiking,
      title: 'Ourdoors'
    },
    {
      id: 3,
      icon: faCity,
      title: 'City'
    },
    {
      id: 4,
      icon: faHeart,
      title: 'Romance'
    }

  ];

  const locationList = [
    {
      id: 1,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 2,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 3,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 4,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 5,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 6,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 7,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 8,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 9,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 10,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 11,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=",
      name: 'Hai Phong',
      distance: '88 km away',
      typeTripId: 1
    },
    {
      id: 12,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 13,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 14,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 15,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 16,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 17,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 18,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 19,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 20,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 21,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 22,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },
    {
      id: 23,
      image: "https://cf.bstatic.com/xdata/images/xphoto/300x240/140009642.jpg?k=3693028a6e4723626d387e249096500276af3f45c9795f94d55cf753dc838926&o=",
      name: "Ninh Binh",
      distance: "87 km away",
      typeTripId: 2
    },


  ]

  const handleClick = (id) => {
    setType(id);
  }

  const [type, setType] = useState(1);

  const [filteredLocationList, setFilteredLocationList] = useState(locationList.filter(item => item.typeTripId === 1));
  useEffect(() => {
    const filteredList = locationList.filter(item => item.typeTripId === type);
    setFilteredLocationList(filteredList);
  },[type]);
  const navigate = useNavigate()
  const handleNavigate = async (id) => {
    navigate(`/property/${id}`)
  }
  return (
    <div className='easyTrip'>
      <div className='typeTripList'>
        {typeTrip.map((item) => (
          <div className={type === item.id ? 'typeTripItem active' : 'typeTripItem'} key={item.id} onClick={() => handleClick(item.id)}>
            <FontAwesomeIcon icon={item.icon} className='icon' />
            <span>{item.title}</span>
          </div>
        ))}

      </div>

      <div className='locationList'>
      <Swiper
        className='swiper'
        spaceBetween={15} // Khoảng cách giữa các slide
        slidesPerView={4} // Số slide hiển thị một lúc
        navigation // Thêm điều khiển điều hướng
        pagination={{ clickable: true }} // Thêm phân trang 
        modules={[Navigation, Pagination]} // Thêm các module vào đâyx
      >
        {
          propertyNear && (
            propertyNear.map((item) => {
              
              return (
                <SwiperSlide className='swiperSlide' key={item.property._id} onClick={() => handleNavigate(item.property._id)}>
                <div className='locationItem' >
                  <div className='locationItemImg'>
                    <img src={item.property.images[0]} alt='' />
                  </div>
      
                  <div className='locationItemTitle'>
                    <h3>{item.property.name}</h3>
                    <div>{item.distance} km away from you</div>
                  </div>
                </div>
                </SwiperSlide>
              )
            })
          )
        }
        </Swiper>
      </div>
    </div>
  );
}

export default EasyTrip;