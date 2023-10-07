import { AuthResponse, UserRegister } from "../../types";
import axios from "../axios";

export const registerApi = async (b: UserRegister) => {
  const { data } = await axios.post<AuthResponse>("auth/register", b);
  return data;
};
