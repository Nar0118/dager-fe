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

// const data = [
//   {
//       "name": "CHEVROLET (GM)",
//       "model": "C/K PICK-UP",
//       "year": "01.89~01.03",
//       "engineVal": "5700",
//       "engineNo": "L05",
//       "body": "GMT400",
//       "FRONTROTOR": {
//           "name": "BUICK (GM)",
//           "model": "LFX",
//           "year": 2024,
//           "type": "Vented",
//           "bodyChassis": "RH4",
//           "discThicknessMax": 25,
//           "numOfHoles": 5,
//           "height": 49.5,
//           "centeringDiameter": 65,
//           "pitchCircle": 112,
//           "outter": 314,
//           "drum": 145.2,
//           "image": "/uploads/19e98e751f55ccdf8f56e71af51a24d0_thumb (4).jpg",
//           "marka": "PN0308"
//       },
//       "FRONTBRAKE": {
//           "name": "BUICK (GM)",
//           "model": "LFX",
//           "year": 2024,
//           "Length1": 142.7,
//           "Width1": 69.5,
//           "Thickness1": 18.5,
//           "bodyChassis": "DE1",
//           "discThicknessMax": 23,
//           "numOfHoles": 5,
//           "PcsInSet": 4,
//           "BrakeSystem": "Ate - Teves",
//           "image": "/uploads/9bb452907d9a3568c2dcd2d5597e84ff_thumb.jpg",
//           "marka": "PN0308"
//       },
//       "REARROTOR": {
//           "name": "BUICK (GM)",
//           "model": "LFX",
//           "year": 2024,
//           "type": "Solid",
//           "discThicknessMax": 10,
//           "numOfHoles": 5,
//           "height": 48.5,
//           "centeringDiameter": 65,
//           "pitchCircle": 112,
//           "outter": 300,
//           "drum": 124,
//           "bodyChassis": "DE1",
//           "image": "/uploads/033619f104018b9bd784529644b451b2_thumb.jpg",
//           "marka": "FN11097"
//       },
//       "REARBRAKE": {
//           "model": "LFX",
//           "year": 2024,
//           "Length1": 87.2,
//           "Width1": 67.1,
//           "Thickness1": 16,
//           "bodyChassis": "DE1",
//           "discThicknessMax": 23,
//           "numOfHoles": 5,
//           "PcsInSet": 4,
//           "BrakeSystem": "1ps WIRE-SENSOR",
//           "image": "/uploads/03dc3b0e8308f0603e78399a2f011069_thumb (4).jpg",
//           "marka": "FN11097"
//       },
//       "PARKINGSHOE": {
//           "model": "LFX",
//           "year": 2024,
//           "Radius": 92.5,
//           "Width1": 20,
//           "PcsInSet": 4,
//           "Thickness1": 6,
//           "image": "/uploads/8afcf16458f9306e75f45d6c2d0e39f6_thumb.jpg",
//           "marka": ""
//       }
//   }
// ]

// const addCar = async (carData) => {
//   try {
//     await axios.post(`${process.env.REACT_APP_API_URL}/api`, carData, {
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUxY2M4ZGVlNWIxNjllNzQ2MjM1ODUiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE5ODMzMDI2fQ.v5ETF47O5Rt7iYoR1m_QXndv1BRfWfkGR59x4uOJvxM`,
//       },
//     });
//     console.log(`Data for year ${carData.year} added successfully.`);
//   } catch (error) {
//     console.error(`Error adding data for year ${carData.year}:`, error);
//   }
// };

// const sendAllData = async () => {
//   for (const car of data) {
//     await addCar({
//       ...car,
//     });
//   }
// };

function App() {
  useEffect(() => {
    // sendAllData();

    const handleClick = (event) => {
      const navElements = document.querySelectorAll(".nav-elements");
      if (!event?.target?.id || !event?.target?.id.includes("Rectangle")) {
        navElements.forEach((element) => {
          element.classList.remove("active");
        });
      }
    };

    const rootElement = document.getElementById("root");

    if (rootElement) {
      rootElement.addEventListener("click", handleClick);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("click", handleClick);
      }
    };
  }, []);

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
