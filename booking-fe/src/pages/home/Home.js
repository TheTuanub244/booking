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


import { getPropertyByplace, getPropertyByRates, getPropertyNear } from '../../api/propertyAPI';
import { checkSession, getSessionHistory } from '../../api/sessionAPI';
import LastViewProperties from '../../componets/lastViewProperties/LastViewProperties';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [sessionHistory, setSessionHistory] = useState()
  const [propertynear, setPropertyNear] = useState()
  const [userId, setUserId] = useState()
  const navigate = useNavigate()
  const propertyByRates = async () => {
    const response = await getPropertyByRates();
    return response;
  }
  const getHistory = async (userId) => {
    
    const data = await getSessionHistory(userId)
    setSessionHistory(data)
  }
  const checkAccessToken = async (userId, accessToken) => {
    
    const respone = await checkSession(userId, accessToken)
    if(typeof respone === "string"){
      navigate('/login')
    }else {
      localStorage.setItem('accessToken', respone)
      getHistory(userId)
    }
    
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
    if(userId){
      const accessToken = localStorage.getItem('accessToken')
      checkAccessToken(userId, accessToken)
    }
  }, [])
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
        {(userId && sessionHistory ) && <RecentRearch data={sessionHistory.recent_search}/>}
        {
          (userId && sessionHistory ) && (<>
            <h1 className='homeTitle'>Still interested in these properties?</h1>
            <LastViewProperties data={sessionHistory.lastViewProperties}/>
          </>)
        }
        <h1 className='homeTitle'>Trending destinations</h1>
        <TredingDestination/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Quick and easy trip planner</h1>
        <EasyTrip/>
        <h1 className='homeTitle'>Home guests love</h1>
        <FeaturedProperties/>
        
        <Footer/>
      </div>
    </div>
  );
}

export default Home;