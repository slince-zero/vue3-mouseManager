<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="200px" class="layout_slider">
        <!-- Aside -->
        <Logo></Logo>
        <!-- 左侧菜单 -->
        <el-scrollbar  class="scrollbar">
          <el-menu mode="vertical" collapse>
            <!-- 根据路由动态生成菜单 -->
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header class="layout_tabbar">Header</el-header>
        <!-- 主题内容 -->
        <el-main class="layout_main">
          <!-- <router-view></router-view> -->
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// 引入logo组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'

// 引入Main内容组件，直接使用<router-view></router-view>
// 封装的目的是为了添加一些跳转时候的过渡特效
import Main from './main/index.vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout_slider {
  background-color: pink;
  height: 100vh;
}
.scrollbar {
  width: 100%;
  height: calc(100vh - 50px);
  margin-top: 10px;
  .el-menu {
    border-right: none;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.layout_tabbar {
  background-color: yellowgreen;
}
</style>
