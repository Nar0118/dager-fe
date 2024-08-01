import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";

import "./styles.css";

const RecommendProduct = ({ car, isFilter }) => {
  const [collapseData, setCollapseData] = useState([]);
  const { t } = useTranslation();
  const onChange = (key) => {
  };

  const fetchProducts = async () => {
    try {
      setCollapseData(
        car?.map((r) => {
            return {
              ...r,
              label: `${r.name} » ${r.model}`,
              children: (
                <div
                  className={`collapseColumns ${
                    r?.PARKINGSHOE ? "collapseColumns9" : "collapseColumns8"
                  }`}
                >
                  {r?.name && (
                    <p>
                      <p>{t("Name")}</p>
                      <hr />
                      {r.name}
                    </p>
                  )}
                  {r?.year && (
                    <p>
                      <p>{t("Year")}</p>
                      <hr />
                      {r.year}
                    </p>
                  )}
                  {r?.engineVal && (
                    <p>
                      <p>{t("Engine Vol")}</p>
                      <hr />
                      {r.engineVal}
                    </p>
                  )}
                  {r?.engineNo && (
                    <p>
                      <p>{t("Engine No")}</p>
                      <hr />
                      {r.engineNo}
                    </p>
                  )}
                  {r?.body && (
                    <p>
                      <p>{t("Body")}</p>
                      <hr />
                      {r?.body}
                    </p>
                  )}
                  {/* {r?.FRONTROTOR?.marka && r?.FRONTROTOR?.marka !== " " && (
                    <p>
                      <p>{t("FRONT ROTOR")}</p>
                      <hr />
                      <a
                        href={`/catalogue/${r._id}?FRONTROTOR`}
                        target="_blank"
                      >
                        {r.FRONTROTOR.marka}
                      </a>
                    </p>
                  )} */}
                  {r?.FRONTBRAKE?.marka && r?.FRONTBRAKE?.marka !== " " && (
                    <p>
                      <p>{t("FRONT BRAKE")}</p>
                      <hr />
                      <a
                        href={`/catalogue/${r._id}?FRONTBRAKE`}
                        target="_blank"
                      >
                        {r.FRONTBRAKE.marka}
                      </a>
                    </p>
                  )}
                  {/* {r?.REARROTOR?.marka && r?.REARROTOR?.marka !== " " && (
                    <p>
                      <p>{t("REAR ROTOR")}</p>
                      <hr />
                      <a href={`/catalogue/${r._id}?REARROTOR`} target="_blank">
                        {r.REARROTOR.marka}
                      </a>
                    </p>
                  )} */}
                  {r?.REARBRAKE?.marka && r?.REARBRAKE?.marka !== " " && (
                    <p>
                      <p>{t("REAR BRAKE")}</p>
                      <hr />
                      <a href={`/catalogue/${r._id}?REARBRAKE`} target="_blank">
                        {r.REARBRAKE.marka}
                      </a>
                    </p>
                  )}
                  {r?.PARKINGSHOE?.marka && r?.PARKINGSHOE?.marka !== " " && (
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
