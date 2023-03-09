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




function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/website/dashboard" element={<Dashboard />} />
        <Route path="/website/search" element={<WebsiteSearchPage />} />
        <Route path="/search" element={<GoogleSearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;

