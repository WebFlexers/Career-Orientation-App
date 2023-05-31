"use client";

import { Button, Checkbox, Form, Input } from "antd";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";

const onFinish = (values) => {
  console.log("Success:");
};

export default function Login() {
  const router = useRouter();
  return (
    <>
      <div id={styles["form-box"]}>
        <h4 className="pb-3" style={{ textAlign: "center" }}>
          Login
        </h4>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              htmlType="submit"
              id={styles["login-btn"]}
              onClick={() => router.push("/dashboard")}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
