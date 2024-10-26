import React from 'react';
import Navbar from '../../componets/navbar/Navbar';
import Header from '../../componets/header/Header';
import Featured from '../../componets/featured/Featured';
import './home.css'; 
import PropertyList from '../../componets/propertyList/PropertyList';
import FeaturedProperties from '../../componets/featuredProperties/FeaturedProperties';
import Footer from '../../componets/footer/Footer';

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
        <Featured/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Home guests love</h1>
        <FeaturedProperties/>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;