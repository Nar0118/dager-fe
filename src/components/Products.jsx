/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Products = ({ handleShowNavbar }) => {
  const { t } = useTranslation();
  const items = [
    {
      key: "1",
      label: (
        <Link onClick={handleShowNavbar} to="/catalogue">
          {t("Catalogue")}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link onClick={handleShowNavbar} to="/sparkPlugs">
          {t("Spark plugs")}
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link onClick={handleShowNavbar} to="/wiperBlades">
          {t("Wiper blades")}
        </Link>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ cursor: "pointer" }}>
          {t("Products")}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default Products;
