import React from "react";
import Cards from "../../component/Cards/Cards";
import Table from "../../component/Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards/>
      <Table />
    </div>
  );
};

export default MainDash;