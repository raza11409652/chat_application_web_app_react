import { Button, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { UserRegister } from "../../types";
import { useAppDispatch, useAppSelector } from "../../slice";
import { RegisterAction } from "../../slice/authReducer";

export const RegisterForm = () => {
  const { loading } = useAppSelector((a) => a.authReducer);
  const dispatch = useAppDispatch();
  const v: UserRegister = {
    username: "",
    password: "",
  };
  const submit = (a: UserRegister) => dispatch(RegisterAction(a));
  return (
    <>
      <div className="auth-form">
        <div className="header">
          <Typography.Text>Register new account</Typography.Text>
        </div>
        <div className="body">
          <Form initialValues={v} onFinish={submit}>
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter your password" type="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
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
