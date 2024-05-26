import React from "react";
import { Tabs } from "antd";
import PaginatedTable from "./AdminList";
import { FormDisabledDemo } from "./AddCar";

const items = [
  {
    key: "1",
    label: "Tab 1",
    children: <PaginatedTable />,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: <FormDisabledDemo selectedProduct={undefined} onOk={undefined} />,
  },
];

function TaberaAper() {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default TaberaAper;
