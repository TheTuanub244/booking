import React, { useEffect } from 'react';
import Navbar from '../../componets/navbar/Navbar';
import Header from '../../componets/header/Header';
import './home.css'; 
import PropertyList from '../../componets/propertyList/PropertyList';
import FeaturedProperties from '../../componets/featuredProperties/FeaturedProperties';
import Footer from '../../componets/footer/Footer';

import EasyTrip from '../../componets/easyTrip/EasyTrip';
import TredingDestination from '../../componets/tredingDestination/TredingDestination';
import  RecentRearch  from '../../componets/recentResearch/RecentRearch';


import { getPropertyByRates } from '../../api/propertyAPI';

function Home() {
  const propertyByRates = async () => {
    const response = await getPropertyByRates();
    return response;
  }
  useEffect(() => {
    propertyByRates()
  }, [])
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
        <RecentRearch />
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