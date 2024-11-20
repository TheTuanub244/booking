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
import AddNewUser from "./pages/admin/contents/AddNewUser/AddNewUser";
import ProperyList from "./pages/partner/propertylist/PropertyList";
import InformationDashboard from "./pages/partner/informationDashboard/InformationDashboard";
import Payment from "./pages/payment/Payment";
import PartnerPropertyDetailPage from "./pages/partner/propertyDetail/PartnerPropertyDetailPage";
import SearchResult from "./pages/searchResult/SearchResult";
import { useEffect } from "react";
import socketService from "./helpers/sockerService";
import PartnerBookingDetail from "./pages/partner/partnerBookingDetail/PartnerBookingDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route path="new" element={<AddNewUser />} />
        </Route>
        <Route
          path="/partner/partnerDashboard"
          element={<PartnerDashboard />}
        />
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
