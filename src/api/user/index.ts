// 统一管理项目中用户相关的接口

import request from '@/utils/request'

enum API {
  LOGIN_URL = '/admin/acl/index/login',

  USERINFO_URL = '/admin/acl/index/info',

  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口方法
export const reqLogin =(data:any)=>request.post(API.LOGIN_URL,data)

// 获取用户信息接口方法
export const reqUserInfo =()=> request.get(API.USERINFO_URL)