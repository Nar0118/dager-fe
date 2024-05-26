import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api");
        setCars(data.data);
      } catch (e) {
        console.error(e);
      }   
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Car Catalogue</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <Link to={`/catalogue/${car._id}`}>
              {car.name} {car.model} ({car.year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
