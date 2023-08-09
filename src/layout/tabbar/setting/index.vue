<template>
  <!-- 顶部右侧，全屏。。-->
  <div class="tabbar_right">
    <el-button
      size="small"
      circle
      icon="Refresh"
      @click="updateRefresh"
    ></el-button>
    <el-button size="small" circle icon="FullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <img
      src="../../../public/g.png"
      alt=""
      style="width: 24px; height: 24px; margin: 0 10px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
// 引入小仓库里面定义的useLayoutStore，所有组件都可以使用到
import useLayoutStore from '@/store/setting'
const useLayout = useLayoutStore()

const updateRefresh = () => {
  useLayout.refresh = !useLayout.refresh
}
</script>

<style lang="scss" scoped></style>
