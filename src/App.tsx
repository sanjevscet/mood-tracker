import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Navbar";
import "./App.css";
import FooterComponent from "./Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div>
          <NavbarComponent />
        </div>

        <div className="containers mt-3 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mood-tracker" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div>
          <FooterComponent />
        </div>
      </Router>
    </div>
  );
};

export default App;
