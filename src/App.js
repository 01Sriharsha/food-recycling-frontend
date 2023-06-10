import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import AddArea from "./components/admin/pages/AddArea";
import AddCity from "./components/admin/pages/AddCity";
import AllDonations from "./components/admin/pages/AllDonations";
import ManageDonors from "./components/admin/pages/ManageDonors";
import ManageMembers from "./components/admin/pages/ManageMembers";
import Register from "./components/authentication/Register";
import DonationForm from "./components/donor/pages/DonationForm";
import Home from "./components/Home/Home";
import Login from "./components/authentication/Login";
import Header from "./components/layout/Header";
import AuthContext, { CustomContext } from "./context/AuthContext";
import DonationDashboard from "./components/donor/pages/DonorDashboard";
import RequestFood from "./components/member/pages/RequestFood";
import MemberDashboard from "./components/member/pages/MemberDashboard";
import AllFoodRequests from "./components/admin/pages/AllFoodRequests";
import AllEnquiries from "./components/member/pages/AllEnquiries";
import AboutUs from "./components/Home/AboutUs";
import ContactUs from "./components/Home/ContactUs";
import HungerProneAreas from "./components/Home/HungerProne";
import AddFoodType from "./components/admin/pages/AddFoodType";
import InventoryPage from "./components/admin/pages/Inventory";
import ShoutoutPage from "./components/admin/pages/ShoutOut";
import AllShoutOuts from "./components/admin/pages/AllShoutOuts";
import RespondShoutOut from "./components/donor/pages/RespondShoutOut";
import ManageNgos from "./components/admin/pages/ManageNgos";
import NgoDashboard from "./components/NGO/pages/NgoDashBoard";
import AssignNgo from "./components/admin/pages/AssignNgo";
import AllAssignments from "./components/admin/pages/AllAssignments";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };

function AuthenticatedRoute() {
  const context = CustomContext();
  if (context?.isAuthenticated && context?.isAuthenticated !== null) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default function App() {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <AuthContext>
          <ToastContainer />
          <Header />
          <div>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donate" element={<DonationForm />} />
              <Route path="/HungerProneAreas" element={<HungerProneAreas />} />
              <Route path="/inventory" element={<InventoryPage />} />

              {/* Private */}
              <Route path="/" element={<AuthenticatedRoute />}>
                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route path="add-cities" element={<AddCity />} />
                  <Route path="add-areas" element={<AddArea />} />
                  <Route path="food-types" element={<AddFoodType />} />
                  <Route path="all-donations" element={<AllDonations />} />
                  <Route path="manage-donors" element={<ManageDonors />} />
                  <Route path="manage-members" element={<ManageMembers />} />
                  <Route path="manage-ngos" element={<ManageNgos />} />
                  <Route path="all-requests" element={<AllFoodRequests />} />
                  <Route path="enquiries" element={<AllEnquiries />} />
                  <Route path="shoutout" element={<ShoutoutPage />} />
                  <Route path="all-shoutouts" element={<AllShoutOuts />} />
                  <Route
                    path="request/:id/assign-ngo"
                    element={<AssignNgo />}
                  />
                  <Route path="all-assignments" element={<AllAssignments />} />
                </Route>

                {/* NGO */}
                <Route path="/ngo" element={<NgoDashboard />}>
                  <Route path="all-donations" element={<AllDonations />} />
                  <Route path="all-requests" element={<AllFoodRequests />} />
                  <Route path="shoutout" element={<ShoutoutPage />} />
                  <Route path="all-shoutouts" element={<AllShoutOuts />} />
                  <Route path="all-requests" element={<AllFoodRequests />} />
                  <Route path="all-assignments" element={<AllAssignments />} />
                </Route>

                {/* Donor */}
                <Route path="donor" element={<DonationDashboard />}>
                  <Route path="charity" element={<AllDonations />} />
                  <Route path="all-shoutouts" element={<AllShoutOuts />} />
                  <Route path="respond/:id" element={<RespondShoutOut />} />
                </Route>

                {/* Member */}
                <Route path="/member" element={<MemberDashboard />}>
                  <Route path="request-food" element={<RequestFood />} />
                  <Route path="all-requests" element={<AllFoodRequests />} />
                  <Route path="enquiries" element={<AllEnquiries />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}
