import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { Search } from "./Search";
import Filters from "./Filters";
// import PaginatedTable from "./AdminList";

import "./styles.css";
import RecommendProduct from "./RecommendProduct";

export const CarList = () => {
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [current, setCurrent] = useState(1);
  const cancelTokenSource = useRef(null);
  console.log(cars);
  const fetchData = async (search) => {
    try {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel(
          "Operation canceled due to new request."
        );
      }

      cancelTokenSource.current = axios.CancelToken.source();
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          search,
        },
        cancelToken: cancelTokenSource.current.token,
      });

      setCars(data.data);
      setAllCars(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <div className={current == 1 ? "tabActive" : "tabDeActive"}>Search</div>
      ),
      children: (
        <Search
          onChange={(search) => {
            const filterData = search
              ? allCars.filter(
                  (e) =>
                    e.FRONTBRAKE.marka
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    e.FRONTROTOR.marka
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    e.REARBRAKE.marka
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    e.REARROTOR.marka
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
              : allCars;
            setCars(filterData);
          }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className={current == 2 ? "tabActive" : "tabDeActive"}>
          Filters
        </div>
      ),
      children: (
        <Filters
          data={allCars}
          onFilter={(filteredData) => {
            setCars(filteredData);
          }}
          onReset={fetchData}
        />
      ),
    },
  ];

  return (
    <div className="tabsContainer">
      <h2>Car Catalogue</h2>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(e) => {
          setCurrent(e);
        }}
      />
      <br />
      <RecommendProduct car={cars} />
    </div>
  );
};
