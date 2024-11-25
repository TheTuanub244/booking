import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./propertyList.css";
import { Navigation, Pagination } from "swiper/modules";

const PropertyList = ({ propertyType }) => {
  const images = [
    {
      type: "Hotel",
      image:
        "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777551/SG90ZWxfZWZnZ3Z0/drilldown",
    },
    {
      type: "Apartment",
      image:
        "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777512/QXBhcnRtZW50X3BkcmczbQ==/drilldown",
    },
    {
      type: "Hostel",
      image:
        "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777512/SG9zdGVsX2ZlZ2N4cA==/drilldown",
    },
    {
      type: "Resort",
      image:
        "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777513/UmVzb3J0X2ZzcGdzag==/drilldown",
    },
    {
      type: "Homestay",
      image:
        "https://res-console.cloudinary.com/du4fzcfok/thumbnails/v1/image/upload/v1730777846/Ul96OGx3dXc=/drilldown",
    },
    {
      type: "Bungalow",
      image: "https://res.cloudinary.com/du4fzcfok/image/upload/v1732513698/R_hvzzw7.jpg"
    },
    {
      type: "Villa",
      image: "https://res.cloudinary.com/du4fzcfok/image/upload/v1732513697/OIP_tdscij.jpg"
    },
    {
      type: "Resort",
      image: "https://res.cloudinary.com/du4fzcfok/image/upload/v1732513697/OIP_tdscij.jpg"
    }
  ];

  return (
    <div className="pList">
      <Swiper
        spaceBetween={15} 
        slidesPerView={4} 
        navigation 
        pagination={{ clickable: true }} 
        modules={[Navigation, Pagination]} 
      >
        {propertyType &&
          propertyType.map((type, index) => {
            // Tìm hình ảnh trùng khớp với type
            const matchedImage = images.find((image) => image.type === type.name);

            return (
              <SwiperSlide key={index}>
                <div className="pListItem">
                  <div className="pListImg">
                    {matchedImage ? (
                      <img src={matchedImage.image} alt={type.name} />
                    ) : (
                      <div>No Image Available</div>
                    )}
                  </div>
                  <div className="pListTitles">
                    <h1>{type.name}</h1>
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
