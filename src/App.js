import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import CarPage from "./pages/CarPage";
import LoginPage from "./pages/Login";
import NotFound from "./pages/404";
import { Navbar } from "./components/Navbar";
import CarDetails from "./pages/CarDetails";
import axios from "axios";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<CarPage />} />
        <Route path="/catalogue/:carId" element={<CarDetails />} />
        {/* <Route path="/catalogue/:id" component={<CarDeta  ils />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
