import React, { useState } from 'react';
import './PropertyManageList.css';
import { Link } from 'react-router-dom';
import PropertyTable from '../../../component/PropertyTable/PropertyTable';
import PropertySection from '../../../component/PropertyCardSection/PropertyCardSection';
import { propertyRows } from '../../../data/propertyData';

const PropertyManageList = () => {
  const [viewMode, setViewMode] = useState('cards'); // Default view mode is "cards"

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
        {viewMode === 'cards' ? (
          <PropertySection properties={propertyRows} />
        ) : (
          <PropertyTable properties={propertyRows} />
        )}
    
      </div>
    </div>
  );
};

export default PropertyManageList;
