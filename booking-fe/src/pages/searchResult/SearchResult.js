import { useEffect, useMemo, useState } from "react";
import ResultItem from "../../componets/searchResult/ResultItem";
import "./SearchResult.css";
import Navbar from "../../componets/navbar/Navbar";
import { getDistinctPlace } from "../../api/propertyAPI";
import Header from "../../componets/header/Header";
import { findAvailableRoomWithSearch } from "../../api/roomAPI";
import PropertyMap from "../../componets/partner/partnerRegister/Map";
import Loading from "../../componets/loading/Loading";
import { getSessionHistory } from "../../api/sessionAPI";
import { useLocation, useSearchParams } from "react-router-dom";
import NotFound from "../../componets/searchResult/NotFound";
import { Range } from "react-range";
const SearchResult = () => {
  const location = useLocation();

  // const option = JSON.parse(localStorage.getItem('option'))
  const queryString = location.search;

  const params = new URLSearchParams(queryString);

  useEffect(() => {
    console.log(params.get("place"));
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allPlace, setAllPlace] = useState();
  const option = location.state?.option;
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const longitude = location.state?.longitude;
  const latitude = location.state?.latitude;
  const [showFullMap, setShowFullMap] = useState(false);
  const [totalProperties, setTotalProperties] = useState();
  const limit = 4;

  const [properties, setProperties] = useState();
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const searchRoom = async () => {
    const response = await findAvailableRoomWithSearch(option);

    setIsLoading(false);
    if (response?.length && response) {
      const uniqueProperties = Array.from(
        response
          .reduce((map, item) => {
            const propertyId = item.value.property_id._id;
            item.value.totalPriceNight = item.totalPriceNight;

            if (!map.has(propertyId)) {
              map.set(propertyId, item.value);
            } else {
              const existingItem = map.get(propertyId);
              if (
                item.value.property_id.rate > existingItem.property_id.rate
              ) {
                map.set(propertyId, item.value);
              }
            }
            return map;
          }, new Map())
          .values(),
      );

      const sortedProperties = uniqueProperties.sort(
        (a, b) => b.property_id.rate - a.property_id.rate,
      );
      setTotalProperties(sortedProperties)
      const paginatedProperties = sortedProperties.slice(
        currentPage - 1,
        currentPage - 1 + limit,
      );
      
      const totalPages = Math.ceil(sortedProperties.length / limit);
      setTotalPages(totalPages);
      setProperties(paginatedProperties);
    } else {
      setNotFound(true);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (location.state?.option) {
      
      const handleGetAllProperty = async () => {
        const respone = await getDistinctPlace();
        setAllPlace(respone);
      };
      handleGetAllProperty();
      searchRoom();
    }
  }, [location.state?.option, currentPage]);
  const [filters, setFilters] = useState({
    propertyType: [],
    budget: [],
    ratingNumber: [],
    ratingName: []
  });
  const [values, setValues] = useState([100000, 20000000]);
  const [filteredProperties, setFileredProperties] = useState([]);
  const handleChange = (newValues) => {
    setValues(newValues);
  };
  const propertyTypes = [
    { name: "Entire homes & apartments", count: 277 },
    { name: "Apartments", count: 265 },
    { name: "Hotels", count: 220 },
    { name: "Homestays", count: 27 },
    { name: "Guest houses", count: 24 },
    { name: "Motels", count: 10 },
    { name: "Villas", count: 10 },
    { name: "Bed and breakfasts", count: 7 },
    { name: "Capsule hotels", count: 2 },
    { name: "Hostels", count: 1 },
    { name: "Love hotels", count: 1 },
  ];

  const ratings = [
    { name: "1 star", count: 28 },
    { name: "2 stars", count: 69 },
    { name: "3 stars", count: 121 },
    { name: "4 stars", count: 117 },
    { name: "5 stars", count: 7 },
  ];
;
  const applyFilter = () => {
    if(!totalProperties) return;
    let filtered = totalProperties.filter((property) =>
      filters.propertyType.length > 0
        ? filters.propertyType.includes(property.property_id.type)
        : true 
    );
    if (filters.ratingNumber.length > 0) {
      
      filtered = filtered.filter(
        (property) => property.property_id.rate >= Number(filters.ratingNumber[0])
      );
    }
    
    filtered = filtered.filter((property) => property.totalPriceNight >= values[0] && property.totalPriceNight <= values[1]);

    setFileredProperties(filtered)
    
    
    const paginatedProperties = filtered.slice(
      currentPage - 1,
      currentPage - 1 + limit,
    );
    console.log(paginatedProperties);
    
    setProperties(paginatedProperties);
    const totalPages = Math.ceil(filtered.length / limit);
    setTotalPages(totalPages);
  }
  const handlePropertyTypeChange = (type) => {
    const updatedTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter((t) => t !== type)
      : [...filters.propertyType, type];
    setFilters({ ...filters, propertyType: updatedTypes });
  };

  const handleRatingChange = (rating, ratingNumber) => {
    if (filters.ratingName[0] === rating) {
      setFilters({ ...filters, ratingName: [], ratingNumber: [] });
    } else {
      
      setFilters({ ...filters, ratingName: [rating], ratingNumber: [ratingNumber] });
    }
  };
  useEffect(() => {
    applyFilter();
  }, [filters, values, currentPage]);
  return (
    <>
      <Navbar />
      <Header places={allPlace} promptData={option} />
      {isLoading ? (
        <Loading />
      ) : notFound ? (
        <NotFound place={location.state?.option.place} />
      ) : properties ? (
        <div className="search-result-container">
          <div className="search-container-left">
            <div className="map-container">
              <button
                className="show-on-map-btn"
                onClick={() => setShowFullMap(true)}
              >
                Show on map
              </button>
              <PropertyMap
                initialLocation={{ lat: latitude, lng: longitude }}
                option={option}
                disableClick={true}
                allowPositionChange={false}
              />
            </div>
            {showFullMap && (
              <div className="popup-map">
                <div
                  className="popup-map-overlay"
                  onClick={() => setShowFullMap(false)}
                ></div>
                <div className="popup-map-content">
                  <button
                    className="close-popup-map"
                    onClick={() => setShowFullMap(false)}
                  >
                    &times;
                  </button>
                  <PropertyMap
                    initialLocation={{ lat: latitude, lng: longitude }}
                    option={option}
                  />
                </div>
              </div>
            )}
             <div className="filter-bar">
      <div className="filter-section">
        <h4>Property Type</h4>
        {propertyTypes.map((type) => (
          <div key={type.name}>
            <label>
              <input
                type="radio"
                checked={filters.propertyType.includes(type.name)}
                onChange={() => handlePropertyTypeChange(type.name)}
              />
              {type.name} ({type.count})
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
      <h4>Your Budget (per night)</h4>
      <Range
        step={100000}
        min={100000}
        max={20000000}
        values={values}
        onChange={(values) => handleChange(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              background: "#ddd",
              position: "relative",
              borderRadius: "3px",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "6px",
                background: "#007bff",
                borderRadius: "3px",
                left: `${((values[0] - 100000) / (20000000 - 100000)) * 100}%`,
                right: `${100 - ((values[1] - 100000) / (20000000 - 100000)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #aaa",
            }}
          >
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      />
      <div className="range-values">
        <span>Min: VND {values[0].toLocaleString()}</span>
        <span>Max: VND {values[1].toLocaleString()}</span>
      </div>
    </div>

      <div className="filter-section">
        <h4>Property Rating</h4>
        {ratings.map((rating, index) => (
          <div key={rating.name}>
            <label>
              <input
                type="radio"
                name="rating"
                value={rating.name}
                checked={filters.ratingName.includes(rating.name)}
                onChange={() => handleRatingChange(rating.name, index + 1)}
              />
              {rating.name} ({rating.count})
            </label>
          </div>
        ))}
      </div>
    </div>
          </div>
          <div className="main-content">
            <div className="header-search">
              <h1>
                {option.place}: {properties.length} properties found
              </h1>
            </div>
            <button className="sort-button">
              Sort by: Top picks for families
            </button>
            <div className="results-list">
              {properties.map((property, index) => (
                <ResultItem
                  key={property.property_id._id}
                  property={property}
                  index={index}
                  option={option}
                />
              ))}
            </div>
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default SearchResult;
