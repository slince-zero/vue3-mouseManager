// 统一管理项目中用户相关的接口

import request from '@/utils/request'

/*
import type { loginForm, loginResponseData, userResponseDara } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userResponseDara>(API.USERINFO_URL)
*/

// 项目用户相关的请求地址
enum API {
  // LOGIN_URL = '/admin/acl/index/login',
  LOGIN_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/login',
  USERINFO_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/info',
  LOGOUT_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: any) => {
  request.post<any, any>(API.LOGIN_URL, data)
  return request.post<any, any>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)

// 退出接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
