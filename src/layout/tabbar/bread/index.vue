<template>
  <!-- 顶部左侧，小图标-面包屑 -->
  <div class="tabbar_left">
    <!-- 小图标 -->
    <el-icon style="margin-right: 10px">
      <Expand />
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
</script>

<style lang="scss" scoped></style>
