import React from 'react'
import './PropertyCard.css'
const PropertyCard = ({ property }) => {
    return (
      <div className="property-card">
        <div className="property-card-header">
          <h3 className="property-name">{property.name}</h3>
          <span className="property-type">{property.property_type}</span>
        </div>
        <div className="property-address">
          <p>
            {property.address.street}, {property.address.ward},{" "}
            {property.address.district}, {property.address.province}
          </p>
        </div>
        <div className="property-rating">
          <span className="rating-star">⭐ {property.rate}</span>
        </div>
      </div>
    );
  };

export default PropertyCard
