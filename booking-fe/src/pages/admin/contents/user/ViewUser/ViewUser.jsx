import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ViewUser.css";

const ViewUser = () => {
  const {id} = useParams();
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <Link to={`/admin/user/edit/${id}`} className="editButton">
              Edit
            </Link>
            <h1 className="title">User Information</h1>
            <div className="item">
              <img src={user.avatar} alt={user.userName} className="itemImg" />
              <div className="details">
                <label className="itemTitle">Name: {user.userName}</label>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">
                    {user.gender ? "Female" : "Male"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {`${user.address.ward}, ${user.address.district}, ${user.address.province}`}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{user.role.join(", ")}</span>
                </div>
                {user.partnerInfo && (
                  <>
                    <h2 className="itemSubTitle">Partner Info</h2>
                    <div className="detailItem">
                      <span className="itemKey">Business Name:</span>
                      <span className="itemValue">
                        {user.partnerInfo.businessName}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Property Type:</span>
                      <span className="itemValue">
                        {user.partnerInfo.propertyType}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Number of Properties:</span>
                      <span className="itemValue">
                        {user.partnerInfo.numberOfProperties}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Business Address:</span>
                      <span className="itemValue">
                        {`${user.partnerInfo.businessAddress.street}, ${user.partnerInfo.businessAddress.ward}, ${user.partnerInfo.businessAddress.district}, ${user.partnerInfo.businessAddress.province}`}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
