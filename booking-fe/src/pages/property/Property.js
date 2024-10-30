import PropertyDetail from "../../componets/propertyDetail/propertyDetail";
import Header from "../../componets/header/Header"
import React from "react";
import './Property.css'

function Property(){

    return(
        <div className="Property">
            <Header />
            <PropertyDetail />
        </div>
    )
    
}

export default Property;