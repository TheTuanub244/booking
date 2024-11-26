import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyTable from "../../../component/PropertyTable/PropertyTable";
import PropertySection from "../../../component/PropertyCardSection/PropertyCardSection";
import { getAllProperty } from "../../../../../api/propertyAPI";
import "./PropertyManageList.css";

const PropertyManageList = () => {
  const [viewMode, setViewMode] = useState("cards"); 
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperty();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  console.log(properties);
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="propertyManageList">
      <div className="propertyManageListTitle">
        Property Management
        <Link to="new" className="link">
          Add New
        </Link>
      </div>

      <div className="viewBy">
        <label htmlFor="viewModeSelect">View By: </label>
        <select
          id="viewModeSelect"
          value={viewMode}
          onChange={handleViewChange}
          className="viewSelect"
        >
          <option value="cards">Cards</option>
          <option value="table">Table</option>
        </select>
      </div>

      <div className="propertyContent">
        {loading ? (
          <p>Loading...</p>
        ) : viewMode === "cards" ? (
          <PropertySection properties={properties} />
        ) : (
          <PropertyTable properties={properties} />
        )}
      </div>
    </div>
  );
};

export default PropertyManageList;
