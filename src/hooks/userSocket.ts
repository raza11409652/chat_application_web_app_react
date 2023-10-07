import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../slice";
import { getItemFromLocal } from "../utils/localstorage";
import { Message } from "../types";
import { message } from "antd";
import { MessageReceivedAction } from "../slice/messageReducer";
import { WEB_SOCKET_URL } from "../env";
const useSocket = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((a) => a.authReducer.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAppSelector((a) => a.authReducer.user);
  useEffect(() => {
    const createSocket = async () => {
      try {
        const token = getItemFromLocal("session-token");
        const socket = io(WEB_SOCKET_URL, {
          transports: ["websocket"],
          auth: {
            token: token,
          },
        });
        setSocket(socket);
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthenticated) {
      createSocket();
    }

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user !== null && socket !== null) {
      socket.on("message_received", (event: Message) => {
        // console.log(event);
        message.info(`Received message from ${event.sender.username}`);
        dispatch(MessageReceivedAction(event));
      });
      socket.on("disconnect", async (reason) => {
        if (isAuthenticated && reason === "io server disconnect") {
          console.log("Websocket disconnected");
        }
      });

      socket.on("connect", () => {
        console.log("connected");
      });
    }
    return () => {
      socket?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated, socket]);

  return socket;
};

export default useSocket;
