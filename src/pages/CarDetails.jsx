import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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

  if (loading) return <div>{t("Loading")}...</div>;
  if (!car) return <div>{t("No car found")}</div>;

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
          <br />
          <h4>{t("Specification")}</h4>
          <br />
          <div className="carDetails">
            <div>
              <p>
                {t("Model")}: {car[type].model}
              </p>

              {car[type]?.year && (
                <p>
                  {t("Year")}: {car[type].year}
                </p>
              )}
              {car[type]?.type && (
                <p>
                  {t("Type")}: {car[type].type}
                </p>
              )}
              {car[type]?.discThicknessMax && (
                <p>
                  {t("Disc Thickness Max")}: {car[type].discThicknessMax}
                </p>
              )}
              {car[type]?.numOfHoles && (
                <p>
                  {t("Num Of Holes")}: {car[type].numOfHoles}
                </p>
              )}
              {car[type]?.height && (
                <p>
                  {t("Height")}: {car[type].height}
                </p>
              )}
              {car[type]["Thickness-1"] && (
                <p>
                  {t("Thickness")}: {car[type]["Thickness-1"]}
                </p>
              )}
              {car[type].centeringDiameter && (
                <p>
                  {t("Centering Diameter")}: {car[type].centeringDiameter}
                </p>
              )}
            </div>
            <div>
              {car[type]["Pcs In Set"] && (
                <p>
                  {t("Pcs In Set")}: {car[type]["Pcs In Set"]}
                </p>
              )}
              {car[type]["Brake System"] && (
                <p>
                  {t("Brake System")}: {car[type]["Brake System"]}
                </p>
              )}
              {car[type]["Length-1"] && (
                <p>
                  {t("Length")}: {car[type]["Length-1"]}
                </p>
              )}
              {car[type]["Width-1"] && (
                <p>
                  {t("Width")}: {car[type]["Width-1"]}
                </p>
              )}
              {car[type]?.pitchCircle && (
                <p>
                  {t("Pitch Circle")}: {car[type].pitchCircle}
                </p>
              )}
              {car[type]?.outter && (
                <p>
                  {t("Outter")}: {car[type].outter}
                </p>
              )}
              {car[type]?.drum && (
                <p>
                  {t("Drum")}: {car[type].drum}
                </p>
              )}
              {car[type]?.bodyChassis && (
                <p>
                  {t("Body")}: {car[type].bodyChassis}
                </p>
              )}
              {car[type]?.engineVal && (
                <p>
                  {t("Engine Vol")}: {car[type].engineVal}
                </p>
              )}
              {car[type]?.engineNo && (
                <p>
                  {t("Engine No")}: {car[type].engineNo}
                </p>
              )}
              {car[type]?.body && (
                <p>
                  {t("Body")}: {car[type].body}
                </p>
              )}
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div>
            {/* <h4>{t("Cross Reference")}</h4> */}
            <div
              style={{
                display: "flex",
                columnGap: "40px",
              }}
            >
              {car[type]?.name && (
                <span>
                  {t("Name")}: {car[type].name}
                </span>
              )}
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
