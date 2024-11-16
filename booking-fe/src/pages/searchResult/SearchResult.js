import { useEffect, useState } from "react";
import ResultItem from "../../componets/searchResult/ResultItem";
import "./SearchResult.css"
import Navbar from "../../componets/navbar/Navbar";
import { getDistinctPlace } from "../../api/propertyAPI";
import Header from "../../componets/header/Header";
import { findAvailableRoomWithSearch } from "../../api/roomAPI";
import PropertyMap from "../../componets/partner/partnerRegister/Map";
const SearchResult = () => {
    const option = JSON.parse(localStorage.getItem('option'))
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    const [allPlace, setAllPlace] = useState();

    const [properties, setProperties] = useState();
    useEffect(() => {
        const searchRoom = async () => {
            const response = await findAvailableRoomWithSearch(option);
            if (response) {
                const uniqueProperties = Array.from(
                    response.reduce((map, item) => {
                        const propertyId = item.value.property_id._id;
                        item.value.totalPriceNight = item.totalPriceNight;
    
                        if (!map.has(propertyId)) {
                            map.set(propertyId, item.value); 
                        } else {
                            const existingItem = map.get(propertyId);
                            if (item.value.property_id.rate > existingItem.property_id.rate) {
                                map.set(propertyId, item.value);
                            }
                        }
                        return map;
                    }, new Map()).values()
                );
    
                const sortedProperties = uniqueProperties.sort((a, b) => b.property_id.rate - a.property_id.rate);
                
                setProperties(sortedProperties);
            }
        };
    
        searchRoom();
    }, []);
    
    

    return (
        <>
        <Navbar/>
        <Header promptData={option}/>
        {
            properties ? (
                <div className="search-result-container">
            <div className="search-container-left">
            <div className="map-container">
                <PropertyMap initialLocation={{lat: latitude, lng: longitude}}/>
            </div>
            <aside className="filter-section">
                    <h3>Filter by:</h3>
                    <div className="filter-group">
                        <label><input type="checkbox" /> Hotels</label>
                        <label><input type="checkbox" /> Apartments</label>
                    </div>
                    <div className="filter-group">
                        <h4>Your budget (per night)</h4>
                        <input type="range" min="0" max="4000000" step="100000" />
                    </div>
                    <div className="filter-group">
                        <h4>Deals</h4>
                        <label><input type="checkbox" /> All deals</label>
                    </div>
                    <div className="filter-group">
                        <h4>Popular filters</h4>
                        <label><input type="checkbox" /> Superb: 9+</label>
                        <label><input type="checkbox" /> Free cancellation</label>
                    </div>
                </aside>
            </div>
            <div className="main-content">
                <div className="header-search">
                    <h1>{option.place}: {properties.length} properties found</h1>
                </div>
                <button className="sort-button">Sort by: Top picks for families</button>

                <div className="results-list">
                    {properties.map((property, index) => (
                        <ResultItem key={property.property_id._id} property={property} index={index}/>
                    ))}
                </div>
            </div>
        </div>
            ) : (
                <h1>Loading...</h1>
            )
        }
        </>
    );
}
export default SearchResult