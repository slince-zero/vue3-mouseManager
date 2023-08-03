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

app.mount('#app')
