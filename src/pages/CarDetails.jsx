import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetailPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${carId}`);
        setCar(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>No car found</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        columnGap: "70px",
      }}
    >
      <div>
        <img src={car.image} alt="" />
      </div>
      <div>
        <h1>{car.name}</h1>
        <p>Model: {car.model}</p>
        <p>Year: {car.year}</p>
        <p>Type: {car.type}</p>
        <p>Body Chassis: {car.bodyChassis}</p>
        <p>Engine Val: {car.engineVal}</p>
        <p>Engine No: {car.engineNo}</p>
        <p>Disc Thickness Max: {car.discThicknessMax}</p>
        <p>Num Of Holes: {car.numOfHoles}</p>
        <p>Height: {car.height}</p>
        <p>Centering Diameter: {car.centeringDiameter}</p>
        <p>Front/Rear: {car.frontRear}</p>
        <p>Outter: {car.outter}</p>
        <p>Pitch Circle: {car.pitchCircle}</p>
        <p>Drum: {car.drum}</p>
        <p>Bendix: {car.bendix}</p>
        <p>Bendix Eur: {car.bendixEur}</p>
      </div>
    </div>
  );
};

export default CarDetailPage;
