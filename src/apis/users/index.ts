import { GetUserResponse, UserQuery } from "../../types";
import axios from "../axios";

export const getUsersApi = async (q: UserQuery) => {
  const { data } = await axios.get<GetUserResponse>(`users/`, {
    params: { ...q },
  });
  return data;
};
