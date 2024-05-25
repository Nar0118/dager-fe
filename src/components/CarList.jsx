import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  return (
    <div>
      <h2>Car Catalogue</h2>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>
              {car.make} {car.model} ({car.year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
