// 小仓库：layout组件相关配置仓库

import { defineStore } from 'pinia'

const useLayoutStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用户抗旨菜单折叠还是收起
    }
  },
})

export default useLayoutStore
