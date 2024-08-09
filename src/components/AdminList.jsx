import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Table } from "antd";
import axios from "axios";
import { AdminModal } from "./Modal";
import openNotification from "./notice";
import { Search } from "./Search";

import "./styles.css";

const PaginatedTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const cancelTokenSource = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedProduct(null);
    }
  }, [isModalOpen]);

  const fetchData = async (params = {}) => {
    try {
      if (cancelTokenSource?.current) {
        cancelTokenSource.current.cancel(
          "Operation canceled due to new request."
        );
      }

      cancelTokenSource.current = axios.CancelToken.source();
console.log('params',params);
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          page: params?.pagination?.current || params?.current,
          limit: params?.pagination?.pageSize || params?.pageSize,
          search: params?.search,
        },
        cancelToken: cancelTokenSource?.current?.token,
      });

      setData(data.data);
      setPagination({
        ...params.pagination,
        total: data.total,
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
    setLoading(true);
    fetchData({ pagination });
  }, []);

  const handleTableChange = async (pagination) => {
    console.log(1111, pagination);
    // setPagination(pagination);
    setLoading(true);
    await fetchData(pagination)
  };

  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      _id: "name",
      render: (e, r) => <Link to={`/catalogue/${r._id}`}>{e}</Link>,
    },
    {
      title: t("Model"),
      dataIndex: "model",
      key: "model",
      _id: "model",
    },
    {
      title: t("Year"),
      dataIndex: "year",
      key: "year",
      _id: "year",
    },
    {
      title: t("Engine Vol"),
      dataIndex: "engineVal",
      key: "engineVal",
      _id: "engineVal",
    },
    {
      title: t("Engine No"),
      dataIndex: "engineNo",
      key: "engineNo",
      _id: "engineNo",
    },
    {
      title: "FRONT BRAKE image",
      dataIndex: "FRONTBRAKE",
      key: "image",
      _id: "image",
      render: (e) => (
        <img src={`${process.env.REACT_APP_API_URL}${e?.image}`} alt="" />
      ),
    },
    {
      title: "FRONT BRAKE Disc Thickness Max.",
      dataIndex: "FRONTBRAKE",
      key: "discThicknessMax",
      _id: "discThicknessMax",
      render: (e) => e?.discThicknessMax,
    },
    // Add more columns here as needed...
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
  ];

  return (
    <>
      <Search onChange={(search) => fetchData({ pagination, search })} />
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
