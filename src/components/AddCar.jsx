import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import openNotification from "./notice";
import ImageUpload from "./ImageUpload";

import "./styles.css";

const formItems = [
  { name: "name", rules: [], label: "Name" },
  { name: "model", rules: [], label: "Model" },
  {
    name: "year",
    label: "Year",
  },
  { name: "type", label: "Type" },
  { name: "bodyChassis", label: "Body Chassis" },
  { name: "engineVal", label: "Engine Val" },
  { name: "engineNo", label: "Engine No" },
  {
    name: "discThicknessMax",
    label: "Disc Thickness Max.",
  },
  { name: "numOfHoles", label: "Num Of Holes" },
  { name: "height", label: "Height" },
  {
    name: "centeringDiameter",
    label: "Centering Diameter",
  },
  { name: "frontRear", label: "Front/Rear" },
  {
    name: "outter",
    label: "Outter",
  },
  {
    name: "pitchCircle",
    label: "Pitch Circle",
  },
  {
    name: "drum",
    label: "Drum",
  },
  { name: "bendix", label: "Bendix" },
  { name: "bendixEur", label: "Bendix Eur" },
];

export const FormDisabledDemo = ({ selectedProduct, onOk }) => {
  const [imageReview, setImageReview] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    setImageReview(selectedProduct?.image ?? "");
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
    const url = selectedProduct
      ? `${process.env.REACT_APP_API_URL}/api/${selectedProduct._id}`
      : `${process.env.REACT_APP_API_URL}/api`;

    const method = selectedProduct ? "put" : "post";

    form.resetFields();
    await sendRequest(method, url, { ...values, image: imageReview });
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
      initialValues={selectedProduct}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {selectedProduct ? "Edit" : "Add"} product
      </h2>

      {formItems.map((e) => (
        <Form.Item
          label={e.label}
          rules={e?.rules}
          name={e.name}
          required={false}
          key={e.label}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}

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

      <ImageUpload
        upload={async (image) => {
          setImageReview(image);
        }}
        review={() => {}}
      />

      {
        <div className="imageReview">
          <div />
          <DeleteOutlined onClick={() => setImageReview("")} />
          {imageReview && (
            <img
              src={`${process.env.REACT_APP_API_URL}${imageReview}`}
              width={100}
              alt="image"
            />
          )}
        </div>
      }
      <Form.Item>
        <Button htmlType="submit">{selectedProduct ? "Edit" : "Add"}</Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;
