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
  useEffect(() => {
    const fetchData = async () => {
      console.log(6666666, 'hasav');
      try {
        const response = await fetch('https://www.jnbk-brakes.com/application/get_applications/5427/1/0/0/0?body_value=0&eng_no=0');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        console.log(66666, response);
        const html = await response.text();
        console.log(66666, html);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<CarPage />} />
        <Route path="/catalogue/:carId" element={<CarDetails />} /> 
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
