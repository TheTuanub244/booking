import React, { useEffect, useState } from "react";
import "./PropertyListPage.css";
import "../partnerRegister/PropertyDetailsForm.css";
import { getPropertyByOwner } from "../../../api/propertyAPI";
import { useNavigate, useParams } from "react-router-dom";
import PropertyDetailsForm from "../partnerRegister/PropertyDetailsForm";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [activeTab, setActiveTab] = useState("list");
  const longitude = localStorage.getItem("longitude");
  const latitude = localStorage.getItem("latitude");

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getPropertyByOwner(id);
        setProperties(response);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchProperties();
  }, [id]);

  const toggleDescription = (propertyId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };
  const handleDelete = async (propertyId) => {
    try {
      //   await deleteProperty(propertyId);
      setProperties((prevProperties) =>
        prevProperties.filter((p) => p._id !== propertyId),
      );
      alert("Xóa bất động sản thành công!");
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };
  const renderListTab = () => (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property._id} className="property-card">
          <img
            src={property.images[0] || "default-image-url.jpg"}
            alt="Property"
            className="property-image"
          />
          <div className="property-info">
            <h3>{property.name}</h3>
            <p>
              <strong>Địa chỉ:</strong> {property.address.street},{" "}
              {property.address.ward}, {property.address.district},{" "}
              {property.address.province}
            </p>
            <p>
              <strong>Loại:</strong> {property.type}
            </p>
            <p>
              <strong>Số phòng:</strong> {property.rooms?.length || 0}
            </p>
            <p>
              <strong>Rate:</strong> {property.rate || 0}
            </p>

            <p>
              <strong>Description:</strong>
            </p>
            <div
              className={`property-description ${expandedDescriptions[property._id] ? "expanded" : ""}`}
            >
              {property.description}
            </div>

            {!expandedDescriptions[property._id] && (
              <span
                className="show-more"
                onClick={() => toggleDescription(property._id)}
              >
                Xem tiếp
              </span>
            )}
            {expandedDescriptions[property._id] && (
              <span
                className="show-more"
                onClick={() => toggleDescription(property._id)}
              >
                Thu gọn
              </span>
            )}

            <div className="button-group">
              <button className="view-details-button">Xem Chi Tiết</button>
              <button
                className="delete-button"
                onClick={() => handleDelete(property._id)}
              >
                Xóa
              </button>
              <button
                className="edit-button"
                onClick={() => setActiveTab("edit")}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const renderEditTab = () => (
    <div className="property-add-edit">
      <PropertyDetailsForm />
    </div>
  );
  const renderAddTab = () => (
    <div className="new-container">
      <PropertyDetailsForm longitude={longitude} latitude={latitude} />
    </div>
  );
  return (
    <div className="property-list-page">
      <h2>Quản Lý Bất Động Sản</h2>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Thông tin
        </button>
        <button
          className={`tab-button ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Danh Sách
        </button>
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Thêm Mới
        </button>
      </div>

      {activeTab === "list" && renderListTab()}
      {activeTab === "add" && renderAddTab()}
      {activeTab === "edit" && renderEditTab()}
    </div>
  );
};

export default PropertyListPage;
