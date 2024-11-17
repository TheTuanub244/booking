import React, { useState } from "react";
import "./SideBar.css";
import Logo from "../../imgs/logo.png";
import { SidebarData } from "../../data/DashboardData";
const SideBar = ({ setSelectedComponent }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt=""></img>
        <span>booking.com</span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active " : "menuItem"}
              key={index}
              onClick={() => {
                setSelected(index);
                setSelectedComponent(item.path);
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
