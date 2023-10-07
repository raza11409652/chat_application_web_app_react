import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteAllFromLocal,
  getItemFromLocal,
  setItemInLocal,
} from "../utils/localstorage";
import { AuthResponse, User, UserLogin, UserRegister } from "../types";
import { loginApi } from "../apis/auth/login";
import { registerApi } from "../apis/auth/register";
import handleAxiosError from "../utils/handleAxiosError";

interface Props {
  user?: User;
  auth: true | false;
  loading: true | false;
}
const initialState: Props = {
  auth: getItemFromLocal("auth-state"),
  loading: false,
  user: getItemFromLocal("user"),
};
export const LoginAction = createAsyncThunk<AuthResponse, UserLogin>(
  "login",
  async (v, { rejectWithValue }) => {
    try {
      const response = await loginApi(v);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      //   throw e;
      handleAxiosError(e);
      return rejectWithValue("Error");
    }
  }
);
export const RegisterAction = createAsyncThunk<AuthResponse, UserRegister>(
  "register",
  async (v, { rejectWithValue }) => {
    try {
      const response = await registerApi(v);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      //   throw e;
      handleAxiosError(e);
      return rejectWithValue("Error");
    }
  }
);
const authState = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    logoutAction: (a) => {
      deleteAllFromLocal();
      a.auth = false;
    },
  },
  extraReducers: (b) => {
    b.addCase(LoginAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(LoginAction.rejected, (s) => {
      s.loading = false;
      s.auth = false;
      s.user = undefined;
    });
    b.addCase(LoginAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.auth = true;
      s.user = payload.user;
      setItemInLocal("session-token", payload.session.token);
      setItemInLocal("refresh-token", payload.session.refresh);
      setItemInLocal("user", payload.user);
      setItemInLocal("auth-state", true);
    });
    b.addCase(RegisterAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(RegisterAction.rejected, (s) => {
      s.loading = false;
      s.auth = false;
      s.user = undefined;
    });
    b.addCase(RegisterAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.auth = true;
      s.user = payload.user;
      setItemInLocal("session-token", payload.session.token);
      setItemInLocal("refresh-token", payload.session.refresh);
      setItemInLocal("user", payload.user);
      setItemInLocal("auth-state", true);
    });
  },
});
export const { logoutAction } = authState.actions;

export default authState.reducer;
