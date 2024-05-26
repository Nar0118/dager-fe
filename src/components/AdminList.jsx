import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import axios from "axios";
import { AdminModal } from "./Modal";
import openNotification from "./notice";

import "./styles.css";

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          _page: params.pagination.current,
          _limit: params.pagination.pageSize,
        },
      });

      setData(response.data.data);
      setPagination({
        ...params.pagination,
        total: parseInt(response.headers["x-total-count"], 10),
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ pagination });
  }, []);

  const handleTableChange = (pagination) => {
    fetchData({
      pagination,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      _id: "name",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      _id: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      _id: "year",
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      _id: "type",
    },
    {
      title: "Body Chassis",
      name: "bodyChassis",
      key: "bodyChassis",
      _id: "bodyChassis",
    },
    {
      title: "Engine Val",
      dataIndex: "engineVal",
      key: "engineVal",
      _id: "engineVal",
    },
    {
      title: "Engine No",
      dataIndex: "engineNo",
      key: "engineNo",
      _id: "engineNo",
    },
    {
      title: "Disc Thickness Max.",
      dataIndex: "discThicknessMax",
      key: "discThicknessMax",
      _id: "discThicknessMax",
    },
    {
      title: "Num Of Holes",
      dataIndex: "numOfHoles",
      key: "numOfHoles",
      _id: "numOfHoles",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      _id: "height",
    },
    {
      title: "Centering Diameter",
      dataIndex: "centeringDiameter",
      key: "centeringDiameter",
      _id: "centeringDiameter",
    },
    {
      title: "Front/Rear",
      dataIndex: "frontRear",
      key: "frontRear",
      _id: "frontRear",
    },
    {
      title: "Outter",
      dataIndex: "outter",
      key: "outter",
      _id: "outter",
    },
    {
      title: "Pitch Circle",
      dataIndex: "pitchCircle",
      key: "pitchCircle",
      _id: "pitchCircle",
    },
    {
      title: "Drum",
      dataIndex: "drum",
      key: "drum",
      _id: "drum",
    },
    {
      title: "Bendix",
      dataIndex: "bendix",
      key: "bendix",
      _id: "bendix",
    },
    {
      title: "Bendix Eur",
      dataIndex: "bendixEur",
      key: "bendixEur",
      _id: "bendixEur",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      _id: "edit",
      render: (e, r) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedProduct(r);
              setDeleteProduct(null);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      _id: "delete",
      render: (e, t) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            setIsModalOpen(true);
            setDeleteProduct(t._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        className="antd-table"
      />

      <AdminModal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        selectedProduct={selectedProduct}
        deleteProduct={deleteProduct}
        editItem={(e) => {
          const updatedData = data.map((item) =>
            item._id === e._id ? { ...item, ...e } : item
          );

          setData(updatedData);
          setSelectedProduct(null);
        }}
        removeItem={async (id) => {
          try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            });

            setData((prev) => prev.filter((e) => e._id !== id));

            openNotification({
              descriptions: "Product has been successfully deleted!",
              messages: "Success",
            });
          } catch (e) {
            openNotification({
              descriptions: "Something went wrong!",
              messages: e,
            });
          }
        }}
      />
    </>
  );
};

export default PaginatedTable;
