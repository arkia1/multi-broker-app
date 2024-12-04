import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketNews from "./pages/main/MarketNews";
import Index from "./pages/help-and-support/Index";
import Hero from "./pages/main/Hero";
import SignUpPage from "./pages/authPages/SignUpPage";
import SignInPage from "../src/pages/authPages/SignInPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import UserProfile from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/main/DashboardPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* general routes */}

          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />

          {/* authenticated routes (protected) */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/market-news" element={<MarketNews />} />
            <Route path="/support" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
