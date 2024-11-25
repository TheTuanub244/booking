import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./EditUser.css";

const EditUser = ({}) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const mockUserData = {
        _id: "1",
        userName: "User",
        email: "user@gmail.com",
        phoneNumber: "0123456789",
        gender: false,
        avatar: "https://images8.alphacoders.com/657/657974.jpg",
        address: {
          province: "HaNoi",
          district: "HoangMai",
          ward: "KimDong",
        },
        role: ["PARTNER"],
        isAdmin: false,
        partnerInfo: {
          businessName: "ABC",
          propertyType: "ABC",
          numberOfProperties: 5,
          businessAddress: {
            province: "HaNoi",
            district: "HoangMai",
            ward: "KimDong",
            street: "1 Main St.",
          },
        },
      };
      setUser(mockUserData);
    };

    fetchUser();
  }, []);

  const handleSubmit = () => {
    alert("User details submitted!");
  };

  return (
    <div className="editContainer">
      <h1>Edit User</h1>
      <form className="editForm" onSubmit={(e) => e.preventDefault()}>
        <div className="formGroup">
          <label>Name:</label>
          <input type="text" placeholder="Enter name" />
        </div>
        <div className="formGroup">
          <label>Email:</label>
          <input type="email" placeholder="Enter email" />
        </div>
        <div className="formGroup">
          <label>Phone:</label>
          <input type="tel" placeholder="Enter phone number" />
        </div>
        <div className="formGroup">
          <label>Gender:</label>
          <select>
            <option value={true}>Female</option>
            <option value={false}>Male</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Address:</label>
          <input type="text" placeholder="Enter address" />
        </div>
        <div className="formActions">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <Link to={`/admin/user/view/${id}`} className="backButton">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
