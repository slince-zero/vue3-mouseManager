<template>
  <div class="tabbar">
    <!-- 左侧 -->
    <Bread/>
    <!-- 右侧 -->
    <Setting/>
  </div>
</template>

<script lang="ts" setup>
import Bread from './bread/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color:skyblue;
  .tabbar_left {
    display: flex;
    margin-left: 7px;
    align-items: center;
  }
  .tabbar_right{
    display: flex;
    align-items: center;
  }
}
</style>
