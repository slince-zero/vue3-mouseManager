<template>
  <!-- 顶部右侧，全屏。。-->
  <div class="tabbar_right">
    <el-button size="small" circle icon="Refresh"></el-button>
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

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
