import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarDetails = ({ id }) => {
  const [car, setCar] = useState(null);

  const getData = async() => {
    try {
      await axios.get(`http://localhost:5000/cars/${id}`);
    } catch(e){
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
      <p>Year: {car.year}</p>
      <p>Engine: {car.specifications.engine}</p>
      <p>Horsepower: {car.specifications.horsepower} HP</p>
      <p>Torque: {car.specifications.torque} Nm</p>
      <p>Weight: {car.specifications.weight} kg</p>
    </div>
  );
};

export default CarDetails;
