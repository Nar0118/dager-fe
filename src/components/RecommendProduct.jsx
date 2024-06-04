import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import axios from "axios";

import "./styles.css";

const RecommendProduct = ({ car }) => {
  const [collapseData, setCollapseData] = useState([]);
  const onChange = (key) => {
    console.log(key);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          name: car?.name || car?.model,
          year: car?.year,
        },
      });

      setCollapseData(
        data.data
          .filter((e) => e._id !== car._id)
          .map((r) => {
            return {
              ...r,
              label: `${r.name} » ${r.model}`,
              children: (
                <div className="collapseColumns">
                  <div>{car.years}</div>
                  <div>{car.engineVal}</div>
                  <div>{car.engineNo}</div>
                  <div>{car.bodyChassis}</div>
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
      <div className="collapseColumns">
        <div>Years</div>
        <div>Eng</div>
        <div>Eng No</div>
        <div>Body</div>
      </div>
      <br />
      <br />
      <Collapse
        items={collapseData}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />
    </>
  );
};

export default RecommendProduct;
