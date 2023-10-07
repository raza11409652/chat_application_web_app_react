import { Button, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { UserLogin } from "../../types";
import { useAppDispatch, useAppSelector } from "../../slice";
import { LoginAction } from "../../slice/authReducer";
export const LoginForm = () => {
  const { loading } = useAppSelector((a) => a.authReducer);
  const dispatch = useAppDispatch();
  const b: UserLogin = {
    username: "",
    password: "",
  };
  const submit = (a: UserLogin) => dispatch(LoginAction(a));
  return (
    <>
      <div className="auth-form">
        <div className="header">
          <Typography.Text>Login</Typography.Text>
        </div>
        <div className="body">
          <Form initialValues={b} onFinish={submit}>
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input placeholder="Enter your password" type="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
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
