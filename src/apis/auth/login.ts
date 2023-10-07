import { AuthResponse, UserLogin } from "../../types";
import axios from "../axios";

export const loginApi = async (b: UserLogin) => {
  const { data } = await axios.post<AuthResponse>("auth/login", b);
  return data;
};
