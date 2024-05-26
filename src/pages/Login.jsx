import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/functions";

import "./styles.css";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (decodeToken()) {
        navigate("/admin");
      }
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        values
      );

      window.localStorage.setItem("access_token", data.token);
      window.location.href = "/admin";
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 300, margin: "0 auto", marginTop: "140px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2>Login</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="loginBtn">
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
