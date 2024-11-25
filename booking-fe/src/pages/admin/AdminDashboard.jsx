import SideBar from "./component/SideBar/SideBar";
import "./AdminDashboard.css";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="AdminDashboard">
      <div className="DashboardGlass">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
