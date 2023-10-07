import React from "react";
import { User } from "../../types";
import { Card } from "antd";

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
          <p>{user.name}</p>
          <p>@{user.username}</p>
        </>
      }
    ></Card>
  );
};
