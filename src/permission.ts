import router from '@/router'

// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入用户相关的小仓库内部token数据，判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to: 将要访问的路由
  // from: 从哪个路由赖
  // next: 路由的放行函数
  nprogress.start()
  // 获取token，判断用户登录还是未登录
  const token = userStore.token
  // 获取用户信息-username
  const username = userStore.username
  if (token) {
    // 如果登录
    // 登录成功后，跳转login页面，不能跳转
    if (to.path == '/login') {
      next('/')
    } else {
      // 判断登录进来的用户信息
      if (username) {
        next()
      } else {
        // 没有用户信息，重新发起请求，获取到了再放行
        try {
          // 获取到用户信息之后，放行
          await userStore.userInfo()
          next()
        } catch (error) {
          // token：过期或者获取不到token
          // 退出登录--用户相关的数据被清空
          // await保证用户退出之后才跳转
          await userStore.userLogout()
          next('/login')
        }
      }
    }
  } else {
    // 没有登录
    if (to.path == '/login') {
      // 如果跳转登录页面，直接跳转
      next()
    } else {
      // 如果跳转其他页面，跳转到登录页面
      next('/login')
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
