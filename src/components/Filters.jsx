import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, Space } from "antd";
import axios from "axios";

import "./styles.css";

const Filters = ({ data, onFilter, onReset }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    year: "",
    engineNo: "",
    engineVal: "",
    body: "",
  });
  const [names, setNames] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [body, setBody] = useState([]);
  const [engineNo, setEngineNo] = useState([]);
  const [engineVal, setEngineVal] = useState([]);

  const handleChange = (type, value) => {
    if (type === "name") {
      setFilters({
        name: value,
        model: "",
        year: "",
        engineNo: "",
        engineVal: "",
      });
    } else {
      const updatedFilters = { ...filters, [type]: value };
      setFilters(updatedFilters);
    }
  };

  const getNames = async () => {
    try {
      const {
        data: { names },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/names`);
      setNames(names);
    } catch (e) {
      console.error(e);
    }
  };

  const getModels = async () => {
    try {
      const {
        data: { models },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/models`, {
        params: {
          name: filters?.name,
        },
      });

      setModels(models);
    } catch (e) {
      console.error(e);
    }
  };

  const getYears = async () => {
    try {
      const {
        data: { years, body, engineNo, engineVal },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/years`, {
        params: {
          model: filters?.model,
        },
      });

      setYears(years);
      setBody(body);
      setEngineNo(engineNo);
      setEngineVal(engineVal);
    } catch (e) {
      console.error(e);
    }
  };

  // const getData = () => {
  //   const newData = [];

  //   for (let i = 0; i < data.length; i++) {
  //     const element = data[i];
  //     if (newData.every((e) => !e?.name?.includes(element.name))) {
  //       newData.push(element);
  //     }
  //   }

  //   return newData?.map((item) => {
  //     return {
  //       ...item,
  //       value: item.name,
  //       label: item.name,
  //     };
  //   });
  // };

  useEffect(() => {
    // const applyFilters = (data, filters) => {
    //   return data.filter((item) => {
    //     return Object.keys(filters).every((key) => {
    //       if (filters[key] === "") {
    //         return true;
    //       }

    //       return item[key] === filters[key];
    //     });
    //   });
    // };

    getNames();
    onFilter(filters);
    filters?.name && getModels();
    filters?.model && getYears();
  }, [filters]);

  return (
    <Space wrap className="filterItems">
      <div className="filterItem">
        <label htmlFor="name">{t("Name")}</label>
        <Select
          id="name"
          value={filters.name}
          showSearch
          style={{ width: 200 }}
          placeholder={t("Maker")}
          optionFilterProp="label"
          onChange={(e) => handleChange("name", e)}
          options={names?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>

      <div className="filterItem">
        <label htmlFor="model">{t("Model")}</label>
        <Select
          id="model"
          value={filters.model}
          showSearch
          style={{ width: 200 }}
          placeholder={t("Model")}
          optionFilterProp="label"
          disabled={!filters?.name}
          onChange={(e) => handleChange("model", e)}
          options={models?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>
      <div className="filterItem">
        <label htmlFor="year">{t("Year")}</label>
        <Select
          id="year"
          value={filters.year}
          showSearch
          defaultValue={t("Year")}
          style={{ width: 120 }}
          // allowClear
          disabled={!filters?.name || !filters?.model}
          onChange={(e) => handleChange("year", e)}
          options={years?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>
      <div className="filterItem">
        <label htmlFor="body">{t("Body")}</label>
        <Select
          id="body"
          value={filters.body}
          showSearch
          onChange={(e) => handleChange("body", e)}
          defaultValue="Body / Chasis"
          style={{ width: 120 }}
          disabled={!filters?.name || !filters?.model}
          options={body?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>
      <div className="filterItem">
        <label htmlFor="engineVal">{t("Engine Vol")}</label>
        <Select
          id="engineVal"
          value={filters.engineVal}
          showSearch
          defaultValue={t("Engine Vol")}
          style={{ width: 120 }}
          // loading
          disabled={!filters?.name || !filters?.model}
          onChange={(e) => handleChange("engineVal", e)}
          options={engineVal?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>
      <div className="filterItem">
        <label htmlFor="engineNo">{t("Engine No")}</label>
        <Select
          id="engineNo"
          value={filters.engineNo}
          showSearch
          defaultValue={t("Engine No")}
          style={{ width: 120 }}
          // allowClear
          onChange={(e) => handleChange("engineNo", e)}
          disabled={!filters?.name || !filters?.model}
          options={engineNo?.map((item) => {
            return {
              ...item,
              value: item,
              label: item,
            };
          })}
        />
      </div>
      <Button
        onClick={() => {
          setFilters({
            name: "",
            model: "",
            year: "",
          });
        }}
      >
        {t("Reset")}
      </Button>
    </Space>
  );
};

export default Filters;
