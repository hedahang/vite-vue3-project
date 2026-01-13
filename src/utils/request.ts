import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";

import { getToken } from "./auth";

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
  (error: unknown) => {
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
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 测试

interface Api {
  "/course/buy": { id: number };
  "/course/comment": { id: number; message: string };
}
function request<T extends keyof Api>(url: T, obj: Api[T]) {
  return axios.post(url, obj);
}
request("/course/buy", { id: 1 });
request("/course/comment", { id: 1, message: "嘎嘎好看" });
// request("/course/comment", { id: 1 }); //如果message必传 怎么类型提醒缺少参数
// request("/course/404", { id: 1 }); //接口不存在 类型怎么需要报错

export default service;
