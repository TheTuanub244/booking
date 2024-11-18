import React, { useEffect, useState } from "react";
import "./headerAccount.css";
import { signOut } from "../../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../../../helpers/authHelpers";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllNotificationWithUser, markAsRead } from "../../../api/notificationAPI";
import socketService from "../../../helpers/sockerService";

function HeaderAccount() {
  const isSignIn = localStorage.getItem("isSignIn");
  const userName = localStorage.getItem("userDisplayName");
  const userId = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState()
  const [totalUnseen, setTotalUnseen] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    const accessToken = localStorage.getItem("accessToken");
    const role = getRoleFromToken(accessToken, "Partner");
    if (role) {
      navigate(`/partner/propertyList/${userId}`);
    } else {
      navigate("/partner/partnerDashboard");
    }
  };
  const fetchNotifications = async () => {
    const { noti, unseen } = await getAllNotificationWithUser(userId);
    setNotifications(noti); 
    setTotalUnseen(unseen); 
  };
  const getAllNotification = async () => {
    const data = await getAllNotificationWithUser(userId)
    setNotifications(data.noti)
    setTotalUnseen(data.unseen)
  }
  const handleMarkAllAsRead = async (userId) => {
    fetchNotifications();
  };

  useEffect(() => {
    getAllNotification()
    socketService.on("notifyPartner", (notification) => {
      console.log(notification);
      fetchNotifications()
      console.log();
      
    });
  }, []);
  
  const handleSignOut = async () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userDisplayName");
    localStorage.removeItem("isSignIn");
    localStorage.removeItem("email");
    await signOut(userId);
    window.location.reload(); // Refresh the page after sign-out
  };
  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };
  return (
    <div className="headerAccountContainer">
      <span className="listProperty" onClick={handleNavigate}>
        List your property
      </span>
      <>
              <div className="display-flex">
                <div
                  className="notification-wrapperr"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FontAwesomeIcon style={{
                    marginRight: '30px'
                  }} icon={faBell} className="notification-iconn" />
                  {totalUnseen > 0 && (
                    <span style={{
                      marginRight: '32px'
                    }} className="notification-badgee">{totalUnseen}</span>
                  )}
                </div>
              </div>

              {/* Dropdown danh sách thông báo */}
              {showDropdown && (
                <div style={{
                  marginTop: '170px'
                }} className="notification-dropdownn">
                  <div className="dropdown-headerr">
                    <h4>Thông báo</h4>
                    <button className="mark-all-readd">
                      Đánh dấu tất cả đã đọc
                    </button>
                  </div>
                  <div className="dropdown-bodyy">
                    {notifications.length === 0 ? (
                      <p>Không có thông báo nào</p>
                    ) : (
                      notifications.map((notif, index) => (
                        <div
                          key={index}
                          className={`notification-itemm ${
                            notif.status === false ? "unreadd" : "readd"
                          }`}
                        >
                          <p>{notif.message}</p>
                          <small>{new Date(notif.created_at).toLocaleString()}</small>
                          {!notif.status && (
                            <button
                              className="mark-readd"
                              onClick={() => handleMarkAsRead(notif._id)}
                            >
                              Đánh dấu đã đọc
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>

      <span className="userName-account">{"Hello, " + userName}</span>
      <button onClick={handleSignOut} className="signOutButton">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderAccount;
