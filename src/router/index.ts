// 通过vue-router实现路由跳转

import { createRouter, createWebHashHistory } from 'vue-router'
import {constRoute} from './routes'
const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoute,
})

export default router
