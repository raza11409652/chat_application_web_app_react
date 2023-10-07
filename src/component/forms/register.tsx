import { Button, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <>
      <div className="auth-form">
        <div className="header">
          <Typography.Text>Register new account</Typography.Text>
        </div>
        <div className="body">
          <Form>
            <Form.Item>
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Register</Button>
            </Form.Item>
            <Form.Item>
              <NavLink to={"/"}>Login to your account</NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
