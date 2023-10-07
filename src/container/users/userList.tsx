import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetUsersAction } from "../../slice/userReducer";
import { UserListCard } from "../../component/user/userListCard";
import { User } from "../../types";
import { Pagination, Spin } from "antd";

interface Props {
  onUserSelect: (a: User) => void;
}
export const UsersListContainer: React.FC<Props> = ({ onUserSelect }) => {
  const [page, setPage] = useState(1);
  const { loading, users, selectedUser, totalCount } = useAppSelector(
    (a) => a.userReducer
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetUsersAction({ page: page }));
  }, [dispatch, page]);
  const onUserCardClick = (u: User) => onUserSelect(u);
  {
    /**  !! TODO - pagination need to be implemented  skipped  for now */
  }
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
      <div className="pagination-wrapper">
        <Pagination
          onChange={(e) => setPage(e)}
          pageSize={20}
          total={totalCount}
          current={page}
        />
      </div>
    </>
  );
};
