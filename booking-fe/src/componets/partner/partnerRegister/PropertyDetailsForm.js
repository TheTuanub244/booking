import React, { useEffect, useState } from 'react';
import Map from './Map'; // Import the Map component for Google Maps or OpenStreetMap
import "./PropertyDetailsForm.css";
import { getProvince } from '../../../api/addressAPI';

const PropertyDetailsForm = ({owner, longitude, latitude}) => {

    const [propertyData, setPropertyData] = useState({
        name: '',
        description: '',
            province: '',
            district: '',
            ward: '',
            street: '',
        pricePerNight: {
            weekday: 0,
            weekend: 0
        },
        location: { lat: latitude, lng: longitude },
        rooms: []
    });
    useEffect(() => {
        console.log(propertyData.rooms);
        
    }, [propertyData])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };
    const [address, setAddress] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    const handleGetAddress = async () => {
        const respone = await getProvince()
        setAddress(respone)
      }
      const getDistrict = async (code) => {
    
        const findDistrict = address.find(index => index.code === parseInt(code))
        
        setDistrict(findDistrict.districts)
        
      }
      const getWard = async(code) => {
        const findWard = district.find(index => index.code === parseInt(code))
        console.log(findWard);
        
        setWard(findWard?.wards)
      }
    useEffect(() => {
        handleGetAddress()
    }, [])
    const handleChangeOptions = async (e) => {
        const { name, value } = e.target;
          const selectedOptions = e.target.options[e.target.selectedIndex];
          const code = selectedOptions.getAttribute('data-code')
          
          if (name === 'province') {
              await getDistrict(code)
              setPropertyData((prev) => ({
                ...prev,
                  [name]: value,
              }));
            }else if(name === 'district'){
              await getWard(code)
              setPropertyData((prev) => ({
                ...prev,
                  [name]: value,
              }));
            }else if(name === 'ward'){
                setPropertyData((prev) => ({
                ...prev,
                  [name]: value,
              }));
      }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Property Data Submitted:", propertyData);
    };


    const removeRoom = (index) => {
        const updatedRooms = propertyData.rooms.filter((_, i) => i !== index);
        setPropertyData({ ...propertyData, rooms: updatedRooms });
    };
    const handleLocationSelect = (location) => {
        setPropertyData((prevData) => ({
            ...prevData,
            location 
        }));
        setIsMapOpen(false); 
    };
    
    useEffect(() => {
        console.log(propertyData.location);
        
    }, [propertyData])
    const [isMapOpen, setIsMapOpen] = useState(false)
    const handleRoomChange = (index, field, value) => {
        const updatedRooms = [...propertyData.rooms];
        updatedRooms[index] = { ...updatedRooms[index], [field]: value };
        setPropertyData({ ...propertyData, rooms: updatedRooms });
    };

    const handleRoomCapacityChange = (index, field, value) => {
        const updatedRooms = [...propertyData.rooms];
        updatedRooms[index] = {
            ...updatedRooms[index],
            capacity: {
                ...updatedRooms[index].capacity,
                [field]: field === 'adults' ? parseInt(value) : value,
            },
        };
        setPropertyData({ ...propertyData, rooms: updatedRooms });
    };

    const handleChildAgeChange = (roomIndex, value) => {
        const updatedRooms = [...propertyData.rooms];
        const childAges = updatedRooms[roomIndex].capacity.childs.age || [];
        updatedRooms[roomIndex].capacity.childs.age = childAges;
        setPropertyData({ ...propertyData, rooms: updatedRooms });
    };
    const handlePriceChange = () => {

    }

    const addRoom = () => {
        setPropertyData({
            ...propertyData,
            rooms: [
                ...propertyData.rooms,
                {
                    name: '',
                    type: '',
                    rate: '',
                    capacity: { adults: 0, childs: { count: 0, age: 0 } },
                    pricePerNight: { weekday: '', weekend: '' },
                }
            ]
        });
    };
    return (
        <>
            {
                address && (
            <div className="property-details-container">
            <div className="property-details-form">
                <h2>Add Property Details</h2>
                <form onSubmit={handleSubmit} className="form-sectionn">
                   <div className='container-left'>
                    <label>Property Name</label>
                        <input
                            type="text"
                            name="name"
                            value={propertyData.name}
                            onChange={handleChange}
                            required
                        />
                        <label>Property Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            required
                        />
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            value={propertyData.street}
                            onChange={handleChange}
                            required
                        />
                   </div>
                    <div className='container-right'>
                        <label>Province</label>
                        <select id="province" name="province" onChange={handleChangeOptions} required>
                                    <option value="">Tỉnh/Thành phố</option>
                                    {
                                        address.map((index) => (
                                        <option data-code={index.code}  value={index.name} >{index.name}</option>
                                        ))
                                    }
                            </select>

                        <label>District</label>
                        <select id="district" name="district" onChange={handleChangeOptions}>
                                    <option value="">Quận/Huyện</option>
                                    {
                                        district?.map((index) => (
                                        <option data-code={index.code}  value={index.name} id={index.code}>{index.name}</option>
                                        ))
                                    }
                                    </select>

                        <label>Ward</label>
                        <select id="ward" name="ward" onChange={handleChangeOptions}>
                                    <option value="">Phường/Xã</option>
                                    {
                                        ward?.map((index) => (
                                        <option data-code={index.code}  value={index.name} id={index.code}>{index.name}</option>
                                        ))
                                    }
                        </select>

                    </div>
                    

                    
                </form>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}>
                <label >Description</label>
                    <textarea
                        name="description"
                        value={propertyData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                <label>Amentities</label>
                    
                </div>

                <div className="room-section">
                        <h3>Rooms</h3>
                        {propertyData.rooms.map((room, index) => (
                            <>
                                <div key={index} className="form-sectionn">
                                <div className='container-left'>
                                    <label>Room Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={room.name}
                                        onChange={(e) => handleRoomChange(index, e)}
                                        required
                                    />

                                    <label>Room Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={room.type}
                                        onChange={(e) => handleRoomChange(index, e)}
                                        required
                                    />
                                    <label>Room Size</label>
                                    <input
                                        type="text"
                                        name="size"
                                        value={room.type}
                                        onChange={(e) => handleRoomChange(index, e)}
                                    />
                                        <label>Age of Child</label>
                                        <input
                                            type="number"
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                        />
                                        <label>Number of Child</label>
                                        <input
                                            type="number"
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                        />
                                        <label>Room Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                        />
                                        
                              
                                    
                                </div>
                                <div className='container-right'>
                                    <label>Room Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={room.name}
                                        onChange={(e) => handleRoomChange(index, e)}
                                        required
                                    />

                                    <label>Room Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={room.type}
                                        onChange={(e) => handleRoomChange(index, e)}
                                        required
                                    />
                                     <h3 style={{
                                        marginTop: '40px'
                                     }}>Price Per Night</h3>
                                    <label>Weekday Price</label>
                                    <input type="number" name="weekday" value={propertyData.pricePerNight.weekday} onChange={handlePriceChange} required />

                                    <label>Weekend Price</label>
                                    <input type="number" name="weekend" value={propertyData.pricePerNight.weekend} onChange={handlePriceChange} required />
                                    <label>Room Amentities</label>
                                        <input
                                            type="text"
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                        />
                                </div>
                                
                            </div>
                            <button type='button' className='remove-room-button' onClick={() => removeRoom(index)}>Remove Room</button>

                            </>
                            
                        ))}
                       
                        <button type="button" className="add-room-button" onClick={addRoom}>
                            Add Room
                        </button>
                        
                    </div>
            </div>
            
            {/* Container for Map and Property Summary */}
            <div className="container-map">
            <h3>Property Summary</h3>
                <p><strong>Name:</strong> {propertyData.name}</p>
                <p><strong>Location:</strong> {`${propertyData.street}, ${propertyData.ward}, ${propertyData.district}, ${propertyData.province}`}</p>
                <p><strong>Description:</strong> {propertyData.description}</p>
                <p><strong>Latitude:</strong> {propertyData.location.lat}</p>
                <p><strong>Longitude:</strong> {propertyData.location.lng}</p>

                <div className="mini-map">
                    <Map key={`${propertyData.location.lat}-${propertyData.location.lng}`} onLocationSelect={() => {}} initialLocation={propertyData.location} />
                </div>

                <button className="open-map-button" onClick={() => setIsMapOpen(true)}>
                    Open Map
                </button>
            </div>

            {/* Map Pop-up Modal */}
            {isMapOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="circle-close-button" onClick={() => setIsMapOpen(false)}>
                            &times;
                        </button>
                        <Map onLocationSelect={handleLocationSelect} initialLocation={propertyData.location}/>
                    </div>
                </div>
            )}
        </div>
                )
            }
        </>
    );
};

export default PropertyDetailsForm;
