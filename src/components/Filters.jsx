import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, Space } from "antd";

const Filters = ({ data, onFilter, onReset }) => {
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    year: "",
  });

  const handleChange = (type, value) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilters(updatedFilters);
  };
  const getData = () => {
    const newData = [];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (newData.every((e) => !e.name.includes(element.name))) {
        newData.push(element);
      }
    }

    return newData?.map((item) => {
      return {
        ...item,
        value: item.name,
        label: item.name,
      };
    });
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
        showSearch
        style={{ width: 200 }}
        placeholder={t("Maker")}
        optionFilterProp="label"
        onChange={(e) => handleChange("name", e)}
        options={getData()}
      />

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={t("Model")}
        optionFilterProp="label"
        disabled={!filters?.name}
        onChange={(e) => handleChange("model", e)}
        options={[
          ...new Set(
            data.filter((e) => e.name === filters.name).map((e) => e.model)
          ),
        ].map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
      />

      <Select
        showSearch
        defaultValue={t("Year")}
        style={{ width: 120 }}
        // allowClear
        disabled={!filters?.name || !filters?.model}
        onChange={(e) => handleChange("year", e)}
        options={[
          ...new Set(
            data.filter((e) => e.name === filters.name).map((e) => e.year)
          ),
        ]
          .sort()
          .map((item) => {
            return {
              value: item,
              label: item,
            };
          })}
      />
      {/* <Select
        showSearch
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
      /> */}
      <Select
        showSearch
        defaultValue={t("Engine Vol")}
        style={{ width: 120 }}
        // loading
        disabled={!filters?.name || !filters?.model}
        onChange={(e) => handleChange("year", e)}
        options={[
          ...new Set(
            data.filter((e) => e.name === filters.name).map((e) => e.engineVal)
          ),
        ].map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
      />
      <Select
        showSearch
        defaultValue={t("Engine No")}
        style={{ width: 120 }}
        // allowClear
        disabled={!filters?.name || !filters?.model}
        options={[
          ...new Set(
            data.filter((e) => e.name === filters.name).map((e) => e.engineNo)
          ),
        ].map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
      />
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
