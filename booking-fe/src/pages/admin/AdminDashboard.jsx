import { useState } from 'react';
import MainDash from './component/MainDash/MainDash';
import RightSide from './component/RightSide/RightSide';
import SideBar from './component/SideBar/SideBar';
import './AdminDashboard.css'
import Datatable from './component/UserManage/Datatable';
import RoomTable from './component/RoomsManage/RoomTable';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './contents/DashBoard/DashBoard';


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
                { <Routes>
                  <Route path='/' element = {<DashBoard/>} ></Route>
                  <Route path='/user' element = {<Datatable/>} ></Route>
                  <Route path='/rooms' element = {<RoomTable/>} ></Route>
                 </Routes> }
                
            </div>
        </div>
    )
}
export default AdminDashboard;