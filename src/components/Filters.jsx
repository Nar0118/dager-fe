import React, { useEffect, useState } from "react";
import { Button, Select, Space } from "antd";

const Filters = ({ data, onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    year: "",
    type: "",
    bodyChassis: "",
    discThicknessMax: "",
    numOfHoles: "",
    engineVal: "",
    height: "",
    centeringDiameter: "",
    engineNo: "",
    frontRear: "",
    outter: "",
    pitchCircle: "",
    drum: "",
    bendix: "",
    bendixEur: "",
    oem: "",
    vag: "",
    image: "",
  });

  const handleChange = (type, value) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const applyFilters = (data, filters) => {
      return data.filter((item) => {
        return Object.keys(filters).every((key) => {
          if (filters[key] === "") {
            return true;
          }

          return item[key] === filters[key];
        });
      });
    };

    onFilter(applyFilters(data, filters));
  }, [filters]);

  return (
    <Space wrap>
      <Select
        defaultValue="Maker"
        style={{ width: 120 }}
        onChange={(e) => handleChange("name", e)}
        options={data?.map((item) => {
          return {
            ...item,
            value: item.name,
            label: item.name,
          };
        })}
      />
      <Select
        defaultValue="Model"
        style={{ width: 120 }}
        // loading
        disabled={!filters?.name}
        onChange={(e) => handleChange("model", e)}
        options={data
          ?.filter((e) => e.name === filters.name)
          ?.map((item) => {
            return {
              ...item,
              value: item.model,
              label: item.model,
            };
          })}
      />
      <Select
        defaultValue="Year"
        style={{ width: 120 }}
        // allowClear
        disabled={!filters?.name || !filters?.model}
        options={data
          ?.filter((e) => e.name === filters.name && e.model === filters.model)
          ?.map((item) => {
            return {
              ...item,
              value: item.year,
              label: item.year,
            };
          })}
      />
      <Select
        defaultValue="Body / Chasis"
        style={{ width: 120 }}
        disabled={!filters?.name || !filters?.model}
        options={data
          ?.filter((e) => e.name === filters.name && e.model === filters.model)
          ?.map((item) => {
            return {
              ...item,
              value: item.bodyChassis,
              label: item.bodyChassis,
            };
          })}
      />
      <Select
        defaultValue="Engine Vol"
        style={{ width: 120 }}
        // loading
        disabled={!filters?.name || !filters?.model}
        options={data
          ?.filter((e) => e.name === filters.name && e.model === filters.model)
          ?.map((item) => {
            return {
              ...item,
              value: item.engineVal,
              label: item.engineVal,
            };
          })}
      />
      <Select
        defaultValue="Engine No"
        style={{ width: 120 }}
        // allowClear
        disabled={!filters?.name || !filters?.model}
        options={data
          ?.filter((e) => e.name === filters.name && e.model === filters.model)
          ?.map((item) => {
            return {
              ...item,
              value: item.engineNo,
              label: item.engineNo,
            };
          })}
      />
      <Button onClick={() => onReset()}>Reset</Button>
    </Space>
  );
};

export default Filters;
