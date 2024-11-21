import React from "react";
import "./PropertyCardSection.css";
import PropertyCard from "../PropertyCard/PropertyCard";



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
