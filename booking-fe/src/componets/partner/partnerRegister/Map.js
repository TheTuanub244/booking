// Map.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getAllProperty } from "../../../api/propertyAPI";
import L from "leaflet";
import "./Map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import { getAllRoomWithTotalPrice } from "../../../api/roomAPI";
const createUserMarkerIcon = () => {
  return L.divIcon({
    className: "user-marker-container",
    html: `
            <div class="user-marker-glow"></div>
            <div class="user-marker"></div>
        `,
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [0, -30],
  });
};
const createPropertyMarkerIcon = (totalPriceNight) => {
  return L.divIcon({
    className: "property-marker-container fall-down", // Thêm lớp `fall-down`
    html: ` <div class="property-marker">
                <div class="property-marker-shadow"></div>
                <div class="icon">
                    ${ReactDOMServer.renderToString(<FontAwesomeIcon icon={faLocationDot} style={{ color: "#74C0FC" }} />)}
                </div>
                 <div class="property-price">${totalPriceNight}</div>
            </div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });
};
const Map = ({ onLocationSelect, initialLocation, disableClick, option }) => {
  const userId = localStorage.getItem('userId')
  const getRoomWithPrice = async () => {
    const respone = await getAllRoomWithTotalPrice(option?.check_in, option?.check_out,  option?.capacity, userId)
    console.log(respone);
    
    setProperties(respone)
    
  }
  useEffect(() => {
    getRoomWithPrice()
    
  }, [])
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const [properties, setProperties] = useState([]);
  const getProperties = async () => {
    const respone = await getAllProperty();
    setProperties(respone);
  };
  const [position, setPosition] = useState(null);
  useEffect(() => {
    if (initialLocation && initialLocation.lat && initialLocation.lng) {
      setPosition(initialLocation);
    }
    getProperties();
  }, [initialLocation]);
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (!disableClick) {
          const { lat, lng } = e.latlng;
          setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
          if (onLocationSelect) {
            onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lng) });
          }
        }
      },
    });

    return position ? (
      <Marker position={position} icon={createUserMarkerIcon()}>
        <Popup>Your Property</Popup>
      </Marker>
    ) : null;
  };
  return (
    <>
      {position && (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User's location with larger marker */}
          <LocationMarker />

          {/* Markers for other properties */}
          {properties.length !== 0 &&
            properties.map((property) => (
              property.value && (
                <Marker
                key={property.value.property_id.id}
                position={[
                  property.value.property_id.location.latitude,
                  property.value.property_id.location.longitude,
                ]}
                icon={createPropertyMarkerIcon(formatCurrency(property.totalPriceNight))} // Smaller marker for other properties
                eventHandlers={{
                  mouseover: (e) => {
                    const popup = L.popup()
                      .setLatLng(e.latlng)
                      .setContent(`
                        <div class="popup-content">
                          <div class="popup-left">
                            <img src="${property.value.property_id.images[0]}" alt="Property Image" class="popup-image"/>
                          </div>
                          <div class="popup-right">
                            <h3 class="popup-title">${property.value.property_id.name}</h3>
                            <p class="popup-rate">Rating: ${property.value.property_id.rate || "N/A"}</p>
                            <p class="popup-price">${formatCurrency(property.value.totalPriceNight)}</p>
                            <p class="popup-room-type">${property.value.name}</p>
                          </div>
                        </div>
                      `)
                      .openOn(e.target._map);
                  },
                  mouseout: (e) => {
                    e.target._map.closePopup();
                  },
                }}
             >
                <div className="property-marker-container">
                  <div className="property-marker-rain-drop"></div>
                </div>
              </Marker>
              )
            ))}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
