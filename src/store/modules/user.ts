// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm } from '@/api/user/type'

// 引入路由（常量路由）
import { constRoute } from '@/router/routes'
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constRoute, // 仓库存储生成菜单需要的路由数组
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录
    async userLogin(data: loginForm) {
      // 登录请求
      const result: any = await reqLogin(data)
      // 登录请求成功：200--返回token
      // 登录请求失败：201--返回错误信息
      if (result.code == 200) {
        this.token = result.data.token
        // 本地存储持久化-就不用每次重新获取了
        localStorage.setItem('TOKEN', result.data.token)
        // 保证当前async返回一个成功的promise
        return 'ok'
      } else {
        console.log(result.data.message)

        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
