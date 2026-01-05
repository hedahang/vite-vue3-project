import request from "../utils/request";

// 登录请求参数类型
export interface LoginParams {
  username: string;
  password: string;
}

// 登录响应数据类型
export interface LoginResponse {
  token: string;
  userInfo: {
    id: number;
    username: string;
    email: string;
    avatar?: string;
  };
}

// 登录方法
export function login(data: LoginParams) {
  return request.post("/api/auth/login", data, {
    headers: {
      isToken: false,
    },
  });
}

// 获取用户信息
export function getUserInfo() {
  return request.get("/api/user/info");
}
// 获取用户路由
export function getUserRoutes() {
  return request.get("/api/user/routes");
}
