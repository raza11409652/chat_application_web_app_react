import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserResponse, User, UserQuery } from "../types";
import { getItemFromLocal } from "../utils/localstorage";
import { getUsersApi } from "../apis/users";
interface Props {
  selectedUser?: User;
  loading: true | false;
  users: User[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
const a: Props = {
  users: [],
  loading: false,
  selectedUser: getItemFromLocal("selected-user"),
  currentPage: 0,
  totalPages: 0,
  totalCount: 0,
};
export const GetUsersAction = createAsyncThunk<GetUserResponse, UserQuery>(
  "users",
  async (q, { rejectWithValue }) => {
    try {
      const response = await getUsersApi(q);
      return response;
    } catch (e) {
      return rejectWithValue("Api error");
    }
  }
);
interface SetSelectedUser {
  type: string;
  payload: null | User;
}
const userSlice = createSlice({
  name: "users_slice",
  reducers: {
    SetSelectedUserAction: (state, action: SetSelectedUser) => {
      if (action.payload) state.selectedUser = action.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(GetUsersAction.pending, (a) => {
      a.loading = true;
    });
    b.addCase(GetUsersAction.rejected, (a) => {
      a.loading = false;
    });
    b.addCase(GetUsersAction.fulfilled, (a, { payload }) => {
      a.loading = false;
      a.currentPage = payload.currentPage;
      a.users = payload.records || [];
      a.totalCount = payload.totalCount;
      a.totalPages = payload.totalPages;
    });
  },
  initialState: a,
});
export const { SetSelectedUserAction } = userSlice.actions;
export default userSlice.reducer;
