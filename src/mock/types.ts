// 统一响应格式
export interface MockResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  permissions?: string[];
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}
