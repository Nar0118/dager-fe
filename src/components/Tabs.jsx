import React from "react";
import { Tabs } from "antd";
import PaginatedTable from "./AdminList";
import { FormDisabledDemo } from "./AddCar";

const items = [
  {
    key: "1",
    label: "Products",
    children: <PaginatedTable />,
  },
  {
    key: "2",
    label: "Add a new product",
    children: <FormDisabledDemo />,
  },
];

function AdminTabs() {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default AdminTabs;
