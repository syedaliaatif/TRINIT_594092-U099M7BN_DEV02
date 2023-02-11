import { BrowserRouter , Route , Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import Login from "./pages/Login";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import "./App.css";




function App () {
  return (
   <BrowserRouter>
  <HeaderComponent />
   <Routes>
   <Route path ="/" element={<Dashboard/>}/>
    <Route path ="/login" element={<Login/>}/>
    <Route path ="/timeline" element={<Timeline/>}/>
   </Routes>
   <FooterComponent/>
   </BrowserRouter>
  
  );
}

export default App;

