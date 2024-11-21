import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ContentLoader from "react-content-loader";
import "./propertyDetail.css";
import ReservationRoom from "./reservationRoom/reservationRoom";
import { getPropertyById } from "../../api/propertyAPI";
import { findRoomByProperty } from "../../api/roomAPI";
import { updateLastProperties } from "../../api/sessionAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlane } from "@fortawesome/free-solid-svg-icons";
import Map from "../partner/partnerRegister/Map";
import PropertyReview from "./propertyReview/propertyReview";

const PropertyDetail = () => {
  const { id } = useParams(); // Extract the id from URL parameters
  const [propertyData, setPropertyData] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [location, setLocation] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const infoPrices = useRef(null);
  const overView = useRef(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };
  const handleUpdateViewProperties = async () => {
    if (userId) {
      await updateLastProperties(userId, id);
    }
  };
  useEffect(() => {
    handleUpdateViewProperties();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const pId = id.toString();
        console.log(`Fetching data for ID: ${id}`);

        try {
          const data = await getPropertyById(pId);

          setPropertyData(data);
          const { street, district, province } = data.address;
          setLocation(`${street}, ${district}, ${province}`);

          const roomDatas = await findRoomByProperty(id);

          setRoomData(roomDatas);

          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        setTimeout(() => {
          setPropertyData({
            name: "Indochine Hotel SG",
            location: "District 1, Ho Chi Minh City, Vietnam",
            description:
              "Located in Ho Chi Minh City, 300 meters from Fine Arts Museum, Indochine Hotel SG provides accommodation with a garden, free private parking, a terrace, and a restaurant.",
            images: [
              "https://via.placeholder.com/300x200", // Image 1
              "https://via.placeholder.com/300x200", // Image 2
              "https://via.placeholder.com/300x200", // Image 3
            ],
          });
          setRoomData([
            {
              id: 1,
              type: "Superior Queen Room",
              description: "1 large double bed",
              guests: 2,
              originalPrice: "VND 4,780,000",
              discountedPrice: "VND 3,830,400",
              features: [
                "22 m²",
                "Air conditioning",
                "Private bathroom",
                "Flat-screen TV",
                "Soundproofing",
                "Free WiFi",
              ],
              choices: ["Very good breakfast included", "Non-refundable"],
            },
            {
              id: 2,
              type: "Deluxe Queen Room",
              description: "1 large double bed",
              guests: 2,
              originalPrice: "VND 5,130,000",
              discountedPrice: "VND 4,104,000",
              features: [
                "24 m²",
                "View",
                "Air conditioning",
                "Private bathroom",
                "Flat-screen TV",
                "Soundproofing",
                "Free WiFi",
              ],
              choices: [
                "Very good breakfast included",
                "Free cancellation before 31 October 2024",
                "No prepayment needed - pay at the property",
              ],
            },
            {
              id: 3,
              type: "Deluxe Queen Room",
              description: "1 large double bed",
              guests: 2,
              originalPrice: "VND 5,643,000",
              discountedPrice: "VND 4,514,400",
              features: [
                "24 m²",
                "Air conditioning",
                "Private bathroom",
                "Flat-screen TV",
                "Soundproofing",
                "Free WiFi",
              ],
              choices: ["Very good breakfast included", "Non-refundable"],
            },
          ]);
          setLoading(false);
        }, 3000); // 3 seconds delay to simulate loading time
      }
    };

    fetchData();
  }, [id]); // Dependency on id

  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber);
    if (tabNumber === 2 && infoPrices.current) {
      infoPrices.current.scrollIntoView({ behavior: "smooth" });
    } else if (tabNumber === 1 && overView.current) {
      overView.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="propertyDetail-container">
      {loading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height={400}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Header */}
          <rect x="10%" y="20" rx="4" ry="4" width="80%" height="30" />
          <rect x="15%" y="60" rx="3" ry="3" width="70%" height="20" />

          {/* Image placeholders */}
          <rect x="10%" y="100" rx="8" ry="8" width="25%" height="180" />
          <rect x="37%" y="100" rx="8" ry="8" width="25%" height="180" />
          <rect x="64%" y="100" rx="8" ry="8" width="25%" height="180" />

          {/* Description */}
          <rect x="10%" y="300" rx="3" ry="3" width="80%" height="10" />
          <rect x="10%" y="320" rx="3" ry="3" width="75%" height="10" />
          <rect x="10%" y="340" rx="3" ry="3" width="60%" height="10" />
        </ContentLoader>
      ) : (
        <>
          <div className="propertyDetail-box">
            <div className="propertyDetail-navigateBar">
              <button
                className={
                  selectedTab === 1
                    ? "navigate-button selectedTab"
                    : "navigate-button"
                }
                onClick={() => handleTabClick(1)}
              >
                Overview
              </button>
              <button
                className={
                  selectedTab === 2
                    ? "navigate-button selectedTab"
                    : "navigate-button"
                }
                onClick={() => handleTabClick(2)}
              >
                Info & prices
              </button>
              <button
                className={
                  selectedTab === 3
                    ? "navigate-button selectedTab"
                    : "navigate-button"
                }
              >
                Facilities
              </button>
              <button
                className={
                  selectedTab === 4
                    ? "navigate-button selectedTab"
                    : "navigate-button"
                }
              >
                Guest review
              </button>
            </div>
            <div className="propertyDetail-header">
              <div className="propertyDetail-name">
                <h1> {propertyData.name} </h1>
                <button
                  onClick={() =>
                    infoPrices.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Reserve
                </button>
              </div>
              <p>
                {" "}
                <FontAwesomeIcon icon={faLocationDot} className="icon" />{" "}
                {location}
              </p>
            </div>
            <div className="mapContainer">
              <div className="container-left-description">
                <div className="propertyDetail-image">
                  {propertyData.images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Image ${index + 1}`}
                      className={index === 0 ? "large" : ""}
                    />
                  ))}

                  {/* Add placeholders if there are fewer than 6 images */}
                  {Array.from({
                    length: Math.max(6 - propertyData.images.length, 0),
                  }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className={`placeholder ${propertyData.images.length === 0 && index === 0 ? "large" : ""}`}
                    />
                  ))}
                </div>

                <div className="propertyDetail-description">
                  <p>{propertyData.description}</p>
                </div>
              </div>
              <div className="mini-map">
                <Map
                  onLocationSelect={() => {}}
                  initialLocation={{
                    lat: propertyData.location.latitude,
                    lng: propertyData.location.longitude,
                  }}
                  disableClick={true}
                />
                <button className="open-map-button" onClick={handleOpenMap}>
                  Open Map
                </button>
              </div>
            </div>
            {isMapOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <button
                    className="circle-close-button"
                    onClick={handleCloseMap}
                  >
                    &times;
                  </button>
                  <Map
                    onLocationSelect={() => {}}
                    initialLocation={{
                      lat: propertyData.location.latitude,
                      lng: propertyData.location.longitude,
                    }}
                    disableClick={true}
                  />
                </div>
              </div>
            )}
          </div>

          {propertyData && (
            <div ref={infoPrices} className="reservation-room">
              <ReservationRoom
                roomData={roomData}
                partnerId={propertyData.owner_id}
              />
            </div>
          )}
          <div className="property-review">
            <PropertyReview property_id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyDetail;
