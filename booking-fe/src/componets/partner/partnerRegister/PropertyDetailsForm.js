import React, { useEffect, useState } from "react";
import Map from "./Map"; // Import the Map component for Google Maps or OpenStreetMap
import "./PropertyDetailsForm.css";
import { getProvince } from "../../../api/addressAPI";
import {
  createPropertyWithPartner,
  getPropertyById,
  getPropertyByOwner,
} from "../../../api/propertyAPI";
import { useNavigate } from "react-router-dom";
import { findRoomByProperty } from "../../../api/roomAPI";

const PropertyDetailsForm = ({ owner, longitude, latitude, initialData, type }) => {
  
  const [propertyData, setPropertyData] = useState({
    name: "",
    description: "",
    address: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    type: "",
    images: [],

    location: { lat: latitude, lng: longitude },
    rooms: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const getAllPropetyByOwner = async (userId) => {
    const data = await getPropertyByOwner(userId);
    setPropertyData(data);
  };
  const handleGetPropertyById = async () => {
    const property = JSON.parse(localStorage.getItem('property'))
    const rooms = await findRoomByProperty(property._id)

    const data = await getPropertyById(property._id)
    if(data){
      data.rooms = rooms
      data.location.lat = data.location.latitude
      data.location.lng = data.location.longitude      

    }
    console.log(data);
    
    setPropertyData(data)
    setIsDataLoaded(true);
  }
  if (initialData) {
    setPropertyData(initialData);
  }
  useEffect(() => {
    if (type === "update" && !isDataLoaded) {
      handleGetPropertyById();
    }
    
  }, [type, isDataLoaded]);
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street") {
      setPropertyData({
        ...propertyData,
        address: {
          ...propertyData.address,
          [name]: value,
        },
      });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleGetAddress = async () => {
    const respone = await getProvince();
    setAddress(respone);
  };
  const getDistrict = async (code) => {
    const findDistrict = address.find((index) => index.code === parseInt(code));

    setDistrict(findDistrict.districts);
  };
  const getWard = async (code) => {
    const findWard = district.find((index) => index.code === parseInt(code));

    setWard(findWard?.wards);
  };
  useEffect(() => {
    handleGetAddress();
  }, []);
  const handleChangeOptions = async (e) => {
    const { name, value } = e.target;
    const selectedOptions = e.target.options[e.target.selectedIndex];
    const code = selectedOptions.getAttribute("data-code");

    if (name === "province") {
      await getDistrict(code);
      setPropertyData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (name === "district") {
      await getWard(code);
      setPropertyData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (name === "ward") {
      setPropertyData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    }
  };



  const removeRoom = (index) => {
    const updatedRooms = propertyData.rooms.filter((_, i) => i !== index);
    setPropertyData({ ...propertyData, rooms: updatedRooms });
  };
  const handleLocationSelect = (location) => {
    setPropertyData((prevData) => ({
      ...prevData,
      location,
    }));
    setIsMapOpen(false);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);
  const handleRoomChange = (index, e) => {
    if (e.target.name === "weekday" || e.target.name === "weekend") {
      const rawValue = e.target.value.replace(/,/g, "");
      if (isNaN(rawValue)) return;
      const updatedRooms = [...propertyData.rooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        pricePerNight: {
          ...updatedRooms[index].pricePerNight,
          [e.target.name]: rawValue,
        },
      };
      setPropertyData({ ...propertyData, rooms: updatedRooms });
    } else if (e.target.name !== "images") {
      const updatedRooms = [...propertyData.rooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [e.target.name]:
          e.target.name === "size" ? parseInt(e.target.value) : e.target.value,
      };
      setPropertyData({ ...propertyData, rooms: updatedRooms });
    }
  };

  const handleRoomImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedRooms = [...propertyData.rooms];

    updatedRooms[index].image = file;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedRooms = [...propertyData.rooms];
        updatedRooms[index] = {
          ...updatedRooms[index],
          images: reader.result,
        };

        setPropertyData({
          ...propertyData,
          rooms: updatedRooms,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePropertyImageChange = (e) => {
    const file = e.target.files[0];
    propertyData.image = file;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropertyData({ ...propertyData, images: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRoomCapacityChange = (index, field, value) => {
    const updatedRooms = [...propertyData.rooms];
    if (field === "adults") {
      updatedRooms[index] = {
        ...updatedRooms[index],
        capacity: {
          ...updatedRooms[index].capacity,
          [field]: parseInt(value),
        },
      };
    } else {
      updatedRooms[index] = {
        ...updatedRooms[index],
        capacity: {
          ...updatedRooms[index].capacity,
          childs: {
            ...updatedRooms[index].capacity.childs,

            [field]: parseInt(value),
          },
        },
      };
    }
    setPropertyData({ ...propertyData, rooms: updatedRooms });
  };

  const addRoom = () => {
    setPropertyData({
      ...propertyData,
      rooms: [
        ...propertyData.rooms,
        {
          name: "",
          type: "",
          size: 0,
          images: [],
          image: "",
          capacity: { adults: 0, childs: { count: 0, age: 0 } },
          pricePerNight: { weekday: "", weekend: "" },
          rawPricePerNight: {
            weekday: "",
            weekend: "",
          },
        },
      ],
    });
  };
  const addProperty = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    propertyData.owner_id = userId;
    propertyData.location.longitude = propertyData.location.lng;
    propertyData.location.latitude = propertyData.location.lat;
    setPropertyData({
      ...propertyData,
      rooms: propertyData.rooms.map((room) => ({
        ...room,
        pricePerNight: {
          weekday: room.pricePerNight.weekday,
          weekend: room.pricePerNight.weekend,
        },
      })),
    });
    const formData = new FormData();

    // Add general property information
    formData.append("name", propertyData.name);
    formData.append("owner_id", propertyData.owner_id);

    formData.append("description", propertyData.description);
    formData.append("type", propertyData.type);
    formData.append("location", JSON.stringify(propertyData.location));
    formData.append("address", JSON.stringify(propertyData.address));

    // Add main property image if available
    if (propertyData.image) {
      formData.append("image", propertyData.image);
    }

    // Add room details, including each room’s image
    propertyData.rooms.forEach((room, index) => {
      // Append individual room fields
      formData.append(`rooms[${index}][name]`, room.name);
      formData.append(`rooms[${index}][type]`, room.type);
      formData.append(`rooms[${index}][size]`, room.size);
      formData.append(
        `rooms[${index}][capacity]`,
        JSON.stringify(room.capacity),
      );
      formData.append(
        `rooms[${index}][pricePerNight]`,
        JSON.stringify(room.pricePerNight),
      );

      // Append room image if available
      if (room.image) {
        formData.append(`rooms[${index}][image]`, room.image);
      }
    });

    // Send FormData to backend
    try {
      const respone = await createPropertyWithPartner(formData, accessToken);
      if (respone) {
        getAllPropetyByOwner(userId);
        navigate(`property/propertyList/${userId}`);
      }
    } catch (error) {
      console.error("Failed to add property:", error);
    }
  };

  return (
    <>
      {(address && propertyData && propertyData.rooms) && (
        <div className="property-details-container">
          <div className="property-details-form">
            <h2>Add Property Details</h2>
            <form className="form-sectionn">
              <div className="container-left">
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
                  name="images"
                  onChange={(e) => handlePropertyImageChange(e)}
                  required
                />
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={propertyData.address.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="container-right">
                <label>Province</label>
                <select
                  id="province"
                  name="province"
                  onChange={handleChangeOptions}
                  required
                >
                  <option value="">Tỉnh/Thành phố</option>
                  {address.map((index) => (
                    <option data-code={index.code} value={index.name}>
                      {index.name}
                    </option>
                  ))}
                </select>

                <label>District</label>
                <select
                  id="district"
                  name="district"
                  onChange={handleChangeOptions}
                >
                  <option value="">Quận/Huyện</option>
                  {district?.map((index) => (
                    <option
                      data-code={index.code}
                      value={index.name}
                      id={index.code}
                    >
                      {index.name}
                    </option>
                  ))}
                </select>

                <label>Ward</label>
                <select id="ward" name="ward" onChange={handleChangeOptions}>
                  <option value="">Phường/Xã</option>
                  {ward?.map((index) => (
                    <option
                      data-code={index.code}
                      value={index.name}
                      id={index.code}
                    >
                      {index.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label>Description</label>
              <textarea
                name="description"
                value={propertyData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="room-section">
              {propertyData.rooms.map((room, index) => (
                <>
                  <div key={index} className="form-sectionn">
                    <div className="container-left">
                      <h3>Rooms</h3>

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
                        type="number"
                        name="size"
                        value={room.size}
                        onChange={(e) => handleRoomChange(index, e)}
                      />

                      <label>Number of Adults</label>
                      <input
                        type="number"
                        name="adults"
                        value={room.capacity.childs.count}
                        onChange={(e) =>
                          handleRoomCapacityChange(
                            index,
                            e.target.name,
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="container-right">
                      <h3 style={{}}>Price Per Night</h3>
                      <label>
                        Weekday Price:{" "}
                        {formatCurrency(room.price_per_night.weekday)}
                      </label>

                      <input
                        type="number"
                        name="weekday"
                        value={propertyData.rooms[index].price_per_night.weekday}
                        onChange={(e) => handleRoomChange(index, e)}
                        required
                      />

                      <label>
                        Weekend Price:{" "}
                        {formatCurrency(room.price_per_night.weekend)}
                      </label>

                      <input
                        type="number"
                        name="weekend"
                        value={propertyData.rooms[index].price_per_night.weekend}
                        onChange={(e) => handleRoomChange(index, e)}
                        required
                      />
                      <label>Age of Child</label>
                      <input
                        type="number"
                        name="age"
                        value={room.capacity.childs.age}
                        onChange={(e) =>
                          handleRoomCapacityChange(
                            index,
                            e.target.name,
                            e.target.value,
                          )
                        }
                      />
                      <label>Number of Child</label>
                      <input
                        type="number"
                        name="count"
                        value={room.capacity.childs.count}
                        onChange={(e) =>
                          handleRoomCapacityChange(
                            index,
                            e.target.name,
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label>Room Image</label>
                    <input
                      type="file"
                      onChange={(e) => handleRoomImageChange(index, e)}
                    />
                  </div>
                  {propertyData.rooms[index].images.length !== 0 && (
                    <div className="image-preview">
                      <img
                        src={!propertyData.rooms[index].images ? propertyData.rooms[index].images[0] : propertyData.rooms[index].images}
                        alt="Selected property preview"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="remove-room-button"
                    onClick={() => removeRoom(index)}
                  >
                    Remove Room
                  </button>
                </>
              ))}

              <button
                type="button"
                className="add-room-button"
                onClick={addRoom}
              >
                Add Room
              </button>
            </div>
            <button
              type="button"
              className="add-property-button"
              onClick={addProperty}
            >
              Add Property
            </button>
          </div>

          {/* Container for Map and Property Summary */}
          <div className="container-map">
            <h3>Property Summary</h3>
            <p>
              <strong>Name:</strong> {propertyData.name}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${propertyData.address.street}, ${propertyData.address.ward}, ${propertyData.address.district}, ${propertyData.address.province}`}
            </p>
            <p>
              <strong>Description:</strong> {propertyData.description}
            </p>
            <p>
              <strong>Latitude:</strong> {propertyData.location.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {propertyData.location.lng}
            </p>
            <p>
              <strong>Property's Image:</strong>
            </p>

            {propertyData.images.length !== 0 && (
              <div className="image-preview">
                <img
                  src={propertyData.images.length === 0 ? propertyData.images[0] : propertyData.images}
                  alt="Selected property preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}

            <div className="mini-mapp">
              <Map
                key={`${propertyData.location.lat}-${propertyData.location.lng}`}
                onLocationSelect={() => {}}
                initialLocation={propertyData.location}
              />
            </div>

            <button
              className="open-map-button"
              onClick={() => setIsMapOpen(true)}
            >
              Open Map
            </button>
          </div>

          {/* Map Pop-up Modal */}
          {isMapOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="circle-close-button"
                  onClick={() => setIsMapOpen(false)}
                >
                  &times;
                </button>
                <Map
                  onLocationSelect={handleLocationSelect}
                  initialLocation={propertyData.location}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyDetailsForm;
