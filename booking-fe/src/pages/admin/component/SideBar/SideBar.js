import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Logo from "../../imgs/logo.png";
import { SidebarData } from "../../data/DashboardData";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ setSelectedComponent }) => {
  const location = useLocation(); 
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const savedIndex = localStorage.getItem("selectedIndex");
    const index = SidebarData.findIndex(
      (item) => item.path === location.pathname,
    );
    setSelected(index !== -1 ? index : savedIndex ? parseInt(savedIndex) : 0);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("selectedIndex", selected);
  }, [selected]);

  return (
    <div className="sidebar">
      <Link to ='/' className="logo">
        <img src={Logo} alt="" />
        <span>booking.com</span>
      </Link>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <Link
              to={item.path}
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
