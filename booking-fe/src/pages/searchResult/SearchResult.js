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
  const limit = 4;

  const [properties, setProperties] = useState();
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    setIsLoading(true);
    if (location.state?.option) {
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
          const paginatedProperties = sortedProperties.slice(
            currentPage - 1,
            currentPage - 1 + limit,
          );
          console.log();
          
          const totalPages = Math.ceil(sortedProperties.length / limit);
          setTotalPages(totalPages);
          console.log(paginatedProperties);
          
          setProperties(paginatedProperties);
        } else {
          setNotFound(true);
        }
      };
      const handleGetAllProperty = async () => {
        const respone = await getDistinctPlace();
        setAllPlace(respone);
      };
      handleGetAllProperty();
      searchRoom();
    }
  }, [location.state?.option, currentPage]);
  const [filters, setFilters] = useState({
    propertyType: ["Hotels", "Apartments"],
    budget: [100000, 700000],
    rating: [],
  });

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

  const handleBudgetChange = (e) => {
    console.log(e.target.value);
    
    const value = e.target.value.split(",");
    setFilters({ ...filters, budget: value.map(Number) });
  };

  const handlePropertyTypeChange = (type) => {
    const updatedTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter((t) => t !== type)
      : [...filters.propertyType, type];
    setFilters({ ...filters, propertyType: updatedTypes });
  };

  const handleRatingChange = (rating) => {
    const updatedRatings = filters.rating.includes(rating)
      ? filters.rating.filter((r) => r !== rating)
      : [...filters.rating, rating];
    setFilters({ ...filters, rating: updatedRatings });
  };
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
          <div key={type.name} className="property-type">
            <label>
              <input
                type="checkbox"
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
        <input
          type="range"
          min="100000"
          max="20000000"
          value={filters.budget.join(",")}
          step="10000"
          onChange={handleBudgetChange}
        />
        <p>
          VND {filters.budget[0]} - VND {filters.budget[1]}
        </p>
      </div>

      <div className="filter-section">
        <h4>Property Rating</h4>
        {ratings.map((rating) => (
          <div key={rating.name}>
            <label>
              <input
                type="checkbox"
                checked={filters.rating.includes(rating.name)}
                onChange={() => handleRatingChange(rating.name)}
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
