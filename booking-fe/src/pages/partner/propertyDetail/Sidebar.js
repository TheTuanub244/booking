import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Import NavLink và useLocation
import "./Sidebar.css";

const Sidebar = ({ setTab, tab }) => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const handleChangeTab = (value) => {
    setTab(value);
  };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="brand-link">
        <span className="brand-text font-weight-light">Admin Dashboard</span>
      </div>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            <li className="nav-item" onClick={() => handleChangeTab("info")}>
              <div className={`nav-link ${tab === "info" ? "active" : ""}`}>
                <i className="nav-icon fas fa-info-circle"></i>
                <p>Property Details</p>
              </div>
            </li>

            <li className="nav-item" onClick={() => handleChangeTab("finance")}>
              <div className={`nav-link ${tab === "finance" ? "active" : ""}`}>
                <i className="nav-icon fas fa-dollar-sign"></i>
                <p>Finance Details</p>
              </div>
            </li>

            <li className="nav-item" onClick={() => handleChangeTab("update")}>
              <div className={`nav-link ${tab === "update" ? "active" : ""}`}>
                <i className="nav-icon fas fa-edit"></i>
                <p>Update Property</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
