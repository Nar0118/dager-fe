import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecommendProduct from "../components/RecommendProduct";

import "./styles.css";

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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: "70px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <img
            src={car.image}
            alt=""
            style={{
              maxWidth: "235px",
            }}
          />
        </div>
        <div>
          <h4>Specification</h4>
          <div className="carDetails">
            <div>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <p>Type: {car.type}</p>
              <p>Disc Thickness Max: {car.discThicknessMax}</p>
              <p>Num Of Holes: {car.numOfHoles}</p>
              <p>Height: {car.height}</p>
              <p>Centering Diameter: {car.centeringDiameter}</p>
            </div>
            <div>
              <p>Front/Rear: {car.frontRear}</p>
              <p>Pitch Circle: {car.pitchCircle}</p>
              <p>Outter: {car.outter}</p>
              <p>Drum: {car.drum}</p>
              <p>Body Chassis: {car.bodyChassis}</p>
              <p>Engine Val: {car.engineVal}</p>
              <p>Engine No: {car.engineNo}</p>
            </div>
          </div>
          <hr />
          <div>
            <h4>Cross Reference</h4>
            <div
              style={{
                display: "flex",
                columnGap: "40px",
              }}
            >
              {car.name && <span>NAME: {car.name}</span>}
              {car.bendix && <span>BENDIX: {car.bendix}</span>}
              {car.bendixEur && <span>BENDIX EUR: {car.bendixEur}</span>}
            </div>
          </div>
        </div>
      </div>
      <RecommendProduct car={car} />
    </>
  );
};

export default CarDetailPage;
