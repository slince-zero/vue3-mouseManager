<template>
  <!-- 顶部左侧，小图标-面包屑 -->
  <div class="tabbar_left">
    <!-- 小图标 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="useLayout.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
// 引入element箭头组件
import { ArrowRight } from '@element-plus/icons-vue'
// 引入小仓库里面定义的useLayoutStore，所有组件都可以使用到
import useLayoutStore from '@/store/setting'
const useLayout = useLayoutStore()
const changeIcon = () => {
  // 图标切换
  useLayout.fold = !useLayout.fold
}
</script>

<style lang="scss" scoped></style>
