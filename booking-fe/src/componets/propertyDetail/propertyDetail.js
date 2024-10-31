import React, { useEffect, useState, } from "react";
import { useParams } from 'react-router-dom'; 
import ContentLoader from "react-content-loader";
import './propertyDetail.css'
import ReservationRoom from "../reservationRoom/reservationRoom";
import { getPropertyById } from "../../api/propertyAPI";



const PropertyDetail = () => {
    const {id} = useParams(); // Extract the id from URL parameters
    const [propertyData, setPropertyData] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [loading, setLoading] = useState(true);
    
  

    useEffect(() => {
      console.log(id);
      
        const fetchData = async () => {
            if (id) {
                 const pId = id.toString();
                console.log(`Fetching data for ID: ${id}`);
                
                    try{
                    const data = await getPropertyById(pId);

                    setPropertyData(data);
                    setLoading(false);
                    setRoomData( [{ //Temporary until have room data
                        id: 1,
                        type: 'Superior Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 4,780,000',
                        discountedPrice: 'VND 3,830,400',
                        features: [
                          '22 m²',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Non-refundable'
                        ]
                      },
                      {
                        id: 2,
                        type: 'Deluxe Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 5,130,000',
                        discountedPrice: 'VND 4,104,000',
                        features: [
                          '24 m²',
                          'View',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Free cancellation before 31 October 2024',
                          'No prepayment needed - pay at the property'
                        ]
                      },
                      {
                        id: 3,
                        type: 'Deluxe Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 5,643,000',
                        discountedPrice: 'VND 4,514,400',
                        features: [
                          '24 m²',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Non-refundable'
                        ]
                      }
                    ]);
                  } catch (e){
                    console.log(e);
                  }
            } else {
                setTimeout(() => {
                    setPropertyData({
                        name: "Indochine Hotel SG",
                        location: "District 1, Ho Chi Minh City, Vietnam",
                        description: "Located in Ho Chi Minh City, 300 meters from Fine Arts Museum, Indochine Hotel SG provides accommodation with a garden, free private parking, a terrace, and a restaurant.",
                        images: [
                            "https://via.placeholder.com/300x200", // Image 1
                            "https://via.placeholder.com/300x200", // Image 2
                            "https://via.placeholder.com/300x200"  // Image 3
                        ]
                    });
                    setRoomData( [{
                        id: 1,
                        type: 'Superior Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 4,780,000',
                        discountedPrice: 'VND 3,830,400',
                        features: [
                          '22 m²',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Non-refundable'
                        ]
                      },
                      {
                        id: 2,
                        type: 'Deluxe Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 5,130,000',
                        discountedPrice: 'VND 4,104,000',
                        features: [
                          '24 m²',
                          'View',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Free cancellation before 31 October 2024',
                          'No prepayment needed - pay at the property'
                        ]
                      },
                      {
                        id: 3,
                        type: 'Deluxe Queen Room',
                        description: '1 large double bed',
                        guests: 2,
                        originalPrice: 'VND 5,643,000',
                        discountedPrice: 'VND 4,514,400',
                        features: [
                          '24 m²',
                          'Air conditioning',
                          'Private bathroom',
                          'Flat-screen TV',
                          'Soundproofing',
                          'Free WiFi'
                        ],
                        choices: [
                          'Very good breakfast included',
                          'Non-refundable'
                        ]
                      }
                    ]);
                    setLoading(false);
                }, 3000); // 3 seconds delay to simulate loading time
            }
        };

        fetchData();
    }, [id]); // Dependency on id


    return (
        <div className="propertyDetail-container">
            {loading ? (
                <ContentLoader 
                    speed={2}
                    width="100%"
                    height={400}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Header */}
                    <rect x="10%" y="20" rx="4" ry="4" width="80%" height="30" /> 
                    <rect x="15%" y="60" rx="3" ry="3" width="70%" height="20" /> 
                    
                    {/* Image placeholders */}
                    <rect x="10%" y="100" rx="8" ry="8" width="25%" height="180" />
                    <rect x="37%" y="100" rx="8" ry="8" width="25%" height="180" />
                    <rect x="64%" y="100" rx="8" ry="8" width="25%" height="180" />
                    
                    {/* Description */}
                    <rect x="10%" y="300" rx="3" ry="3" width="80%" height="10" /> 
                    <rect x="10%" y="320" rx="3" ry="3" width="75%" height="10" /> 
                    <rect x="10%" y="340" rx="3" ry="3" width="60%" height="10" /> 
                </ContentLoader>
            ) : (
                <>
                    <div className="propertyDetail-header">
                        <h1>{propertyData.name}</h1>
                        <p>{propertyData.location}</p>
                    </div>
                    <div className="propertyDetail-image">
                        
                    </div>
                    <div className="propertyDetail-description">
                        <p>{propertyData.description}</p>
                    </div>
                    <ReservationRoom roomData={roomData}/>
                </>
            )}
        </div>
    );
};

export default PropertyDetail;