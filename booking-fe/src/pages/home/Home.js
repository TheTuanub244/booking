import React, { useEffect, useState } from "react";
import Navbar from "../../componets/navbar/Navbar";
import Header from "../../componets/header/Header";
import "./home.css";
import PropertyList from "../../componets/propertyList/PropertyList";
import FeaturedProperties from "../../componets/featuredProperties/FeaturedProperties";
import Footer from "../../componets/footer/Footer";

import EasyTrip from "../../componets/easyTrip/EasyTrip";
import TredingDestination from "../../componets/tredingDestination/TredingDestination";
import RecentRearch from "../../componets/recentResearch/RecentRearch";

import {
  getAllProperty,
  getAllProvince,
  getAllTypeOfProperties,
  getDistinctPlace,
  getPropertyByplace,
  getPropertyByRates,
  getPropertyNear,
} from "../../api/propertyAPI";
import { checkSession, getSessionHistory } from "../../api/sessionAPI";
import LastViewProperties from "../../componets/lastViewProperties/LastViewProperties";
import { useNavigate } from "react-router-dom";
import { findUnfinishedBooking } from "../../api/bookingAPI";
import BookingPopup from "../../componets/bookingPopup/BookingPopup";
import { getAllUser } from "../../api/userAPI";
import axios from "axios";

function Home() {
  const [sessionHistory, setSessionHistory] = useState();
  const [propertyNear, setPropertyNear] = useState();
  const [allPlace, setAllPlace] = useState();
  const [userId, setUserId] = useState();
  const [propertyType, setPropertyType] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const [promptData, setPromptData] = useState();
  const [unfinishedBooking, setUnfinishedBooking] = useState([]);
  const navigate = useNavigate();
  const propertyByRates = async () => {
    const response = await getPropertyByRates();
    return response;
  };
  const getPropertyType = async () => {
    const respone = await getAllTypeOfProperties();
    setPropertyType(respone);
  };
  const getHistory = async (userId) => {
    const data = await getSessionHistory(userId);
    setSessionHistory(data);
  };
  const handleGetAllProperty = async () => {
    const respone = await getDistinctPlace();
    setAllPlace(respone);
  };
  const getNear = async (lon, lat) => {
    const data = await getPropertyNear(lon, lat);

    setPropertyNear(data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);

        getNear(longitude, latitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
    );

    const userId = localStorage.getItem("userId");
    setUserId(userId);
    getPropertyType();
    const handleFindUnfinishedBooking = async (userId) => {
      const respone = await findUnfinishedBooking(userId);
      if (respone) {
        setUnfinishedBooking(respone);
      }
    };

    handleGetAllProperty();
    if (userId) {
      getHistory(userId);
      handleFindUnfinishedBooking(userId);
    }
    const test = async () => {
      const get = await axios.get('http://localhost:8000/session/refreshAccessToken', {
        withCredentials: true,
      })
      console.log(get);
      
    }
    test()
  }, []);

  return (
    <div>
      <Navbar />
      <Header places={allPlace} />
      <div className="homeContainer">
        {userId && sessionHistory && (
          <RecentRearch
            data={sessionHistory.recent_search}
            getHistory={getHistory}
          />
        )}
        {userId && sessionHistory && (
          <>
            <h1 className="homeTitle">Still interested in these properties?</h1>
            <LastViewProperties data={sessionHistory.lastViewProperties} />
          </>
        )}
        <h1 className="homeTitle">Trending destinations</h1>
        <TredingDestination />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList propertyType={propertyType} />
        <h1 className="homeTitle">Quick and easy trip planner</h1>
        {propertyNear && <EasyTrip propertyNear={propertyNear} />}
        <h1
          className="homeTitle"
          style={{
            marginTop: "100px",
          }}
        >
          Home guests love
        </h1>
        <FeaturedProperties />

        <Footer />
      </div>
      {unfinishedBooking && unfinishedBooking.length !== 0 && (
        <BookingPopup
          booking={unfinishedBooking[0]}
          setUnfinishedBooking={setUnfinishedBooking}
        />
      )}
    </div>
  );
}

export default Home;
