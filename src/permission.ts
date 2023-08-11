import router from '@/router'

// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to: 将要访问的路由
  // from: 从哪个路由赖
  // next: 路由的放行函数
  nprogress.start()
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
