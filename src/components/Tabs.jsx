import React from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import PaginatedTable from "./AdminList";
import { FormDisabledDemo } from "./AddCar";

function AdminTabs() {
  const { t } = useTranslation();

  const items = [
    {
      key: "1",
      label: t("Products"),
      children: <PaginatedTable />,
    },
    {
      key: "2",
      label: t("Add a new product"),
      children: <FormDisabledDemo />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default AdminTabs;
