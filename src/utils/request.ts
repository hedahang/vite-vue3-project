import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getToken } from "./auth";
import { ElMessage } from "element-plus";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || "", // url = base url + request url
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    const isToken: boolean = (config.headers || {}).isToken === false;
    const token = getToken();
    if (token && !isToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
      console.log("接口信息报错", res.message);
      ElMessage.error(res.message);
      return Promise.reject(new Error(res.message || "Error"));
    }
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default service;
