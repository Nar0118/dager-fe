import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import openNotification from "./notice";

import "./contact.css";

const { TextArea } = Input;

const Contact = () => {
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, values);
      openNotification({
        descriptions: t("Your message was sent successfully!"),
        messages: t("Success"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(
      "Failed:",
      errorInfo.errorFields.map((e) => e.errors)
    );

    openNotification({
      descriptions:
        errorInfo.errorFields.map((e) => e.errors)[0] ||
        t("Something went wrong!"),
      messages: errorInfo.errorFields.map((e) => e.errors)[1] || t("Error"),
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{t("Contacts")}</h1>
      <br />
      <Form
        className="contactForm"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t("Email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("Please input your email!"),
            },
            {
              type: "email",
              message: t("The input is not a valid email!"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Message")}
          name="message"
          rules={[
            {
              required: true,
              message: t("Please input a message!"),
            },
          ]}
        >
          <TextArea rows={5} size="" style={{ resize: "none" }} />
        </Form.Item>
        <Form.Item style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Button type="primary" htmlType="submit">
            {t("Send")}
          </Button>
        </Form.Item>
        {/*  */}
      </Form>
    </div>
  );
};
export default Contact;
