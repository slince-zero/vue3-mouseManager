// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
/*
// 引入数据类型
import type { loginForm } from '@/api/user/type'
*/
// 引入路由（常量路由）
import { constRoute } from '@/router/routes'
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constRoute, // 仓库存储生成菜单需要的路由数组
      username: '', // 用户姓名
      avatar: '', // 用户头像
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录
    async userLogin(data: any) {
      // 登录请求
      const result: any = await reqLogin(data)
      // console.log(result)

      // 登录请求成功：200--返回token
      // 登录请求失败：201--返回错误信息
      if (result.code == 200) {
        this.token = result.data
        // 本地存储持久化-就不用每次重新获取了
        localStorage.setItem('TOKEN', result.data)
        // 保证当前async返回一个成功的promise
        return 'ok'
      } else {
        console.log(result.data.message)
        return Promise.reject(new Error(result.data.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息，头像名字
      const result = await reqUserInfo()
      // console.log(result)
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    /* userLogout() {
      // 由于没有退出接口，自己清空用户相关数据
      ;(this.token = ''),
        (this.username = ''),
        (this.avatar = ''),
        localStorage.removeItem('TOKEN')
    }, */
    async userLogout(){
      const result = await reqLogout()
      // console.log(result);
      if(result.code==200){
        // 退出成功
        this.token='',
        this.username='',
        this.avatar='',
        localStorage.removeItem('TOKEN')
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }    
    }
  },
  getters: {},
})

export default useUserStore
