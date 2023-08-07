<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="200px" class="layout_slider">
        <!-- Aside -->
        <Logo></Logo>
        <!-- 左侧菜单 -->
        <el-scrollbar class="scrollbar">
          <el-menu background-color="pink" text-color="white">
            <!-- 这里的index是唯一标识 -->
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">数据大屏</el-menu-item>
            <!-- 折叠菜单 -->
            <el-sub-menu index="3">
              <template #title>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">用户管理</el-menu-item>
              <el-menu-item index="2-2">角色管理</el-menu-item>
              <el-menu-item index="2-3">菜单管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="layout_tabbar">Header</el-header>
        <el-main class="layout_main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// 引入logo组件
import Logo from './logo/index.vue'
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
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
