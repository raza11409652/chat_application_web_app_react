import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetUsersAction } from "../../slice/userReducer";
import { UserListCard } from "../../component/user/userListCard";
import { User } from "../../types";
import { Spin } from "antd";

interface Props {
  onUserSelect: (a: User) => void;
}
export const UsersListContainer: React.FC<Props> = ({ onUserSelect }) => {
  const { loading, users, selectedUser } = useAppSelector((a) => a.userReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetUsersAction({ page: 1 }));
  }, [dispatch]);
  const onUserCardClick = (u: User) => onUserSelect(u);
  return (
    <>
      {loading && <Spin />}
      <div className="contact-list-wrapper">
        {users.map((a) => (
          <UserListCard
            key={a._id}
            user={a}
            onClick={onUserCardClick}
            selected={selectedUser?._id === a._id}
          />
        ))}
      </div>
    </>
  );
};
