import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import Login from "./pages/Login";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import "./App.css";
import HomePage from "./pages/Homepage";
import WebsiteSearchPage from "./pages/WebsiteSearchPage";
import GoogleSearchPage from "./pages/GoogleSearchPage";

import Register from "./pages/Register";
import { useEffect, useState } from "react";
import AuthService from "./services/auth.service";
import userService from "./services/user.service";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserSearchPage from "./pages/UserSearchPage";
import ProtectedRouteComponent from "./components/ProtectedRouteComponents";
import NotFoundPage from "./pages/NotFoundPage";




function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    console.log(`Current user is`, currentUser);
    setUser(currentUser);
  }, []);

  return (
    <BrowserRouter>
      <HeaderComponent user={user} setUser={setUser} />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/website/dashboard" element={<Dashboard />} />
        <Route path="/website/search" element={<WebsiteSearchPage />} />
        <Route element={<ProtectedRouteComponent user={user} />}>
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/user/search" element={<UserSearchPage />} />
        </Route>

        <Route path="/search" element={<GoogleSearchPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/pagenotfound" element={<NotFoundPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;

