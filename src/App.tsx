import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Navbar";
import "./App.css";
import FooterComponent from "./Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { EmployeeChart } from "./Pages/Employee";
import { Benchmarking } from "./Pages/Benchmarking";

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
            <Route path="/employee-mood-tracker" element={<EmployeeChart />} />
            <Route path="/benchmarking" element={<Benchmarking />} />

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
