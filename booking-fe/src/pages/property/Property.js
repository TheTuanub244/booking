import PropertyDetail from "../../componets/propertyDetail/propertyDetail";
import Header from "../../componets/header/Header"
import React from "react";
import './Property.css'
import Navbar from "../../componets/navbar/Navbar";

function Property(){

    return(
        <div className="Property">
            <Navbar/>
            <Header />
            <PropertyDetail />
        </div>
    )
    
}

export default Property;