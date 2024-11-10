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
const createPropertyMarkerIcon = () => {
  return L.divIcon({
    className: "property-marker-container fall-down", // Thêm lớp `fall-down`
    html: ` <div class="property-marker">
                <div class="property-marker-shadow"></div>
                <div class="icon">
                    ${ReactDOMServer.renderToString(<FontAwesomeIcon icon={faLocationDot} style={{ color: "#74C0FC" }} />)}
                </div>
            </div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });
};
const Map = ({ onLocationSelect, initialLocation, disableClick }) => {
  const [properties, setProperties] = useState();
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
          {properties &&
            properties.map((property) => (
              <Marker
                key={property.id}
                position={[
                  property.location.latitude,
                  property.location.longitude,
                ]}
                icon={createPropertyMarkerIcon()} // Smaller marker for other properties
              >
                <div className="property-marker-container">
                  <div className="property-marker-rain-drop"></div>
                  <Popup>{property.name}</Popup>
                </div>
              </Marker>
            ))}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
