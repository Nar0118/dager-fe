import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import axios from "axios";
import { AdminModal } from "./Modal";
import openNotification from "./notice";
import { Search } from "./Search";

import "./styles.css";

const PaginatedTable = ({ isAdmin, cars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [data, setData] = useState(cars ?? []);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const cancelTokenSource = useRef(null);

  useEffect(() => {
    cars && setData(cars);
  }, [cars]);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedProduct(null);
    }
  }, [isModalOpen]);

  const fetchData = async (params = {}) => {
    try {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel(
          "Operation canceled due to new request."
        );
      }

      cancelTokenSource.current = axios.CancelToken.source();

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          _page: params.pagination.current,
          _limit: params.pagination.pageSize,
          search: params.search,
        },
        cancelToken: cancelTokenSource.current.token,
      });

      setData(response.data.data);
      setPagination({
        ...params.pagination,
        total: response.data.total,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Failed to fetch data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cars) {
      setLoading(true);
      fetchData({ pagination });
    }
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
      render: (e, r) => <Link to={`/catalogue/${r._id}`}>{e}</Link>,
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
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   key: "type",
    //   _id: "type",
    // },
    // {
    //   title: "Body Chassis",
    //   dataIndex: "bodyChassis",
    //   key: "bodyChassis",
    //   _id: "bodyChassis",
    // },
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
    ...(isAdmin
      ? [
          {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            _id: "edit",
            render: (_, r) => (
              <Button
                type="primary"
                onClick={() => {
                  setSelectedProduct(r);
                  setIsModalOpen(true);
                  setDeleteProduct(null);
                }}
              >
                Edit
              </Button>
            ),
          },
          {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            _id: "delete",
            render: (_, t) => (
              <Button
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
        ]
      : []),
  ];

  return (
    <>
      {!cars && <Search onChange={(search) => fetchData({ pagination, search })} />}
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        className="antd-table"
      />

      {isModalOpen && (
        <AdminModal
          isModalOpen={isModalOpen}
          setIsModalOpen={() => {
            setSelectedProduct(null);
            setIsModalOpen(false);
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
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
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
      )}
    </>
  );
};

export default PaginatedTable;
