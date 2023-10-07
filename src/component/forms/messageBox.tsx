import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import { OutboundMessage } from "../../types";
import { useAppDispatch } from "../../slice";
import { SendMessageAction } from "../../slice/messageReducer";
interface Props {
  user: string;
  loader: true | false;
}

export const OutboundMessageBox: React.FC<Props> = ({ user, loader }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState<string>("");
  const sendMessage = () => {
    // console.log(message);
    const obj: OutboundMessage = {
      message: {
        type: "TEXT",
        caption: message,
      },
      user: user,
    };
    dispatch(SendMessageAction(obj)).finally(() => setMessage(""));
  };
  return (
    <>
      <div className="message-box">
        <Input.TextArea
          value={message}
          rows={2}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          loading={loader}
          disabled={message.trim().length < 1}
          icon={<SendOutlined />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
};
