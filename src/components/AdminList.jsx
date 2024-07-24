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
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel(
          "Operation canceled due to new request."
        );
      }

      cancelTokenSource.current = axios.CancelToken.source();

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api`, {
        params: {
          page: params.pagination.current,
          limit: params.pagination.pageSize,
          search: params.search,
        },
        cancelToken: cancelTokenSource.current.token,
      });
      console.log("data", data);
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
    {
      title: t("Engine Val"),
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
    {
      title: "FRONT BRAKE Num Of Holes",
      dataIndex: "FRONTBRAKE",
      key: "numOfHoles",
      _id: "numOfHoles",
      render: (e) => e?.numOfHoles,
    },
    {
      title: "FRONT BRAKE Brake System",
      dataIndex: "FRONTBRAKE",
      key: "Brake System",
      _id: "Brake System",
      render: (e) => e["Brake System"],
    },
    {
      title: "FRONT BRAKE Length-1",
      dataIndex: "FRONTBRAKE",
      key: "Length-1",
      _id: "Length-1",
      render: (e) => e["Length-1"],
    },
    {
      title: "FRONT BRAKE Pcs In Set",
      dataIndex: "FRONTBRAKE",
      key: "Pcs In Set",
      _id: "Pcs In Set",
      render: (e) => e["Pcs In Set"],
    },
    {
      title: "FRONT BRAKE Thickness-1",
      dataIndex: "FRONTBRAKE",
      key: "Thickness-1",
      _id: "Thickness-1",
      render: (e) => e["Thickness-1"],
    },
    {
      title: "FRONT BRAKE Width-1",
      dataIndex: "FRONTBRAKE",
      key: "Width-1",
      _id: "Width-1",
      render: (e) => e["Width-1"],
    },
    {
      title: "FRONT BRAKE bodyChassis",
      dataIndex: "FRONTBRAKE",
      key: "bodyChassis",
      _id: "bodyChassis",
      render: (e) => e["bodyChassis"] || e?.body,
    },
    {
      title: "FRONT BRAKE code",
      dataIndex: "FRONTBRAKE",
      key: "code",
      _id: "code",
      render: (e, { _id }) =>
        e?.marka ? (
          <a href={`/catalogue/${_id}?FRONTBRAKE`} target="_blank">
            {e?.marka}
          </a>
        ) : null,
    },
    {
      title: "FRONT ROTOR bodyChassis",
      dataIndex: "FRONTROTOR",
      key: "bodyChassis",
      _id: "bodyChassis",
      render: (e) => e["bodyChassis"] || e?.body,
    },
    {
      title: "FRONT ROTOR height",
      dataIndex: "FRONTROTOR",
      key: "height",
      _id: "height",
      render: (e) => e?.height,
    },
    {
      title: "FRONT ROTOR centering Diameter",
      dataIndex: "FRONTROTOR",
      key: "centeringDiameter",
      _id: "centeringDiameter",
      render: (e) => e?.centeringDiameter,
    },
    {
      title: "FRONT ROTOR Disc Thickness Max.",
      dataIndex: "FRONTROTOR",
      key: "discThicknessMax",
      _id: "discThicknessMax",
      render: (e) => e?.discThicknessMax,
    },
    {
      title: "FRONT ROTOR drum",
      dataIndex: "FRONTROTOR",
      key: "drum",
      _id: "drum",
      render: (e) => e?.drum,
    },
    {
      title: "FRONT ROTOR image",
      dataIndex: "FRONTROTOR",
      key: "image",
      _id: "image",
      render: (e) => (
        <img src={`${process.env.REACT_APP_API_URL}${e?.image}`} alt="" />
      ),
    },
    {
      title: "FRONT ROTOR code",
      dataIndex: "FRONTROTOR",
      key: "code",
      _id: "code",
      render: (e, { _id }) =>
        e?.marka ? (
          <a href={`/catalogue/${_id}?FRONTBRAKE`} target="_blank">
            {e?.marka}
          </a>
        ) : null,
    },
    {
      title: "FRONT ROTOR Num Of Holes",
      dataIndex: "FRONTROTOR",
      key: "numOfHoles",
      _id: "numOfHoles",
      render: (e) => e?.numOfHoles,
    },
    {
      title: "FRONT ROTOR outter",
      dataIndex: "FRONTROTOR",
      key: "outter",
      _id: "outter",
      render: (e) => e?.outter,
    },
    {
      title: "FRONT ROTOR Pitch Circle",
      dataIndex: "FRONTROTOR",
      key: "pitchCircle",
      _id: "pitchCircle",
      render: (e) => e?.pitchCircle,
    },
    {
      title: "FRONT ROTOR type",
      dataIndex: "FRONTROTOR",
      key: "type",
      _id: "type",
      render: (e) => e?.type,
    },
    {
      title: "REAR BRAKE Brake System",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE Brake System",
      _id: "REARBRAKE Brake System",
      render: (e) => e["Brake System"],
    },
    {
      title: "REAR BRAKE Length-1",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE Length-1",
      _id: "REARBRAKE Length-1",
      render: (e) => e["Length-1"],
    },
    {
      title: "REAR BRAKE Pcs In Set",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE Pcs In Set",
      _id: "REARBRAKE Pcs In Set",
      render: (e) => e["Pcs In Set"],
    },
    {
      title: "REAR BRAKE Thickness-1",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE Thickness-1",
      _id: "REARBRAKE Thickness-1",
      render: (e) => e["Thickness-1"],
    },
    {
      title: "REAR BRAKE Width-1",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE Width-1",
      _id: "REARBRAKE Width-1",
      render: (e) => e["Width-1"],
    },
    {
      title: "REAR BRAKE bodyChassis",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE bodyChassis",
      _id: "REARBRAKE bodyChassis",
      render: (e) => e["bodyChassis"] || e?.body,
    },
    {
      title: "FRONT BRAKE Disc Thickness Max.",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE discThicknessMax",
      _id: "REARBRAKE discThicknessMax",
      render: (e) => e?.discThicknessMax,
    },
    {
      title: "REAR BRAKE image",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE image",
      _id: "REARBRAKE image",
      render: (e) => (
        <img src={`${process.env.REACT_APP_API_URL}${e?.image}`} alt="" />
      ),
    },
    {
      title: "REAR BRAKE code",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE code",
      _id: "REARBRAKE code",
      render: (e, { _id }) =>
        e?.marka ? (
          <a href={`/catalogue/${_id}?FRONTBRAKE`} target="_blank">
            {e?.marka}
          </a>
        ) : null,
    },
    {
      title: "REAR BRAKE Num Of Holes",
      dataIndex: "REARBRAKE",
      key: "REARBRAKE numOfHoles",
      _id: "REARBRAKE numOfHoles",
      render: (e) => e?.numOfHoles,
    },
    {
      title: "REAR ROTOR Num Of Holes",
      dataIndex: "REARROTOR",
      key: "REARROTOR numOfHoles",
      _id: "REARROTOR numOfHoles",
      render: (e) => e?.numOfHoles,
    },
    {
      title: "REAR ROTOR bodyChassis",
      dataIndex: "REARROTOR",
      key: "REARROTOR bodyChassis",
      _id: "REARROTOR bodyChassis",
      render: (e) => e["bodyChassis"] || e?.body,
    },
    {
      title: "REAR ROTOR centering Diameter",
      dataIndex: "REARROTOR",
      key: "REARROTOR centeringDiameter",
      _id: "REARROTOR centeringDiameter",
      render: (e) => e?.centeringDiameter,
    },
    {
      title: "REAR ROTOR Disc Thickness Max.",
      dataIndex: "REARROTOR",
      key: "REARROTOR discThicknessMax",
      _id: "REARROTOR discThicknessMax",
      render: (e) => e?.discThicknessMax,
    },
    {
      title: "REARROTOR drum",
      dataIndex: "REARROTOR",
      key: "REARROTOR drum",
      _id: "REARROTOR drum",
      render: (e) => e?.drum,
    },
    {
      title: "REAR ROTOR height",
      dataIndex: "REARROTOR",
      key: "REARROTOR height",
      _id: "REARROTOR height",
      render: (e) => e?.height,
    },
    {
      title: "REAR ROTOR image",
      dataIndex: "REARROTOR",
      key: "REARROTOR image",
      _id: "REARROTOR image",
      render: (e) => (
        <img src={`${process.env.REACT_APP_API_URL}${e?.image}`} alt="" />
      ),
    },
    {
      title: "REAR ROTOR code",
      dataIndex: "REARROTOR",
      key: "REARROTOR code",
      _id: "REARROTOR code",
      render: (e, { _id }) =>
        e?.marka ? (
          <a href={`/catalogue/${_id}?FRONTBRAKE`} target="_blank">
            {e?.marka}
          </a>
        ) : null,
    },
    {
      title: "REAR ROTOR Num Of Holes",
      dataIndex: "REARROTOR",
      key: "REARROTOR numOfHoles",
      _id: "REARROTOR numOfHoles",
      render: (e) => e?.numOfHoles,
    },
    {
      title: "REAR ROTOR outter",
      dataIndex: "REARROTOR",
      key: "REARROTOR outter",
      _id: "REARROTOR outter",
      render: (e) => e?.outter,
    },
    {
      title: "REAR ROTOR Pitch Circle",
      dataIndex: "REARROTOR",
      key: "REARROTOR pitchCircle",
      _id: "REARROTOR pitchCircle",
      render: (e) => e?.pitchCircle,
    },
    {
      title: "REAR ROTOR type",
      dataIndex: "REARROTOR",
      key: "type",
      _id: "type",
      render: (e) => e?.type,
    },
    {
      title: "PARKING SHOE image",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE image",
      _id: "PARKINGSHOE image",
      render: (e) => (
        <img src={`${process.env.REACT_APP_API_URL}${e?.image}`} alt="" />
      ),
    },
    {
      title: "PARKING SHOE code",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE code",
      _id: "PARKINGSHOE code",
      render: (e, { _id }) =>
        e?.marka ? (
          <a href={`/catalogue/${_id}?FRONTBRAKE`} target="_blank">
            {e?.marka}
          </a>
        ) : null,
    },
    {
      title: "PARKING SHOE code",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE code",
      _id: "PARKINGSHOE code",
      render: (e) => e?.PcsInSet,
    },
    {
      title: "PARKING SHOE Radius",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE Radius",
      _id: "PARKINGSHOE Radius",
      render: (e) => e?.Radius,
    },
    {
      title: "PARKING SHOE Thickness1",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE Thickness1",
      _id: "PARKINGSHOE Thickness1",
      render: (e) => e?.Thickness1,
    },
    {
      title: "PARKING SHOE Width1",
      dataIndex: "PARKINGSHOE",
      key: "PARKINGSHOE Width1",
      _id: "PARKINGSHOE Width1",
      render: (e) => e?.Width1,
    },
    [
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
    ],
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
