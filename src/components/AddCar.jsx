import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import openNotification from "./notice";
import ImageUpload from "./ImageUpload";
import { flattenData, transformData } from "../utils/functions";

import "./styles.css";

export const FormDisabledDemo = ({ selectedProduct, onOk }) => {
  const [FRONTROTORimageReview, setFRONTROTORImageReview] = useState();
  const [FRONTBRAKEimageReview, setFRONTBRAKEImageReview] = useState();
  const [REARROTORimageReview, setREARROTORImageReview] = useState();
  const [REARBRAKEimageReview, setREARBRAKEImageReview] = useState();
  const [PARKINGSHOEimageReview, setPARKINGSHOEImageReview] = useState();
  const [formattedSelectedProduct, setFormattedSelectedProduct] = useState(
    flattenData(selectedProduct)
  );
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const formItems = [
    { name: "name", rules: [], label: t("Name") },
    { name: "model", rules: [], label: t("Model") },
    {
      name: "year",
      label: t("Year"),
    },
    { name: "engineVal", label: t("Engine Vol") },
    { name: "engineNo", label: t("Engine No") },
  ];

  const FRONTROTORformItems = [
    { name: "FRONTROTOR_type", label: t("Type") },
    {
      name: "FRONTROTOR_discThicknessMax",
      label: t("Disc Thickness Max"),
    },
    { name: "FRONTROTOR_numOfHoles", label: t("Num Of Holes") },
    { name: "FRONTROTOR_height", label: t("Height") },
    {
      name: "FRONTROTOR_centeringDiameter",
      label: t("Centering Diameter"),
    },
    {
      name: "FRONTROTOR_pitchCircle",
      label: t("Pitch Circle"),
    },
    {
      name: "FRONTROTOR_outter",
      label: t("Outter"),
    },
    {
      name: "FRONTROTOR_drum",
      label: t("Drum"),
    },
    { name: "FRONTROTOR_marka", label: t("Code") },
  ];

  const FRONTBRAKEformItems = [
    { name: "FRONTBRAKE_Length-1", label: t("Length") },
    {
      name: "FRONTBRAKE_Width-1",
      label: t("Width"),
    },
    { name: "FRONTBRAKE_Thickness-1", label: t("Thickness") },
    {
      name: "FRONTBRAKE_discThicknessMax",
      label: t("Disc Thickness Max"),
    },
    { name: "FRONTBRAKE_numOfHoles", label: t("Num Of Holes") },
    {
      name: "FRONTBRAKE_Pcs In Set",
      label: t("Pcs In Set"),
    },
    {
      name: "FRONTBRAKE_Brake System",
      label: t("Brake System"),
    },
    { name: "FRONTBRAKE_marka", label: t("Code") },
  ];

  const REARROTORformItems = [
    { name: "REARROTOR_type", label: t("Type") },
    {
      name: "REARROTOR_discThicknessMax",
      label: t("Disc Thickness Max"),
    },
    { name: "REARROTOR_numOfHoles", label: t("Num Of Holes") },
    { name: "REARROTOR_height", label: t("Height") },
    { name: "REARROTOR_centeringDiameter", label: t("Centering Diameter") },
    { name: "REARROTOR_pitchCircle", label: t("Pitch Circle") },
    { name: "REARROTOR_outter", label: t("Outter") },
    { name: "REARROTOR_drum", label: t("Drum") },
    { name: "REARROTOR_marka", label: t("Code") },
  ];

  const REARBRAKEformItems = [
    { name: "REARBRAKE_Length-1", label: t("Length") },
    {
      name: "REARBRAKE_Width-1",
      label: t("Width"),
    },
    { name: "REARBRAKE_Thickness-1", label: t("Thickness") },
    {
      name: "REARBRAKE_discThicknessMax",
      label: t("Disc Thickness Max"),
    },
    { name: "REARBRAKE_numOfHoles", label: t("Num Of Holes") },
    {
      name: "REARBRAKE_Pcs In Set",
      label: t("Pcs In Set"),
    },
    {
      name: "REARBRAKE_Brake System",
      label: t("Brake System"),
    },
    { name: "REARBRAKE_marka", label: t("Code") },
  ];

  const PARKINGSHOEformItems = [
    { name: "PARKINGSHOE_Radius", label: t("Radius") },
    {
      name: "PARKINGSHOE_Width-1",
      label: t("Width"),
    },
    {
      name: "PARKINGSHOE_Pcs In Set",
      label: t("Pcs In Set"),
    },
    { name: "PARKINGSHOE_Thickness-1", label: t("Thickness") },

    { name: "PARKINGSHOE_marka", label: t("Code") },
  ];

  useEffect(() => {
    setFRONTROTORImageReview(selectedProduct?.FRONTROTOR?.image ?? "");
    setFRONTBRAKEImageReview(selectedProduct?.FRONTBRAKE?.image ?? "");
    setREARROTORImageReview(selectedProduct?.REARROTOR?.image ?? "");
    setREARBRAKEImageReview(selectedProduct?.REARBRAKE?.image ?? "");
    setPARKINGSHOEImageReview(selectedProduct?.PARKINGSHOE?.image ?? "");
    setFormattedSelectedProduct(flattenData(selectedProduct));
  }, [selectedProduct]);

  // const handleFileSelection = (event) => {
  //   if (event?.target?.files) {
  //     const file = event.target.files[0];
  //     if (file && file.type.startsWith("image/")) {
  //       const reader = new FileReader();

  //       reader.onload = (loadEvent) => {
  //         const base64 = loadEvent?.target?.result;
  //         setImageReview(base64);
  //       };

  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  const sendRequest = async (method, url, values) => {
    try {
      const { data } = await axios({
        method,
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (selectedProduct && onOk) {
        onOk(data);
      }

      openNotification({
        descriptions: `Product has been successfully ${
          method === "post" ? "created" : "updated"
        }!`,
        messages: "Success",
      });
    } catch (e) {
      openNotification({
        descriptions: "Something went wrong!",
        messages: e.message,
      });
    }
  };

  const onFinish = async (values) => {
    const transformedData = await transformData(values);
    const url = selectedProduct
      ? `${process.env.REACT_APP_API_URL}/api/${selectedProduct._id}`
      : `${process.env.REACT_APP_API_URL}/api`;

    const method = selectedProduct ? "put" : "post";

    form.resetFields();
    await sendRequest(method, url, { ...transformedData });
  };

  const onFinishFailed = () => {
    openNotification({
      descriptions: "Something went wrong!",
      messages: "Error",
    });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      initialValues={formattedSelectedProduct}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#000",
        }}
      >
        {selectedProduct ? "Edit" : t("Add")} {t("Products")}
      </h2>
      {formItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <div className="part_item_title">{t("FRONT ROTOR")}</div>
      {FRONTROTORformItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <ImageUpload
        upload={async (image) => {
          setFRONTROTORImageReview(image);
        }}
        review={() => {}}
      />
      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setFRONTROTORImageReview("")} />
          {FRONTROTORimageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${FRONTROTORimageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      <div className="part_item_title">{t("FRONT BRAKE")}</div>
      {FRONTBRAKEformItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <ImageUpload
        upload={async (image) => {
          setFRONTBRAKEImageReview(image);
        }}
        review={() => {}}
      />
      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setFRONTBRAKEImageReview("")} />
          {FRONTBRAKEimageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${FRONTBRAKEimageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      <div className="part_item_title">{t("REAR ROTOR")}</div>
      {REARROTORformItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <ImageUpload
        upload={async (image) => {
          setREARROTORImageReview(image);
        }}
        review={() => {}}
      />
      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setREARROTORImageReview("")} />
          {REARROTORimageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${REARROTORimageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      <div className="part_item_title">{t("REAR BRAKE")}</div>
      {REARBRAKEformItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <ImageUpload
        upload={async (image) => {
          setREARBRAKEImageReview(image);
        }}
        review={() => {}}
      />
      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setREARBRAKEImageReview("")} />
          {REARBRAKEimageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${REARBRAKEimageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      <div className="part_item_title">{t("PARKING SHOE")}</div>
      {PARKINGSHOEformItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}
      <ImageUpload
        upload={async (image) => {
          setPARKINGSHOEImageReview(image);
        }}
        review={() => {}}
      />
      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setPARKINGSHOEImageReview("")} />
          {PARKINGSHOEimageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${PARKINGSHOEimageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      {/* <Form.Item
        label="Upload"
        valuePropName="image"
        getValueFromEvent={normFile}
        name="image"
      >
        <div className="formGroup form-group">
          <label htmlFor="imageUpload" className="inputContainer">
            <img
              src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg"
              alt="uploadFile"
            />
            Upload Image
          </label>
          <input
            id="imageUpload"
            className={`uploadFileInput uploadFileInput`}
            disabled={!!imageReview}
            onChange={handleFileSelection}
            name="file"
            type="file"
          />
        </div>
      </Form.Item> */}
      <Form.Item>
        <Button htmlType="submit">{selectedProduct ? t("Edit") : t("Add")}</Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;
