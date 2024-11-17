import { useState } from 'react';
import MainDash from './contents/MainDash/MainDash';
import RightSide from './component/RightSide/RightSide';
import SideBar from './component/SideBar/SideBar';
import './css/AdminDashboard.css'
import Datatable from './component/UserManage/Datatable';
import RoomTable from './component/RoomsManage/RoomTable';


function AdminDashboard(){
    const [selectedComponent, setSelectedComponent] = useState('MainDash');
    const renderMainContent = () => {
        switch (selectedComponent) {
          case 'MainDash':
            return <MainDash/>;
          case 'UserManage':
            return <Datatable/>;
            case 'RoomManage':
            return <RoomTable/>;
          default:
            return <div/>;
        }
      };
    return(
        <div className="AdminDashboard" >
            <div className="DashboardGlass">
                <SideBar setSelectedComponent ={setSelectedComponent}/>
                {renderMainContent()}
                <RightSide/>
            </div>
        </div>
    )
}
export default AdminDashboard;