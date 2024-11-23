import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import SignupPage from "./pages/signup/Signup-page";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Auth from "./pages/auth/Auth";
import Property from "./pages/property/Property";
import PartnerDashboard from "./pages/partner/partnerDashboard/partnerDashboard";
import PartnerRegister from "./pages/partner/partnerRegister/partnerRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProperyList from "./pages/partner/propertylist/PropertyList";
import InformationDashboard from "./pages/partner/informationDashboard/InformationDashboard";
import Payment from "./pages/payment/Payment";
import PartnerPropertyDetailPage from "./pages/partner/propertyDetail/PartnerPropertyDetailPage";
import SearchResult from "./pages/searchResult/SearchResult";
import { useEffect } from "react";
import socketService from "./helpers/sockerService";
import PartnerBookingDetail from "./pages/partner/partnerBookingDetail/PartnerBookingDetail";
import 'bootstrap/dist/css/bootstrap.min.css';import DashBoard from "./pages/admin/contents/DashBoard/DashBoard";
import UserTable from "./pages/admin/component/UserTable/UserTable";
import RoomTable from "./pages/admin/component/RoomsTable/RoomTable";
import UserManage from "./pages/admin/contents/user/UserManage/UserManage";
import RoomManage from "./pages/admin/contents/room/RoomManage/RoomManage";
import ViewRoom from "./pages/admin/contents/room/ViewRoom/ViewRoom";
import ViewUser from "./pages/admin/contents/user/ViewUser/ViewUser";
import BookingManage from "./pages/admin/contents/BookingManage/BookingManage";
import Analytics from "./pages/admin/contents/Analytics/Analytics";
import EditUser from "./pages/admin/contents/user/EditUser/EditUser";
import PropertyManage from "./pages/admin/contents/property/PropertyManage/PropertyManage";
import PropertyTable from "./pages/admin/component/PropertyTable/PropertyTable";
import AddNewProperty from "./pages/admin/contents/property/AddNewProperty/AddNewProperty";
import ViewProperty from "./pages/admin/contents/property/ViewProperty/ViewProperty";
import EditProperty from "./pages/admin/contents/property/EditProperty/EditProperty";
import ViewPartnerRequest from "./pages/admin/contents/partnerRequest/ViewPartnerRequest/ViewPartnerRequest";
import AddNewRoom from "./pages/admin/contents/room/AddNewRoom/AddNewRoom";
import AddNewUser from "./pages/admin/contents/user/AddNewUser/AddNewUser";
import PropertyManageList from "./pages/admin/contents/property/PropertyList/PropertyManageList";

function App() {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    socketService.connect(userId);
    return () => {
      socketService.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/hotels" element={<List />}></Route>
        <Route path="/hotels/:id" element={<Hotel />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/property" element={<Property />}></Route>
        <Route path="/property/:id" element={<Property />}></Route>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<DashBoard />} />
          <Route path="booking" element={<BookingManage />}/>
          <Route path="partnerRequest" element={<ViewPartnerRequest />}></Route>
          <Route path="user" element={<UserManage />}>
            <Route path="" element={<UserTable />} />
            <Route path="new" element={<AddNewUser />} />
            <Route path="view/:id" element={<ViewUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          <Route path="property" element={<PropertyManage />}>
            <Route path="" element={<PropertyManageList />} />
            <Route path="new" element={<AddNewProperty />} />
            <Route path="view/:id" element={<ViewProperty />} />
            <Route path="edit/:id" element={<EditProperty />} />
          </Route>
          <Route path="room" element={<RoomManage />} >
            <Route path="" element={<RoomTable />} />
              <Route path="new" element={<AddNewRoom />} />
              <Route path="view/:id" element={<ViewRoom />} />
          </Route>
          <Route path="analytic" element={<Analytics />}/>
        </Route>
        <Route path="/partner/partnerDashboard" element={<PartnerDashboard />} />
        <Route path="/partner/partnerRegister" element={<PartnerRegister />} />
        <Route path="/partner/propertyList/:id" element={<ProperyList />} />
        <Route
          path="/partner/informationDashboard/:id"
          element={<InformationDashboard />}
        />
        <Route path="/payment" element={<Payment />}></Route>
        <Route
          path="/partner/partnerPropertyDetailPage/:id"
          element={<PartnerPropertyDetailPage />}
        />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/partnerBookingDetail/:id" element={<PartnerBookingDetail/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
