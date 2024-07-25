import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import RecommendProduct from "../components/RecommendProduct";

import "./styles.css";

const CarDetailPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [recomandedData, setRecomandedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const type = search?.replace("?", "");

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/${carId}`
        );
        setCar(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    if (!!car) {
      const fetchRecomandedProducts = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api`,
            {
              params: {
                search: car?.name,
              },
            }
          );

          setRecomandedData(response?.data?.data);
        } finally {
          setLoading(false);
        }
      };

      fetchRecomandedProducts();
    }
  }, [car]);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>No car found</div>;

  return (
    <div className="recommendedItems">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: "70px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={`${process.env.REACT_APP_API_URL}${car[type].image}`}
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
              <p>Model: {car[type].model}</p>

              {car[type]?.year && <p>Year: {car[type].year}</p>}
              {car[type]?.type && <p>Type: {car[type].type}</p>}
              {car[type]?.discThicknessMax && (
                <p>Disc Thickness Max: {car[type].discThicknessMax}</p>
              )}
              {car[type]?.numOfHoles && (
                <p>Num Of Holes: {car[type].numOfHoles}</p>
              )}
              {car[type]?.height && <p>Height: {car[type].height}</p>}
              {car[type]["Thickness-1"] && (
                <p>Thickness: {car[type]["Thickness-1"]}</p>
              )}
              {car[type].centeringDiameter && (
                <p>Centering Diameter: {car[type].centeringDiameter}</p>
              )}
            </div>
            <div>
              {car[type]["Pcs In Set"] && (
                <p>Pcs In Set: {car[type]["Pcs In Set"]}</p>
              )}
              {car[type]["Brake System"] && (
                <p>Brake System: {car[type]["Brake System"]}</p>
              )}
              {car[type]["Length-1"] && <p>Length: {car[type]["Length-1"]}</p>}
              {car[type]["Width-1"] && <p>Width: {car[type]["Width-1"]}</p>}
              {car[type]?.pitchCircle && (
                <p>Pitch Circle: {car[type].pitchCircle}</p>
              )}
              {car[type]?.outter && <p>Outter: {car[type].outter}</p>}
              {car[type]?.drum && <p>Drum: {car[type].drum}</p>}
              {car[type]?.bodyChassis && (
                <p>Body Chassis: {car[type].bodyChassis}</p>
              )}
              {car[type]?.engineVal && <p>Engine Val: {car[type].engineVal}</p>}
              {car[type]?.engineNo && <p>Engine No: {car[type].engineNo}</p>}
              {car[type]?.body && <p>Body: {car[type].body}</p>}
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
              {car[type]?.name && <span>NAME: {car[type].name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <RecommendProduct car={recomandedData} isFilter />
    </div>
  );
};

export default CarDetailPage;
