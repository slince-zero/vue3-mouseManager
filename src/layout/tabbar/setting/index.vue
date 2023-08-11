<template>
  <!-- 顶部右侧，全屏。。-->
  <div class="tabbar_right">
    <el-button
      size="small"
      circle
      icon="Refresh"
      @click="updateRefresh"
    ></el-button>
    <el-button
      size="small"
      circle
      icon="FullScreen"
      @click="updateFullScreen"
    ></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 24px; height: 24px; margin: 0 10px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
// 引入小仓库里面定义的useLayoutStore，所有组件都可以使用到
import useLayoutStore from '@/store/setting'
const useLayout = useLayoutStore()

// 引入用户小仓库
const userStore = useUserStore()
// 更新
const updateRefresh = () => {
  useLayout.refresh = !useLayout.refresh
}

// 获取路由对象
const $router = useRouter()
// 全屏
const updateFullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    // document.fullscreenElement 会判断页面是否是全屏，如果不是返回null
    // requestFullscreen方法可以切换全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}

// 退出
const logout = () => {
  userStore.userLogout()
  $router.push({ path: '/login' })
  // 两种写法是等价的，只不过上面那个传的是对象
  // $router.push('/login')
}
</script>

<style lang="scss" scoped></style>
