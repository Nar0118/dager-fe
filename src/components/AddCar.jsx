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
  { name: "engineVal", label: "Engine Val" },
  { name: "engineNo", label: "Engine No" },
];

const FRONTROTORformItems = [
  { name: "type", label: "Type" },
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
  {
    name: "pitchCircle",
    label: "Pitch Circle",
  },
  {
    name: "outter",
    label: "Outter",
  },
  {
    name: "drum",
    label: "Drum",
  },
  { name: "marka", label: "Marka" },
];

const FRONTBRAKEformItems = [
  { name: "Length-1", label: "Length" },
  {
    name: "Width-1",
    label: "Width",
  },
  { name: "Thickness-1", label: "Thickness" },
  {
    name: "discThicknessMax1",
    label: "Disc Thickness Max",
  },
  { name: "numOfHoles1", label: "Num Of Holes" },
  {
    name: "Pcs In Set",
    label: "Pcs In Set",
  },
  {
    name: "Brake System",
    label: "Brake System",
  },
  { name: "marka1", label: "Marka" },
];

const REARROTORformItems = [
  { name: "type", label: "Type" },
  {
    name: "discThicknessMax2",
    label: "Disc Thickness Max",
  },
  { name: "numOfHoles2", label: "Num Of Holes" },
  { name: "height", label: "Height" },
  { name: "centeringDiameter1", label: "Centering Diameter" },
  { name: "pitchCircle1", label: "Pitch Circle" },
  { name: "outter1", label: "Outter" },
  { name: "drum1", label: "Drum" },
  { name: "marka2", label: "Marka" },
];

const REARBRAKEformItems = [
  { name: "Length-1", label: "Length" },
  {
    name: "Width-1",
    label: "Width",
  },
  { name: "Thickness-1", label: "Thickness" },
  {
    name: "discThicknessMax3",
    label: "Disc Thickness Max",
  },
  { name: "numOfHoles3", label: "Num Of Holes" },
  {
    name: "Pcs In Set",
    label: "Pcs In Set",
  },
  {
    name: "Brake System",
    label: "Brake System",
  },
  { name: "marka3", label: "Marka" },
];

const PARKINGSHOEformItems = [
  { name: "Radius", label: "Radius" },
  {
    name: "Width-1",
    label: "Width",
  },
  {
    name: "Pcs In Set",
    label: "Pcs In Set",
  },
  { name: "Thickness-1", label: "Thickness" },

  { name: "marka4", label: "Marka" },
];

export const FormDisabledDemo = ({ selectedProduct, onOk }) => {
  const [FRONTROTORimageReview, setFRONTROTORImageReview] = useState();
  const [FRONTBRAKEimageReview, setFRONTBRAKEImageReview] = useState();
  const [REARROTORimageReview, setREARROTORImageReview] = useState();
  const [REARBRAKEimageReview, setREARBRAKEImageReview] = useState();
  const [PARKINGSHOEimageReview, setPARKINGSHOEImageReview] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    setFRONTROTORImageReview(selectedProduct?.image ?? "");
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

    console.log(values, 222222);
    console.log(FRONTROTORimageReview, 2222222);
    console.log(FRONTBRAKEimageReview, 2222222);
    console.log(REARROTORimageReview, 2222222);
    console.log(REARBRAKEimageReview, 2222222);
    console.log(PARKINGSHOEimageReview, 2222222);
return
    const url = selectedProduct
      ? `${process.env.REACT_APP_API_URL}/api/${selectedProduct._id}`
      : `${process.env.REACT_APP_API_URL}/api`;

    const method = selectedProduct ? "put" : "post";

    form.resetFields();
    await sendRequest(method, url, { ...values, image: FRONTROTORimageReview });
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
          className={e.name}
        >
          <Input placeholder={e.label} />
        </Form.Item>
      ))}

      <div className="part_item_title">FRONT ROTOR</div>
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

      <div className="part_item_title">FRONT BRAKE</div>
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

      <div className="part_item_title">REAR ROTOR</div>
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

      <div className="part_item_title">REARB RAKE</div>
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

      <div className="part_item_title">PARKING SHOE</div>
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
        <Button htmlType="submit">{selectedProduct ? "Edit" : "Add"}</Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;
