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
import ProperyList from "./pages/partner/propertylist/PropertyList";
import InformationDashboard from "./pages/partner/informationDashboard/InformationDashboard";
import Payment from "./pages/payment/Payment";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
