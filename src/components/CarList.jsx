import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Spin, Tabs } from "antd";
import { Search } from "./Search";
import Filters from "./Filters";
import RecommendProduct from "./RecommendProduct";

import "./styles.css";

export const CarList = () => {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allCars, setAllCars] = useState([]);
  const [current, setCurrent] = useState(1);
  const cancelTokenSource = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      Array.isArray(cars) && cars?.length && setLoading(false)
    }, 500);
  }, [t])

  const fetchData = async (search, params) => {
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
          limit: 30,
          _page: 1,
          ...params
        },
        cancelToken: cancelTokenSource.current.token,
      });

      setCars(data?.data);
      setAllCars(data?.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <div className={current == 1 ? "tabActive" : "tabDeActive"}>
          {t("Search")}
        </div>
      ),
      children: (
        <Search
          onChange={async(search) => {
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
            await fetchData(search)
          }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className={current == 2 ? "tabActive" : "tabDeActive"}>
          {t("Filters")}
        </div>
      ),
      children: (
        <Filters
          data={allCars}
          onFilter={async (filters) => {
            console.log('filters',filters);
            // if (type) {
              await fetchData("", filters)
            // }
            // setLoading(true);
            // setCars(filteredData);
            // setTimeout(() => {
            //   setLoading(false);
            // }, 1000);
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
      {loading ? (
        <div className="loading">
          {/* <img src="/images/loading.gif" /> */}
          <Spin size="large" />
        </div>
      ) : (
        <RecommendProduct car={cars} />
      ) }
    </div>
  );
};
