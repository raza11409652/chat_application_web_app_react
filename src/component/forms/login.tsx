import { Button, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
export const LoginForm = () => {
  return (
    <>
      <div className="auth-form">
        <div className="header">
          <Typography.Text>Login</Typography.Text>
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
              <Button type="primary">Login</Button>
            </Form.Item>
            <Form.Item>
              <Typography.Text>
                Don't have account <NavLink to={"/register"}>Register </NavLink>
                now
              </Typography.Text>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
