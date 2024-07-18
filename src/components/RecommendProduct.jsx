import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import axios from "axios";

import "./styles.css";
import { useTranslation } from "react-i18next";

const RecommendProduct = ({ car, isFilter }) => {
  const [collapseData, setCollapseData] = useState([]);
  const { t, i18n } = useTranslation();
  const onChange = (key) => {
    // console.log(key);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          name: car?.name || car?.model,
          year: car?.year,
        },
      });

      const datum = isFilter ? data.data : car;

      setCollapseData(
        datum
          // .filter((e) => e._id !== car._id)
          .map((r) => {
            return {
              ...r,
              label: `${r.name} » ${r.model}`,
              children: (
                <div
                  className={`collapseColumns ${
                    r?.PARKINGSHOE ? "collapseColumns9" : "collapseColumns8"
                  }`}
                >
                  <p>
                    <p>{t("Name")}</p>
                    <hr />
                    {r.name}
                  </p>
                  <p>
                    <p>{t("Year")}</p>
                    <hr />
                    {r.year}
                  </p>
                  <p>
                    <p>{t("Engine Vol")}</p>
                    <hr />
                    {r.engineVal}
                  </p>
                  <p>
                    <p>{t("Engine No")}</p>
                    <hr />
                    {r.engineNo}
                  </p>
                  <p>
                    <p>{t("FRONT ROTOR")}</p>
                    <hr />
                    <a href={`/catalogue/${r._id}?FRONTROTOR`} target="_blank">
                      {r.FRONTROTOR.marka}
                    </a>
                  </p>
                  <p>
                    <p>{t("FRONT BRAKE")}</p>
                    <hr />
                    <a href={`/catalogue/${r._id}?FRONTBRAKE`} target="_blank">
                      {r.FRONTBRAKE.marka}
                    </a>
                  </p>
                  <p>
                    <p>{t("REAR ROTOR")}</p>
                    <hr />
                    <a href={`/catalogue/${r._id}?REARROTOR`} target="_blank">
                      {r.REARROTOR.marka}
                    </a>
                  </p>
                  <p>
                    <p>{t("REAR BRAKE")}</p>
                    <hr />
                    <a href={`/catalogue/${r._id}?REARBRAKE`} target="_blank">
                      {r.REARBRAKE.marka}
                    </a>
                  </p>
                  {!!r?.PARKINGSHOE && (
                    <p>
                      <p>PARKING SHOE</p>
                      <hr />
                      <a
                        href={`/catalogue/${r._id}?PARKINGSHOE`}
                        target="_blank"
                      >
                        {r?.PARKINGSHOE?.marka}
                      </a>
                    </p>
                  )}
                </div>
              ),
            };
          })
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [car]);

  return (
    <>
      {collapseData?.length ? (
        <Collapse
          items={collapseData}
          // defaultActiveKey={["1"]}
          onChange={onChange}
          className="collapse"
        />
      ) : null}
    </>
  );
};

export default RecommendProduct;
