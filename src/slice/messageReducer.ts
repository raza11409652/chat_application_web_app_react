import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Message,
  MessageGetResponse,
  MessageQuery,
  OutboundMessage,
} from "../types";
import { getMessagesApi, sendMessageApi } from "../apis/messages";
interface Props {
  records: Array<{
    user: string;
    messages: Message[];
    skip: number;
    totalSize: number;
  }>;
  loading: true | false;
  sendLoading: true | false;
}
const a: Props = {
  records: [],
  loading: false,
  sendLoading: false,
};
export const GetMessagesAction = createAsyncThunk<
  { data: MessageGetResponse; user: string },
  MessageQuery
>("load-message", async (q, { rejectWithValue }) => {
  try {
    const response = getMessagesApi(q);
    return response;
  } catch (e) {
    return rejectWithValue("Api error");
  }
});
export const SendMessageAction = createAsyncThunk<
  { message: Message; user: string },
  OutboundMessage
>("send-message", async (a, { rejectWithValue }) => {
  try {
    const response = await sendMessageApi(a);
    return { message: response.data, user: response.user };
  } catch (e) {
    return rejectWithValue("Api error");
  }
});
interface MessageReceived {
  type: string;
  payload: null | Message;
}
export const messageSlice = createSlice({
  name: "messages",
  initialState: a,
  reducers: {
    MessageReceivedAction: (state, action: MessageReceived) => {
      // if (action.payload) state.selectedUser = action.payload;
      if (action.payload) {
        // console.log(action);
        const obj = singleMessageHandler(
          action.payload.sender._id,
          state.records,
          action.payload
        );
        if (Array.isArray(obj)) state.records = obj;
        else state.records.push(obj);
      }
    },
  },
  extraReducers: (b) => {
    b.addCase(GetMessagesAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(GetMessagesAction.rejected, (s) => {
      s.loading = false;
    });
    b.addCase(GetMessagesAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      //   console.log(payload.user);
      // s.records.
      //check is the slice has messages for this user
      const exist =
        s.records.find((a) => a.user === payload.user) !== undefined;
      //   console.log(exist);
      if (!exist) {
        s.records.push({
          user: payload.user,
          messages: payload.data.messages,
          totalSize: payload.data.count,
          skip: 0,
        });
      } else {
        console.log("Need to add message here");
      }
    });
    b.addCase(SendMessageAction.pending, (a) => {
      a.sendLoading = true;
    });
    b.addCase(SendMessageAction.rejected, (a) => {
      a.sendLoading = false;
    });
    b.addCase(SendMessageAction.fulfilled, (s, { payload }) => {
      s.sendLoading = false;
      // console.log(exist);
      const obj = singleMessageHandler(
        payload.user,
        s.records,
        payload.message
      );
      if (Array.isArray(obj)) s.records = obj;
      else s.records.push(obj);
    });
  },
});
const singleMessageHandler = (
  user: string,
  r: Array<{
    user: string;
    messages: Message[];
    skip: number;
    totalSize: number;
  }>,
  message: Message
) => {
  const exist = r.find((a) => a.user === user) !== undefined;
  if (!exist)
    return {
      user: user,
      messages: [message],
      totalSize: 1,
      skip: 0,
    };
  else {
    const x = r.find((a) => a.user === user);
    const messages = x ? x.messages : [];
    messages.push(message);
    const data = r.filter((a) => a.user !== user);
    data.push({
      totalSize: x?.totalSize ? x.totalSize + 1 : 1,
      messages: messages,
      user: user,
      skip: x?.skip || 0,
    });
    return data;
  }
};
export const { MessageReceivedAction } = messageSlice.actions;

export default messageSlice.reducer;
