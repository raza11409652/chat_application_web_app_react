import React from "react";
import { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetMessagesAction } from "../../slice/messageReducer";
import { ChatBubble } from "../../component/messages/chatBubble";
import { OutboundMessageBox } from "../../component/forms/messageBox";

interface Props {
  user: User;
}
export const MessageContainer: React.FC<Props> = ({ user }) => {
  const { records, sendLoading } = useAppSelector((a) => a.messageReducer);
  const data = records.find((a) => a.user === user._id);
  const loggedInUser = useAppSelector((a) => a.authReducer.user?._id || "");
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetMessagesAction({ skip: 0, user: user._id }));
  }, [dispatch, user._id]);
  return (
    <>
      <div className="message-container">
        <div className="header">
          <h5>{user.username}</h5>
        </div>
        <div className="body">
          {/* !! optimized list implementation should be here */}
          //!! TODO - pagination need to be implemented  skipped  for now 
          {data &&
            data.messages.map((a) => (
              <ChatBubble loggedInUser={loggedInUser} message={a} key={a._id} />
            ))}
        </div>
        <div className="footer">
          <OutboundMessageBox loader={sendLoading} user={user._id} />
        </div>
      </div>
    </>
  );
};
