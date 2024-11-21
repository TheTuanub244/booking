import React from "react";
import "./PropertyCardSection.css";

export const PropertyCard = ({ property }) => {
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

const PropertySection = ({ properties }) => {
    if (!properties.length) {
        return <p>No properties available.</p>;
      }
    return (
    <section className="property-section">
      <h2 className="section-title">Available Properties</h2>
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
