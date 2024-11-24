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
            <aside className="filter-section">
              <h3>Filter by:</h3>
              <div className="filter-group">
                <label>
                  <input type="checkbox" /> Hotels
                </label>
                <label>
                  <input type="checkbox" /> Apartments
                </label>
              </div>
              <div className="filter-group">
                <h4>Your budget (per night)</h4>
                <input type="range" min="0" max="4000000" step="100000" />
              </div>
              <div className="filter-group">
                <h4>Deals</h4>
                <label>
                  <input type="checkbox" /> All deals
                </label>
              </div>
              <div className="filter-group">
                <h4>Popular filters</h4>
                <label>
                  <input type="checkbox" /> Superb: 9+
                </label>
                <label>
                  <input type="checkbox" /> Free cancellation
                </label>
              </div>
            </aside>
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
