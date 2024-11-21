import React, { useState, useEffect } from "react";
import "./PropertyManageList.css";
import { Link } from "react-router-dom";
import PropertyTable from "../../../component/PropertyTable/PropertyTable";
import PropertySection from "../../../component/PropertyCardSection/PropertyCardSection";
import { getAllProperty } from "../../../../../api/propertyAPI"; 

const PropertyManageList = () => {
  const [viewMode, setViewMode] = useState("cards"); // Default view mode
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

  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Property Management
        <Link to="/admin/user/new" className="link">
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
          <p>Loading...</p> // Loading state indicator
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
