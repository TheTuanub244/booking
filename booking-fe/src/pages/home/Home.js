import React, { useEffect, useState } from 'react';
import Navbar from '../../componets/navbar/Navbar';
import Header from '../../componets/header/Header';
import './home.css'; 
import PropertyList from '../../componets/propertyList/PropertyList';
import FeaturedProperties from '../../componets/featuredProperties/FeaturedProperties';
import Footer from '../../componets/footer/Footer';

import EasyTrip from '../../componets/easyTrip/EasyTrip';
import TredingDestination from '../../componets/tredingDestination/TredingDestination';
import  RecentRearch  from '../../componets/recentResearch/RecentRearch';


import { getAllProperty, getAllProvince, getAllTypeOfProperties, getDistinctPlace, getPropertyByplace, getPropertyByRates, getPropertyNear } from '../../api/propertyAPI';
import { checkSession, getSessionHistory } from '../../api/sessionAPI';
import LastViewProperties from '../../componets/lastViewProperties/LastViewProperties';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [sessionHistory, setSessionHistory] = useState()
  const [propertyNear, setPropertyNear] = useState()
  const [allPlace, setAllPlace] = useState()
  const [userId, setUserId] = useState()
  const [propertyType, setPropertyType] = useState()
  const navigate = useNavigate()
  const propertyByRates = async () => {
    const response = await getPropertyByRates();
    return response;
  }
  const getPropertyType = async () => {
    const respone = await getAllTypeOfProperties()
    setPropertyType(respone)
  }
  const getHistory = async (userId) => {
    
    const data = await getSessionHistory(userId)
    setSessionHistory(data)
  }
  const handleGetAllProperty = async () => {
    const respone = await getDistinctPlace()
    setAllPlace(respone)
  }
  const getNear = async (lon, lat) => {
    const data = await getPropertyNear(lon, lat)
    
    setPropertyNear(data)    
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getNear(longitude, latitude)
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
    const userId = localStorage.getItem('userId')
    setUserId(userId)
    getPropertyType()
    handleGetAllProperty()
    if(userId){
      getHistory(userId)
    }
  }, [])
 
  return (
    <div>
      <Navbar/>
      <Header places={allPlace} getHistory={getHistory}/>
      <div className='homeContainer'>
        {(userId && sessionHistory ) && <RecentRearch data={sessionHistory.recent_search} getHistory={getHistory}/>}
        {
          (userId && sessionHistory ) && (<>
            <h1 className='homeTitle'>Still interested in these properties?</h1>
            <LastViewProperties data={sessionHistory.lastViewProperties}/>
          </>)
        }
        <h1 className='homeTitle'>Trending destinations</h1>
        <TredingDestination/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList propertyType={propertyType}/>
        <h1 className='homeTitle'>Quick and easy trip planner</h1>
        <EasyTrip propertyNear={propertyNear}/>
        <h1 className='homeTitle' >Home guests love</h1>
        <FeaturedProperties/>
        
        <Footer/>
      </div>
    </div>
  );
}

export default Home;