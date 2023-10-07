import {
  Message,
  MessageGetResponse,
  MessageQuery,
  OutboundMessage,
} from "../../types";
import axios from "../axios";

export const getMessagesApi = async (q: MessageQuery) => {
  const { data } = await axios.get<MessageGetResponse>(
    `conversation/?user=${q.user}&skip=${q.skip}`
  );
  return { data, user: q.user };
};
export const sendMessageApi = async (b: OutboundMessage) => {
  const { data } = await axios.post<Message>(`conversation/`, b);
  return { data, user: b.user };
};
