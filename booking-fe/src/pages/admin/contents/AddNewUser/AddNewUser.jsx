import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import RightSide from "../../component/RightSide/RightSide";

const AddNewUser = () => {
  return (
    <div>
      <div className="AdminDashboard">
        <div className="DashboardGlass">
          <SideBar />

          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
