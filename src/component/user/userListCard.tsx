import React from "react";
import { User } from "../../types";
import { Avatar, Card } from "antd";

interface Props {
  user: User;
  onClick: (u: User) => void;
  selected: true | false;
}
export const UserListCard: React.FC<Props> = ({ user, onClick, selected }) => {
  return (
    <Card
      onClick={() => onClick(user)}
      className={`user-list-card ${selected ? "selected" : ""}`}
      // bordered={false}
      children={
        <>
          <div style={{ flex: "row", display: "flex", alignItems: "center" }}>
            <Avatar
              style={{ background: user.avatarBackground }}
              children={<>{user.username[0]}</>}
            />
            <p style={{ marginLeft: "4px" }}>@{user.username}</p>
          </div>
        </>
      }
    ></Card>
  );
};
