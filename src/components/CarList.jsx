import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { Search } from "./Search";
import Filters from "./Filters";
import PaginatedTable from "./AdminList";

export const CarList = () => {
  const [cars, setCars] = useState([]);
  const cancelTokenSource = useRef(null);

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
      label: "Search",
      children: (
        <Search onChange={(search) => fetchData({ search })} />
      ),
    },
    {
      key: "2",
      label: "Filters",
      children: (
        <Filters
          data={cars}
          onFilter={(filteredData) => {
            setCars(filteredData);
          }}
          onReset={fetchData}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>Car Catalogue</h2>
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
      <br />
      <PaginatedTable cars={cars} />
      {/* <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <Link to={`/catalogue/${car._id}`}>
              {car.name} {car.model} ({car.year})
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
