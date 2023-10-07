import Axios from "axios";
import { getItemFromLocal } from "../utils/localstorage";
import { BASE_URL } from "../env";

export const baseURL = BASE_URL + "v1/api/";
const axios = Axios.create({ baseURL });

axios.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const token = getItemFromLocal("session-token");
    if (token) {
      config.headers = { ...config.headers, authorization: `BEARER ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status) console.log({ url: originalConfig.url });
    //Here we need to write Refresh token implementation

    return Promise.reject(err);
  }
);

export default axios;
