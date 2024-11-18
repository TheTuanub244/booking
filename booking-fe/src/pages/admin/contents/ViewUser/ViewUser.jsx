import React, { useState, useEffect } from "react";
import "./ViewUser.css";

const ViewUser = () => {
  // Simulated user data from UserSchema
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulated fetch function
    const fetchUser = async () => {
      const mockUserData = {
        userName: "User",
        email: "user@gmail.com",
        phoneNumber: "0123456789",
        gender: false,
        avatar:
          "https://images8.alphacoders.com/657/657974.jpg",
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

  const handleInputChange = (e, field, subField = null, isNested = false) => {
    const value = e.target.value;
    setUser((prev) => {
      if (isNested) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <button
              className="editButton"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <h1 className="title">User Information</h1>
            <div className="item">
              <img src={user.avatar} alt={user.userName} className="itemImg" />
              <div className="details">
                <label className="itemTitle">
                  Name:
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.userName}
                      onChange={(e) => handleInputChange(e, "userName")}
                    />
                  ) : (
                    user.userName
                  )}
                </label>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  ) : (
                    <span className="itemValue">{user.email}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={user.phoneNumber}
                      onChange={(e) => handleInputChange(e, "phoneNumber")}
                    />
                  ) : (
                    <span className="itemValue">{user.phoneNumber}</span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  {isEditing ? (
                    <select
                      value={user.gender ? "Female" : "Male"}
                      onChange={(e) =>
                        handleInputChange(e, "gender", null, false)
                      }
                    >
                      <option value={true}>Female</option>
                      <option value={false}>Male</option>
                    </select>
                  ) : (
                    <span className="itemValue">
                      {user.gender ? "Female" : "Male"}
                    </span>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={user.address.ward}
                        onChange={(e) =>
                          handleInputChange(e, "address", "ward", true)
                        }
                      />
                      <input
                        type="text"
                        value={user.address.district}
                        onChange={(e) =>
                          handleInputChange(e, "address", "district", true)
                        }
                      />
                      <input
                        type="text"
                        value={user.address.province}
                        onChange={(e) =>
                          handleInputChange(e, "address", "province", true)
                        }
                      />
                    </>
                  ) : (
                    <span className="itemValue">
                      {`${user.address.ward}, ${user.address.district}, ${user.address.province}`}
                    </span>
                  )}
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
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.partnerInfo.businessName}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "partnerInfo",
                              "businessName",
                              true
                            )
                          }
                        />
                      ) : (
                        <span className="itemValue">
                          {user.partnerInfo.businessName}
                        </span>
                      )}
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Property Type:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.partnerInfo.propertyType}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "partnerInfo",
                              "propertyType",
                              true
                            )
                          }
                        />
                      ) : (
                        <span className="itemValue">
                          {user.partnerInfo.propertyType}
                        </span>
                      )}
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Number of Properties:</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={user.partnerInfo.numberOfProperties}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "partnerInfo",
                              "numberOfProperties",
                              true
                            )
                          }
                        />
                      ) : (
                        <span className="itemValue">
                          {user.partnerInfo.numberOfProperties}
                        </span>
                      )}
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Business Address:</span>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={user.partnerInfo.businessAddress.street}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "partnerInfo",
                                "businessAddress",
                                true
                              )
                            }
                          />
                          <input
                            type="text"
                            value={user.partnerInfo.businessAddress.ward}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "partnerInfo",
                                "businessAddress",
                                true
                              )
                            }
                          />
                          <input
                            type="text"
                            value={user.partnerInfo.businessAddress.district}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "partnerInfo",
                                "businessAddress",
                                true
                              )
                            }
                          />
                          <input
                            type="text"
                            value={user.partnerInfo.businessAddress.province}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "partnerInfo",
                                "businessAddress",
                                true
                              )
                            }
                          />
                        </>
                      ) : (
                        <span className="itemValue">
                          {`${user.partnerInfo.businessAddress.street}, ${user.partnerInfo.businessAddress.ward}, ${user.partnerInfo.businessAddress.district}, ${user.partnerInfo.businessAddress.province}`}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
              {isEditing && (
                <button
                  className="submitButton"
                  onClick={() => alert("Submit functionality to be implemented")}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

