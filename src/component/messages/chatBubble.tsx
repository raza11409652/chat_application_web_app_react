import React from "react";
import { Message } from "../../types";
import { Typography } from "antd";

interface Props {
  message: Message;
  loggedInUser: string;
}
export const ChatBubble: React.FC<Props> = ({ message, loggedInUser }) => {
  // console.log(message.sender, loggedInUser);
  const sentByUser = message.sender._id === loggedInUser;
  // console.log(sentByUser);
  return (
    <>
      <div
        className="chat-box"
        style={{ flexDirection: sentByUser ? "row-reverse" : "row" }}
      >
        <div className="message">
          <Typography.Text>{message.content.caption}</Typography.Text>
        </div>
      </div>
    </>
  );
};
