import { createApp } from 'vue'
import App from '@/App.vue'
const app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// SVG 需要的
import 'virtual:svg-icons-register'
app.use(ElementPlus, {
  locale: zhCn,
})

// 使用自定义组件，配置全局自定义组件
import gloablComponent from '@/components/index'
app.use(gloablComponent)

// 引入模板的全局样式
import '@/styles/index.scss'

// 引入路由
import router from './router'
app.use(router)

// 引入仓库-状态管理
import pinia from './store'
app.use(pinia)

// 引入路由鉴权--全局路由守卫
import './permission'

// 全局引入注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
