import { LogoutOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";
import { logoutAction } from "../../slice/authReducer";
// import React from "react";

export const AppNavbar = () => {
  const { user } = useAppSelector((a) => a.authReducer);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutAction());
  return (
    <>
      <header className="app-navbar">
        <div>
          <Typography.Text>Logo || Name</Typography.Text>
        </div>
        <div className="row-flex">
          <Button
            type="text"
            onClick={() => {}}
            style={{ marginRight: "10px" }}
          >
            Logged in - {user?.username || ""}
          </Button>
          <Button type="default" danger onClick={logout}>
            <LogoutOutlined />
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};
