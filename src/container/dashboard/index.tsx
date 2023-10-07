import { Result } from "antd";
import { AppNavbar } from "../../component/navbar";
import { useAppDispatch, useAppSelector } from "../../slice";
import { SetSelectedUserAction } from "../../slice/userReducer";
import { User } from "../../types";
import { MessageContainer } from "../message/messageContainer";
import { UsersListContainer } from "../users/userList";

export const DashboardContainer = () => {
  const { selectedUser } = useAppSelector((a) => a.userReducer);
  const dispatch = useAppDispatch();
  const onUserSelection = (a: User) => {
    dispatch(SetSelectedUserAction(a));
  };
  return (
    <>
      <AppNavbar />
      <div className="dashboard-container">
        <div className="contact-list">
          <UsersListContainer onUserSelect={onUserSelection} />
        </div>
        <div className="conversation-window">
          {selectedUser ? (
            <MessageContainer user={selectedUser} />
          ) : (
            <div className="row-flex-center">
              <Result
                subTitle={"To start conversation select from contact list"}
              />
            </div>
          )}
        </div>
        {/* <div className="profile-window"></div> */}
      </div>
    </>
  );
};
